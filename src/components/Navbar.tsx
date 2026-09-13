import React from 'react';
import { Compass, Sparkles, BookmarkCheck, Info, HelpCircle, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentTab: 'plan' | 'trips' | 'how-it-works' | 'about';
  onSelectTab: (tab: 'plan' | 'trips' | 'how-it-works' | 'about') => void;
  savedTripsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, savedTripsCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand & Tagline */}
        <div 
          onClick={() => onSelectTab('plan')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="brand-header"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-neutral-900">
                Tripora <span className="text-amber-600">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200">
                Hackathon 2026
              </span>
            </div>
            <p className="text-xs text-neutral-500 hidden sm:block font-medium">
              “Your trip. Researched, reasoned, and ready.”
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            id="nav-plan-trip"
            onClick={() => onSelectTab('plan')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentTab === 'plan'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Trip</span>
          </button>

          <button
            id="nav-my-trips"
            onClick={() => onSelectTab('trips')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 relative ${
              currentTab === 'trips'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>My Trips</span>
            {savedTripsCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center">
                {savedTripsCount}
              </span>
            )}
          </button>

          <button
            id="nav-how-it-works"
            onClick={() => onSelectTab('how-it-works')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hidden md:flex items-center gap-2 ${
              currentTab === 'how-it-works'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>How It Works</span>
          </button>

          <button
            id="nav-about"
            onClick={() => onSelectTab('about')}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hidden sm:flex items-center gap-2 ${
              currentTab === 'about'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>
        </nav>

        {/* Demo Mode Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Demo Research Mode Active</span>
        </div>

      </div>
    </header>
  );
};
