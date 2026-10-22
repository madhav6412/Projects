import React, { useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../data/profileData';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ExperienceSection: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineBeamRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. GSAP ScrollTrigger Scrubbing for the Timeline Beam
      if (timelineBeamRef.current) {
        gsap.fromTo(
          timelineBeamRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.8,
            },
          }
        );
      }

      // 2. GSAP ScrollTrigger Stagger for Timeline Milestones
      const items = gsap.utils.toArray<HTMLElement>('.gsap-timeline-item');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`py-16 md:py-24 border-b transition-colors duration-300 relative overflow-hidden ${
        isDark ? 'border-slate-800 bg-[#090d16]/90' : 'border-slate-200/90 bg-white/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 uppercase tracking-wider font-semibold ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            <span>Career Path</span>
            <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <span>4+ Years Production Operations</span>
          </div>
          <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Professional Experience & Cloud Leadership
          </h2>
          <p className={`mt-3 text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            A track record of stabilizing enterprise IIoT platforms, architecting multi-region infrastructure,
            and establishing DevSecOps best practices across global teams.
          </p>
        </div>

        {/* Timeline with GSAP ScrollTrigger Beam */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 md:before:left-4 before:w-0.5 before:bg-slate-300 dark:before:bg-slate-800/80">
          {/* GSAP Scroll-Driven Glowing Line Beam */}
          <div
            ref={timelineBeamRef}
            className="absolute left-3.5 md:left-4 top-0 w-0.5 bg-gradient-to-b from-emerald-500 via-sky-500 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] z-0 origin-top h-0"
          />

          <div ref={cardsRef} className="space-y-8">
            {PROFILE_DATA.experiences.map((exp) => (
              <div
                key={exp.id}
                className="gsap-timeline-item relative pl-9 md:pl-11 group z-10"
              >
                {/* Timeline marker */}
                <div className={`absolute left-1.5 md:left-2 top-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-emerald-500 group-hover:scale-125 transition-all shadow-[0_0_8px_rgba(16,185,129,0.6)] ${
                  isDark ? 'bg-[#090d16]' : 'bg-white'
                }`} />

                <div className={`p-6 rounded-xl border transition-all shadow-sm hover:shadow-md backdrop-blur-sm ${
                  isDark
                    ? 'bg-[#0c111c]/95 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200/90 hover:border-emerald-500/50'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg font-bold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {exp.role}
                      </h3>
                      <span className={`font-semibold text-sm ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        @ {exp.company}
                      </span>
                    </div>

                    <div className={`flex items-center gap-3 text-xs font-mono ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.period}</span>
                      </span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Context */}
                  <p className={`text-xs italic mb-4 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {exp.context}
                  </p>

                  {/* Achievements list */}
                  <ul className={`space-y-2 text-xs leading-relaxed list-disc list-inside ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="leading-normal">
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Skills */}
                  <div className={`mt-4 pt-3 border-t flex flex-wrap items-center gap-1.5 ${
                    isDark ? 'border-slate-800/80' : 'border-slate-100'
                  }`}>
                    <span className={`text-[11px] font-mono mr-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Skills:
                    </span>
                    {exp.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2 py-0.5 text-[11px] font-mono rounded border ${
                          isDark
                            ? 'bg-slate-800/70 text-slate-300 border-slate-700/60'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Education Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Award Card */}
          <div className={`p-5 rounded-xl border transition-all flex items-start gap-4 ${
            isDark
              ? 'bg-[#0c111c] border-slate-800 hover:border-amber-500/40'
              : 'bg-white border-slate-200/90 hover:border-amber-500/50 shadow-xs'
          }`}>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider font-semibold">
                Honors & Recognition
              </div>
              <h4 className={`text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {PROFILE_DATA.awards[0].title}
              </h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {PROFILE_DATA.awards[0].organization} · {PROFILE_DATA.awards[0].year}
              </p>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {PROFILE_DATA.awards[0].description}
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div className={`p-5 rounded-xl border transition-all flex items-start gap-4 ${
            isDark
              ? 'bg-[#0c111c] border-slate-800 hover:border-cyan-500/40'
              : 'bg-white border-slate-200/90 hover:border-sky-500/50 shadow-xs'
          }`}>
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-cyan-400 shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-sky-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                Academic Background
              </div>
              <h4 className={`text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {PROFILE_DATA.education.degree}
              </h4>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {PROFILE_DATA.education.institution} · {PROFILE_DATA.education.year}
              </p>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Focused on distributed systems, operating systems, networking fundamentals, algorithms, and computational theory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
