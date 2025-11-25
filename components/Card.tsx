import React from 'react';
import { GameCardContent, CardType, GameMode } from '../types';
import { MODE_CONFIG } from '../constants';

interface CardProps {
  content: GameCardContent | null;
  mode: GameMode;
  isFlipped: boolean;
  isLoading: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ content, mode, isFlipped, isLoading, onClick }) => {
  const modeConfig = MODE_CONFIG[mode];

  return (
    <div 
      className="relative w-[85vw] h-[60vh] max-h-[500px] md:w-[360px] md:h-[520px] perspective-1000 cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
      onClick={onClick}
    >
      <div 
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card (Cover) */}
        <div className={`absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br ${modeConfig.gradient} flex flex-col items-center justify-center p-6 border-[6px] md:border-[8px] border-white`}>
           {/* Decorative Pattern */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/hearts.png')]"></div>
           
           <div className="z-10 bg-white/20 backdrop-blur-sm p-6 md:p-8 rounded-full shadow-inner mb-6 transition-transform duration-500 group-hover:scale-110">
             <span className="text-5xl md:text-7xl drop-shadow-md">{modeConfig.emoji}</span>
           </div>
           <h3 className="z-10 text-white text-3xl md:text-4xl font-bold tracking-widest uppercase drop-shadow-md font-serif text-center">
             {modeConfig.label}
           </h3>
           <div className="z-10 mt-8 px-4 py-2 bg-white/20 rounded-full backdrop-blur-md hidden md:block">
             <p className="text-white text-sm font-medium tracking-wide flex items-center gap-2">
               <span>鼠标点击</span>
               <span className="opacity-60">|</span> 
               <span>按空格翻牌</span>
             </p>
           </div>
           <div className="z-10 mt-6 md:hidden animate-pulse">
             <p className="text-white/80 text-sm font-medium">点击翻开</p>
           </div>
        </div>

        {/* Back of Card (Content) */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-2xl overflow-hidden bg-white flex flex-col items-center justify-between p-6 md:p-10 border-[6px] md:border-[8px] border-white"
        >
           {/* Background decoration */}
           <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${modeConfig.gradient}`}></div>
           <div className={`absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r ${modeConfig.gradient}`}></div>

           {isLoading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-6">
               <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
               <p className="text-rose-400 text-base md:text-lg font-medium animate-pulse">正在为你们生成...</p>
             </div>
           ) : (
             <>
                <div className="w-full text-center mt-2">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-bold text-white uppercase tracking-wider bg-gradient-to-r ${modeConfig.gradient} shadow-md`}>
                    {content?.type === CardType.TRUTH ? '真心话' : content?.type === CardType.DARE ? '大冒险' : '默契测试'}
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center w-full overflow-y-auto my-4 no-scrollbar">
                  <div className="text-5xl md:text-6xl mb-4 md:mb-8 filter drop-shadow-sm">{content?.emoji}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-4 md:mb-6 w-full break-words px-2">
                    {content?.text}
                  </h2>
                  {content?.instruction && (
                    <div className="bg-slate-50 px-4 py-2 md:px-6 md:py-3 rounded-xl border border-slate-100 w-full">
                       <p className="text-slate-500 text-sm md:text-base font-medium italic">
                         💡 {content.instruction}
                       </p>
                    </div>
                  )}
                </div>

                <div className="w-full text-center mb-1">
                  <p className="text-slate-300 text-[10px] md:text-xs uppercase tracking-widest font-semibold">🩷包子🩵</p>
                </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default Card;