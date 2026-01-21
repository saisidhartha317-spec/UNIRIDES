
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  currentView: string;
  setView: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setView, currentView }) => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-4xl h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('dashboard')}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">UniRide</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('dashboard')}
            className={`text-sm font-semibold transition-colors ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Find Rides
          </button>
          
          <div 
            onClick={() => setView('profile')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{user.name}</div>
              <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-end gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> VERIFIED
              </div>
            </div>
            <img 
              src={user.avatar} 
              className="w-9 h-9 rounded-full border-2 border-slate-100 group-hover:border-indigo-600 transition-all" 
              alt="Profile" 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
