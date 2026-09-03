import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'sm'
}) => {
  const { isDark, toggleTheme } = useTheme();

  const isSmall = size === 'sm';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coop-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 select-none group shrink-0 ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-inner'
          : 'bg-amber-100 hover:bg-amber-200/80 border border-amber-300/80 shadow-inner'
      } ${isSmall ? 'w-14 h-7' : 'w-16 h-8'} ${className}`}
      title={isDark ? "Active: Dark Mode (Click for ☀️ Light Mode)" : "Active: Light Mode (Click for 🌙 Dark Mode)"}
    >
      {/* Background Track Icons */}
      <span className="flex items-center justify-between w-full px-1 pointer-events-none select-none">
        {/* Sun Icon (Left) */}
        <span
          className={`flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isDark
              ? 'opacity-30 scale-75 text-slate-500'
              : 'opacity-100 scale-100 text-amber-600 font-bold'
          }`}
        >
          <Sun className={isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        </span>

        {/* Moon Icon (Right) */}
        <span
          className={`flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isDark
              ? 'opacity-100 scale-100 text-indigo-300 font-bold'
              : 'opacity-30 scale-75 text-amber-500'
          }`}
        >
          <Moon className={isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
        </span>
      </span>

      {/* Animated Sliding Thumb */}
      <span
        className={`pointer-events-none absolute top-0.5 bottom-0.5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-out transform select-none ${
          isSmall ? 'w-6 h-6' : 'w-7 h-7'
        } ${
          isDark
            ? isSmall
              ? 'translate-x-6 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-indigo-950/60 ring-1 ring-indigo-400/40'
              : 'translate-x-7 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-indigo-950/60 ring-1 ring-indigo-400/40'
            : 'translate-x-0 bg-gradient-to-tr from-amber-400 to-amber-300 text-amber-950 shadow-amber-500/40 ring-1 ring-amber-400/60'
        } group-hover:scale-105`}
      >
        {isDark ? (
          <Moon className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} transform rotate-0 transition-transform duration-300 pointer-events-none`} />
        ) : (
          <Sun className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} transform rotate-0 transition-transform duration-300 pointer-events-none`} />
        )}
      </span>
    </button>
  );
};
