import React, { useRef, useEffect } from 'react';
import { PROFILE_DATA } from '../data/profileData';
import { Github, Linkedin, Mail, MapPin, Terminal, ArrowDown, ShieldCheck } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onExploreProjects,
}) => {
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const terminalColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Tilt for Hero Terminal Card
  const termX = useMotionValue(0);
  const termY = useMotionValue(0);
  const springTermX = useSpring(termX, { stiffness: 180, damping: 20 });
  const springTermY = useSpring(termY, { stiffness: 180, damping: 20 });
  const rotateX = useTransform(springTermY, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(springTermX, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleTerminalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    termX.set((e.clientX - rect.left) / rect.width - 0.5);
    termY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleTerminalMouseLeave = () => {
    termX.set(0);
    termY.set(0);
  };

  // GSAP ScrollTrigger for subtle hero parallax exit
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (terminalColRef.current) {
        gsap.to(terminalColRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          yPercent: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative pt-12 pb-16 md:pt-20 md:pb-24 border-b transition-colors duration-300 overflow-hidden ${
        isDark ? 'border-slate-800/80 bg-transparent' : 'border-slate-200/90 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Anti-slop clean kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4 tracking-wide uppercase font-semibold">
          <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
            Production Cloud Infrastructure
          </span>
          <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
          <span className={isDark ? 'text-cyan-400' : 'text-sky-600'}>
            Enterprise ThingWorx IIoT
          </span>
          <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            Velotic & PTC Specialist
          </span>
        </div>

        {/* Hero split with parallax 3D depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (GSAP Parallax Layer A) */}
          <div ref={leftColRef} className="lg:col-span-7">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Cloud Engineer, DevOps Architect & Site Reliability Engineer
            </h1>

            <p className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Specialized in engineering mission-critical multi-region Kubernetes clusters (AKS, EKS),
              declarative GitOps pipelines with ArgoCD, modular Terraform & Bicep IaC, and noise-reduced SRE observability.
              Supporting enterprise-scale platforms for global clients across Wireline and Wireless domains.
            </p>

            {/* Quick Contact & Verified Identity Bar */}
            <div className={`mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <a
                href={PROFILE_DATA.contact.github}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 transition-colors ${
                  isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600 font-medium'
                }`}
              >
                <Github className="w-3.5 h-3.5 text-slate-500" />
                <span>github.com/madhav6412</span>
              </a>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <a
                href={PROFILE_DATA.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 transition-colors ${
                  isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600 font-medium'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                <span>linkedin.com/in/madhav-gupta-77048b140</span>
              </a>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <a
                href={`mailto:${PROFILE_DATA.contact.email}`}
                className={`flex items-center gap-1.5 transition-colors ${
                  isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600 font-medium'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>{PROFILE_DATA.contact.email}</span>
              </a>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{PROFILE_DATA.contact.location}</span>
              </span>
            </div>

            {/* CTA action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Terminal className="w-4 h-4" />
                <span>Explore GitHub Repos</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenResume}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap border ${
                  isDark
                    ? 'text-slate-200 hover:text-white border-slate-700 hover:bg-slate-800'
                    : 'text-slate-700 hover:text-slate-900 border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>Inspect PDF CV</span>
              </button>
            </div>
          </div>

          {/* Right Column (3D Interactive Parallax Terminal) */}
          <div
            ref={terminalColRef}
            style={{ perspective: 1000 }}
            className="lg:col-span-5 relative"
          >
            {/* Floating 3D Badge */}
            <div
              ref={badgeRef}
              style={{ transform: 'translateZ(30px)' }}
              className={`absolute -top-5 -right-5 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono backdrop-blur-md shadow-lg z-20 pointer-events-none border ${
                isDark
                  ? 'bg-slate-800/90 border-emerald-500/30 text-emerald-300'
                  : 'bg-white/95 border-emerald-300 text-emerald-800 shadow-sm'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className="font-semibold">ArgoCD GitOps Sync Active</span>
            </div>

            <motion.div
              onMouseMove={handleTerminalMouseMove}
              onMouseLeave={handleTerminalMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className={`rounded-xl border shadow-xl overflow-hidden cursor-crosshair transition-all duration-200 ${
                isDark
                  ? 'bg-[#0f141f] border-slate-700/80'
                  : 'bg-[#0f172a] border-slate-300 shadow-lg'
              }`}
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161f30] border-b border-slate-700/70">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-300 font-medium">
                    madhav@cloud-ops-bastion:~
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/50">
                  CLUSTER: PRODUCTION
                </span>
              </div>

              {/* Terminal Execution Body */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-3 bg-[#0a0e17]">
                <div>
                  <span className="text-emerald-400 font-bold">$ </span>
                  <span className="text-white">kubectl get pods -n production -o wide</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1 font-mono">
                  <div className="text-slate-400">NAME                               READY   STATUS    RESTARTS   AGE</div>
                  <div className="text-emerald-400">cloud-api-7d9f78-q2w8              1/1     Running   0          42d</div>
                  <div className="text-emerald-400">cloud-api-7d9f78-k9x1              1/1     Running   0          42d</div>
                  <div className="text-emerald-400">cloud-api-7d9f78-m4p5              1/1     Running   0          42d</div>
                  <div className="text-cyan-400">observability-prom-0              1/1     Running   0          88d</div>
                  <div className="text-cyan-400">loki-log-ingester-0               1/1     Running   0          88d</div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-emerald-400 font-bold">$ </span>
                  <span className="text-white">terraform -chdir=terraform plan</span>
                </div>
                <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-900/60 leading-relaxed">
                  Plan: 0 to add, 0 to change, 0 to destroy.
                  <br />
                  <span className="text-slate-300">Infrastructure matches state lock [Remote S3 + DynamoDB].</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Zero-Downtime Release:</span>
                  <span className="text-emerald-400 font-semibold">100% SUCCESSFUL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Highlight Metrics Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PROFILE_DATA.metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isDark
                  ? 'bg-[#0d121e]/90 border-slate-800 hover:border-slate-700 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-emerald-500">
                {m.value}
              </div>
              <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {m.label}
              </div>
              <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
