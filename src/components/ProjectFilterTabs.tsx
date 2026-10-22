import React from 'react';
import { ProjectTier } from '../data/projectsData';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProjectFilterTabsProps {
  selectedTier: 'all' | ProjectTier;
  onSelectTier: (tier: 'all' | ProjectTier) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    advanced: number;
    core: number;
    automation: number;
  };
}

export const ProjectFilterTabs: React.FC<ProjectFilterTabsProps> = ({
  selectedTier,
  onSelectTier,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  const { isDark } = useTheme();

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'GitOps & K8s', label: 'GitOps & Kubernetes' },
    { id: 'DevSecOps & CI/CD', label: 'DevSecOps & Security' },
    { id: 'SRE & Observability', label: 'SRE & Observability' },
    { id: 'IaC & Automation', label: 'IaC & Cloud Provisioning' },
    { id: 'Scripting & Ops', label: 'Scripting & NOC' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Tier Switcher - Advanced Projects vs Core Projects */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSelectTier('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : isDark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Projects ({counts.all})
          </button>

          <button
            onClick={() => onSelectTier('advanced')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'advanced'
                ? 'bg-sky-500 text-white shadow-xs'
                : isDark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advanced Enterprise ({counts.advanced})</span>
          </button>

          <button
            onClick={() => onSelectTier('core')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'core'
                ? isDark
                  ? 'bg-slate-200 text-slate-950 shadow-xs'
                  : 'bg-slate-900 text-white shadow-xs'
                : isDark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Resume Core Projects ({counts.core})
          </button>

          <button
            onClick={() => onSelectTier('automation')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === 'automation'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : isDark
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            NOC & Automation ({counts.automation})
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tech (ArgoCD, Terraform...)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-emerald-400'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
            }`}
          />
        </div>
      </div>

      {/* Domain Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className={`flex items-center gap-1 shrink-0 font-mono text-[11px] ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <SlidersHorizontal className="w-3 h-3" />
          <span>Domain:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? isDark
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 font-medium'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
