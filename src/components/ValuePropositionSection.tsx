import React, { useEffect, useRef } from 'react';
import { UserCheck, Wrench, ShieldAlert, CheckCircle2, ArrowRight, Zap, Target, Server } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ValuePropositionSection: React.FC = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-pillar-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-mission"
      className={`py-16 md:py-20 border-b transition-colors duration-300 relative ${
        isDark ? 'border-slate-800 bg-[#080c15]' : 'border-slate-200/90 bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 uppercase tracking-wider font-semibold ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            <span>Core Profile & Purpose</span>
            <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <span>Clarity for Recruiters & Leaders</span>
          </div>
          <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Who I Am, What I Do & How I Solve Problems
          </h2>
          <p className={`mt-3 text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Bridging software engineering and production infrastructure to deliver high-availability platforms,
            eliminate deployment friction, and safeguard 99.9% uptime for global enterprise systems.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PILLAR 1: WHO I AM */}
          <div className={`gsap-pillar-card rounded-xl border p-6 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0c111c] hover:border-emerald-500/40'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-emerald-500/50'
          }`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    Identity & Proven Background
                  </span>
                  <h3 className={`text-lg font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Who I Am
                  </h3>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                I am <strong className={isDark ? 'text-white' : 'text-slate-900'}>Madhav Gupta</strong>, a Senior Cloud Engineer,
                DevOps Architect, and Site Reliability Engineer (SRE) with <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>4+ years</strong> of hands-on production operations experience across Azure, AWS, and hybrid Linux/Windows fleets.
              </p>

              <ul className={`space-y-2.5 text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Enterprise Track Record:</strong> Specialist at Velotic and PTC supporting industrial ThingWorx IIoT platforms and 100+ application teams.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recognized Excellence:</strong> Honored with PTC's 2025 "Cloud Network Automation Champion" award for zero-defect automation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Academic Foundation:</strong> B.Sc. in Computer Science with deep roots in operating systems, networking protocols, and distributed algorithms.
                  </span>
                </li>
              </ul>
            </div>

            <div className={`mt-6 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span>Verified Experience</span>
              <span className="text-emerald-500 font-semibold">100% Production Tested</span>
            </div>
          </div>

          {/* PILLAR 2: WHAT I DO */}
          <div className={`gsap-pillar-card rounded-xl border p-6 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0c111c] hover:border-sky-500/40'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-sky-500/50'
          }`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-500">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                    isDark ? 'text-cyan-400' : 'text-sky-600'
                  }`}>
                    Engineering Capabilities
                  </span>
                  <h3 className={`text-lg font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    What I Do
                  </h3>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                I engineer resilient, secure, self-healing cloud delivery systems that enable product engineering teams to deploy software rapidly and safely.
              </p>

              <div className="space-y-3 text-xs">
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                    <Server className="w-3.5 h-3.5 text-sky-500" />
                    <span>Modular Infrastructure as Code</span>
                  </div>
                  <p className={`mt-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Author declarative Terraform (AWS & Azure) and Bicep modules with remote state lease locking and Checkov security gating.
                  </p>
                </div>

                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Multi-Cluster Kubernetes & GitOps</span>
                  </div>
                  <p className={`mt-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Orchestrate Azure AKS and AWS EKS workloads via ArgoCD ApplicationSets, Helm charts, HPAs, and zero-downtime rolling upgrades.
                  </p>
                </div>

                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                    <Target className="w-3.5 h-3.5 text-purple-500" />
                    <span>SRE Observability & DevSecOps</span>
                  </div>
                  <p className={`mt-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Implement Golden Signals (Prometheus, Grafana, Loki), multi-window SLO alerting, and shift-left Kyverno admission policies.
                  </p>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span>Operational Focus</span>
              <span className="text-sky-500 font-semibold">Reliability & Automation</span>
            </div>
          </div>

          {/* PILLAR 3: HOW I SOLVE REAL PROBLEMS */}
          <div className={`gsap-pillar-card rounded-xl border p-6 flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0c111c] hover:border-amber-500/40'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-amber-500/50'
          }`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
                    isDark ? 'text-amber-400' : 'text-amber-700'
                  }`}>
                    Quantified Outcomes
                  </span>
                  <h3 className={`text-lg font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    How I Solve Problems
                  </h3>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                I replace fragile manual processes, configuration drift, and firefighting with automated, repeatable infrastructure.
              </p>

              <div className="space-y-2.5 text-xs">
                {/* Challenge 1 */}
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-semibold">
                    Problem: Slow Environment Lead Time
                  </div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Days wasted on manual AWS/Azure console setups with overlapping IP subnets.
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span>Cut from 3 days to under 4 minutes via modular IaC</span>
                  </div>
                </div>

                {/* Challenge 2 */}
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-semibold">
                    Problem: Release Downtime & Config Drift
                  </div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Midnight outages and ad-hoc kubectl mutations during deployments.
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span>100% zero-downtime rolling upgrades & ArgoCD auto-healing</span>
                  </div>
                </div>

                {/* Challenge 3 */}
                <div className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-semibold">
                    Problem: Alert Fatigue & High MTTR
                  </div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    On-call engineers drowned in noisy pages with MTTR exceeding 65 minutes.
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span>Slashed MTTR to 12 mins; cut false alarms by 75%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span>Measurable Impact</span>
              <span className="text-amber-500 font-semibold">99.9% Production SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
