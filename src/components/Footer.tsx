import React from 'react';
import { PROFILE_DATA } from '../data/profileData';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 transition-colors duration-300 ${
      isDark ? 'border-slate-800 bg-[#060911] text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className={`text-base font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {PROFILE_DATA.name}
            </div>
            <div className={`text-xs mt-1 font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Cloud | DevOps and SRE
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#projects" className={`transition-colors ${
              isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
            }`}>
              Projects
            </a>
            <a href="#experience" className={`transition-colors ${
              isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
            }`}>
              Experience
            </a>
            <a href="#skills" className={`transition-colors ${
              isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
            }`}>
              Competencies
            </a>
            <a href="#contact" className={`transition-colors ${
              isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
            }`}>
              Contact
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border ${
              isDark
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                : 'bg-white border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 shadow-xs'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={`mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
        }`}>
          <div>
            © {new Date().getFullYear()} Madhav Gupta. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Ujjain, India</span>
            <span aria-hidden="true">·</span>
            <span>Cloud-Native Platform Operations</span>
            <span aria-hidden="true">·</span>
            <span className={isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'}>
              Zero-Downtime Releases
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
