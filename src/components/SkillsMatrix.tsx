import React from 'react';
import { PROFILE_DATA } from '../data/profileData';
import { Cpu, Layers, GitMerge, Activity, Shield, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SkillsMatrix: React.FC = () => {
  const { isDark } = useTheme();

  const getCategoryIcon = (category: string) => {
    if (category.includes('Cloud')) return <Cpu className="w-4 h-4 text-sky-500 dark:text-cyan-400" />;
    if (category.includes('Infrastructure')) return <Layers className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
    if (category.includes('CI/CD')) return <GitMerge className="w-4 h-4 text-purple-500 dark:text-purple-400" />;
    if (category.includes('Observability')) return <Activity className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
    if (category.includes('Security')) return <Shield className="w-4 h-4 text-rose-500 dark:text-rose-400" />;
    return <Terminal className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
  };

  return (
    <section id="skills" className={`py-16 md:py-24 border-b transition-colors duration-300 ${
      isDark ? 'border-slate-800 bg-[#070b14]' : 'border-slate-200/90 bg-slate-50/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 uppercase tracking-wider font-semibold ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            <span>Core Competencies</span>
            <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <span>Production Tooling Matrix</span>
          </div>
          <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Technical Stack & Engineering Capabilities
          </h2>
          <p className={`mt-3 text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            A comprehensive matrix of technologies, cloud ecosystems, and frameworks proven in high-uptime production environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFILE_DATA.competencies.map((comp, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
                isDark
                  ? 'bg-[#0d121e] border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200/90 hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded border ${
                    isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getCategoryIcon(comp.category)}
                  </div>
                  <h3 className={`text-sm font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {comp.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {comp.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className={`px-2.5 py-1 text-xs font-mono rounded border ${
                        isDark
                          ? 'bg-slate-800/70 text-slate-300 border-slate-700/60'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`mt-4 pt-3 border-t text-[11px] font-mono font-semibold ${
                isDark ? 'border-slate-800/70 text-emerald-400' : 'border-slate-100 text-emerald-600'
              }`}>
                Production Verified
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
