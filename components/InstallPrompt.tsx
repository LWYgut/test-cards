import React, { useEffect, useState } from 'react';

const InstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

    // Only show if it's iOS and NOT standalone (meaning it's in the browser)
    if (iOS && !isStandalone) {
      // Delay slightly for better UX so they see the app first
      const timer = setTimeout(() => setShowPrompt(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end pb-8 sm:items-center sm:justify-center p-4">
      
      {/* The main card */}
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-rose-100 animate-[slideUp_0.5s_ease-out] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
           <div>
             <h3 className="text-lg font-bold text-slate-800">把它变成你的专属 App ❤️</h3>
             <p className="text-xs text-rose-500 mt-1">获得全屏沉浸体验，没有地址栏打扰</p>
           </div>
           <button 
             onClick={() => setShowPrompt(false)}
             className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        <div className="space-y-4 text-sm font-medium text-slate-700">
          <div className="flex items-center gap-4 bg-rose-50 p-3 rounded-xl border border-rose-100">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-rose-500 font-bold">
              1
            </span>
            <span>
              点击屏幕底部的 <span className="inline-block align-middle mx-1 p-1 bg-slate-200 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg></span> 分享按钮
            </span>
          </div>

          <div className="flex items-center gap-4 bg-rose-50 p-3 rounded-xl border border-rose-100">
             <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-rose-500 font-bold">
              2
            </span>
            <span>
              向下滑动并选择 <span className="font-bold">"添加到主屏幕"</span>
              <br/>
              <span className="text-xs text-slate-400 font-normal">(Add to Home Screen)</span>
            </span>
          </div>
          
           <div className="flex items-center gap-4 bg-rose-50 p-3 rounded-xl border border-rose-100">
             <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-rose-500 font-bold">
              3
            </span>
            <span>
              点击右上角的 <span className="font-bold">"添加"</span> 即可
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
            <button 
              onClick={() => setShowPrompt(false)}
              className="text-sm text-slate-400 underline decoration-slate-300 underline-offset-4"
            >
              我知道了，残忍拒绝
            </button>
        </div>
      </div>

      {/* Bouncing Arrow pointing to the Safari Share Button area */}
      {isIOS && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce pointer-events-none z-[110]">
          <span className="text-white text-xs font-bold shadow-black drop-shadow-md mb-1">点这里</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-8 h-8 drop-shadow-md filter">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default InstallPrompt;