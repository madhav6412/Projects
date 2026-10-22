import React from 'react';
import { FileText, Sun, Moon, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenResume: () => void;
  onSelectAdvanced?: () => void;
  onOpenGitHubGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume, onSelectAdvanced, onOpenGitHubGuide }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleAdvancedClick = (e: React.MouseEvent) => {
    if (onSelectAdvanced) {
      onSelectAdvanced();
    }
    const el = document.getElementById('advanced-showcase') || document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-300 ${
      isDark
        ? 'border-slate-800 bg-[#090d16]/90 text-slate-100'
        : 'border-slate-200/90 bg-white/85 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className={`flex items-center gap-2 text-lg font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors ${
          isDark ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-600'
        }`}>
          <span>Madhav Gupta</span>
          <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${
            isDark
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              : 'text-emerald-700 bg-emerald-50 border-emerald-200 shadow-xs'
          }`}>
            DevOps · SRE
          </span>
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav className={`hidden md:flex items-center gap-7 text-sm font-medium ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          <a href="#about-mission" className={`transition-colors whitespace-nowrap shrink-0 ${
            isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
          }`}>
            About & Impact
          </a>
          <a href="#projects" className={`transition-colors whitespace-nowrap shrink-0 ${
            isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
          }`}>
            Projects
          </a>
          <a
            href="#advanced-showcase"
            onClick={handleAdvancedClick}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              isDark ? 'hover:text-cyan-400' : 'hover:text-sky-600'
            }`}
          >
            <span>Advanced Repos</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          </a>
          <a href="#experience" className={`transition-colors whitespace-nowrap shrink-0 ${
            isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
          }`}>
            Experience
          </a>
          <a href="#skills" className={`transition-colors whitespace-nowrap shrink-0 ${
            isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
          }`}>
            Competencies
          </a>
          <a href="#contact" className={`transition-colors whitespace-nowrap shrink-0 ${
            isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
          }`}>
            Contact
          </a>
        </nav>

        {/* Zone 3: Actions + Theme Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/90 border-slate-700 text-amber-400 hover:text-amber-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
            title={isDark ? 'Switch to Clean Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* GitHub Repository Creation Guide Button */}
          {onOpenGitHubGuide && (
            <button
              onClick={onOpenGitHubGuide}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
              }`}
              title="Step-by-step commands to create GitHub repository"
            >
              <Github className="w-3.5 h-3.5 text-slate-500" />
              <span>Create Repo</span>
            </button>
          )}

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Verified CV</span>
            <span className="sm:hidden">CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
