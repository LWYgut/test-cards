import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, GameCardContent } from './types';
import { MODE_CONFIG } from './constants';
import { generateCard } from './services/geminiService';
import Card from './components/Card';
import NavBar from './components/NavBar';

// Check if running in offline mode
const isOffline = !process.env.API_KEY;

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [cardContent, setCardContent] = useState<GameCardContent | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper to fetch new card
  const fetchNewCard = useCallback(async (mode: GameMode) => {
    setLoading(true);
    setCardContent(null);
    try {
      const content = await generateCard(mode);
      setCardContent(content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleModeSelect = (mode: GameMode) => {
    setCurrentMode(mode);
    setIsFlipped(false);
  };

  const handleCardClick = async () => {
    if (!currentMode) return;

    if (!isFlipped) {
      // Flip to see content
      setIsFlipped(true);
      if (!cardContent && !loading) {
        await fetchNewCard(currentMode);
      }
    } else {
      // Already flipped - maybe do nothing or hint to click next
    }
  };

  const handleNextCard = () => {
    if (!currentMode) return;
    setIsFlipped(false); 
    setCardContent(null);
  };

  const handleBackToMenu = () => {
    setCurrentMode(null);
    setCardContent(null);
    setIsFlipped(false);
  };

  // Keyboard support (Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        if (!currentMode) return;
        
        if (!isFlipped && !loading) {
          handleCardClick();
        } else if (isFlipped && !loading) {
          handleNextCard();
        }
      }
      if (e.code === 'Escape') {
        handleBackToMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMode, isFlipped, loading, cardContent]);

  // --- Home Screen ---
  if (!currentMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex flex-col">
        <NavBar />
        
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 py-10 md:py-20 md:px-8">
          <div className="text-center mb-10 md:mb-16 animate-fade-in-down mt-12 md:mt-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 mb-4 tracking-tight">
              包子殿下，请翻牌
            </h2>
            <p className="text-lg md:text-xl text-slate-500">选择一个模式，开启属于你们的浪漫时刻</p>
            {isOffline && (
              <span className="inline-block mt-4 px-3 py-1 bg-slate-100 text-slate-400 text-xs rounded-full border border-slate-200">
                离线模式 - 使用精选内置题库
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full pb-10">
            {Object.values(GameMode).map((mode) => {
              const config = MODE_CONFIG[mode];
              return (
                <button
                  key={mode}
                  onClick={() => handleModeSelect(mode)}
                  className="relative group h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-rose-200"
                >
                   {/* Background Gradient */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-90 transition-opacity group-hover:opacity-100`}></div>
                   
                   {/* Content */}
                   <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl md:text-5xl mb-4 md:mb-6 shadow-inner transition-transform group-hover:scale-110 duration-500">
                        {config.emoji}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide">{config.label}</h3>
                      <p className="text-white/90 font-medium text-center text-sm md:text-base">{config.description}</p>
                      
                      <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 hidden md:block">
                        <span className="bg-white text-rose-500 px-6 py-2 rounded-full font-bold text-sm shadow-lg">开始游戏</span>
                      </div>
                   </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- Game Screen (Responsive) ---
  return (
    <div className="h-[100dvh] w-screen bg-slate-100 flex flex-col relative overflow-hidden fixed inset-0">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${MODE_CONFIG[currentMode].gradient} opacity-5`}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none"></div>

      <NavBar onBack={handleBackToMenu} />

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center w-full h-full p-4 lg:p-8 gap-6 lg:gap-16 mt-14 lg:mt-0">
        
        {/* Mobile Mode Header (Visible on Mobile Only) */}
        <div className="lg:hidden w-full flex justify-center animate-fade-in-down shrink-0">
           <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${MODE_CONFIG[currentMode].gradient} shadow-lg flex items-center gap-2`}>
              <span className="text-xl">{MODE_CONFIG[currentMode].emoji}</span>
              <span className="text-white font-bold">{MODE_CONFIG[currentMode].label}</span>
           </div>
        </div>

        {/* Desktop Sidebar (Visible on Large Screens) */}
        <div className="hidden lg:flex flex-col items-start space-y-8 max-w-xs">
           <div>
             <h2 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${MODE_CONFIG[currentMode].gradient}`}>
               {MODE_CONFIG[currentMode].label}
             </h2>
             <p className="text-slate-500 mt-2 text-lg">{MODE_CONFIG[currentMode].description}</p>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">操作指南</h4>
             <ul className="space-y-3 text-slate-600">
               <li className="flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold border border-slate-200">Space</span>
                 <span>翻牌 / 下一张</span>
               </li>
               <li className="flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold border border-slate-200">Esc</span>
                 <span>返回菜单</span>
               </li>
             </ul>
           </div>
        </div>

        {/* Center: The Card Area */}
        <div className="flex flex-col items-center z-10 w-full">
           <Card 
             mode={currentMode}
             content={cardContent}
             isFlipped={isFlipped}
             isLoading={loading}
             onClick={handleCardClick}
           />

           {/* Next Button Area */}
           <div className={`mt-6 md:mt-10 transition-all duration-500 transform ${isFlipped && !loading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} h-16`}>
            <button
              onClick={handleNextCard}
              className={`
                flex items-center gap-2 px-10 py-3 md:py-4 rounded-full shadow-xl shadow-rose-200/50 
                bg-gradient-to-r ${MODE_CONFIG[currentMode].gradient} text-white font-bold text-lg md:text-xl
                hover:scale-105 active:scale-95 transition-all
              `}
            >
              <span>下一张</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
           </div>
           
           {!isFlipped && (
             <p className="hidden md:block text-slate-400 text-sm animate-bounce mt-8 font-medium">点击卡片或按空格键翻开</p>
           )}
           {!isFlipped && (
             <p className="md:hidden text-slate-400 text-xs animate-bounce mt-4 font-medium opacity-60">点击卡片翻开</p>
           )}
        </div>
      </main>
    </div>
  );
};

export default App;