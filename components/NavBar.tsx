import React from 'react';
import { APP_NAME } from '../constants';

interface NavBarProps {
  onBack?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onBack }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-white/60 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="mr-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-slate-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
          {APP_NAME}
        </h1>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
        ❤️
      </div>
    </div>
  );
};

export default NavBar;