import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PROJECTS_DATA, DevOpsProject, ProjectTier } from './data/projectsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectFilterTabs } from './components/ProjectFilterTabs';
import { ProjectCard } from './components/ProjectCard';
import { RepoExplorerModal } from './components/RepoExplorerModal';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PdfViewerModal } from './components/PdfViewerModal';
import { ParallaxBackground } from './components/ParallaxBackground';
import { ValuePropositionSection } from './components/ValuePropositionSection';
import { Sparkles, Terminal, Layers } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider, useTheme } from './context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function PortfolioContent() {
  const { isDark } = useTheme();
  const [selectedTier, setSelectedTier] = useState<'all' | ProjectTier>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeRepoProject, setActiveRepoProject] = useState<DevOpsProject | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Global Scroll Progress for Parallax Feel
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const projectsSectionRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for Projects Section reveal
  useEffect(() => {
    if (!projectsSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-project-header',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, projectsSectionRef);

    return () => ctx.revert();
  }, []);

  // Listen to hash changes (e.g. /#advanced-showcase)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#advanced-showcase') {
        setSelectedTier('advanced');
        setTimeout(() => {
          const el = document.getElementById('advanced-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Compute counts
  const counts = useMemo(() => {
    return {
      all: PROJECTS_DATA.length,
      advanced: PROJECTS_DATA.filter((p) => p.tier === 'advanced').length,
      core: PROJECTS_DATA.filter((p) => p.tier === 'core').length,
      automation: PROJECTS_DATA.filter((p) => p.tier === 'automation').length,
    };
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      // Tier filter
      if (selectedTier !== 'all' && p.tier !== selectedTier) {
        return false;
      }
      // Domain category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTagline = p.tagline.toLowerCase().includes(query);
        const matchesOverview = p.overview.toLowerCase().includes(query);
        const matchesTech = p.techStack.some((t) => t.toLowerCase().includes(query));
        const matchesFiles = p.files.some((f) => f.path.toLowerCase().includes(query));
        return matchesTitle || matchesTagline || matchesOverview || matchesTech || matchesFiles;
      }
      return true;
    });
  }, [selectedTier, selectedCategory, searchQuery]);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-x-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-[#090d16] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-400'
        : 'bg-[#f8fafc] text-slate-800 selection:bg-emerald-500/30 selection:text-emerald-800'
    }`}>
      {/* 1. Global 3D Parallax Background Layer (Driven by GSAP ScrollTrigger) */}
      <ParallaxBackground />

      {/* 2. Top Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500 origin-left z-50 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
      />

      {/* 3. Top Navigation Bar with Light/Dark Theme Switcher */}
      <Header
        onOpenResume={() => setIsResumeModalOpen(true)}
        onSelectAdvanced={() => setSelectedTier('advanced')}
      />

      {/* 4. Main Body */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Parallax Layers & 3D Interactive Terminal */}
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Clear Who I Am · What I Do · How I Solve Problems Section */}
        <ValuePropositionSection />

        {/* Anchor specifically for #advanced-showcase with scroll margin */}
        <div id="advanced-showcase" className="-mt-16 pt-16 scroll-mt-20" />

        {/* Projects Section (Section-Wise: Mixed & Advanced) */}
        <section
          ref={projectsSectionRef}
          id="projects"
          className={`py-16 md:py-24 border-b backdrop-blur-sm relative transition-colors duration-300 ${
            isDark ? 'border-slate-800/80 bg-[#070b14]/90' : 'border-slate-200/90 bg-white/70'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="gsap-project-header max-w-3xl mb-8">
              <div className={`flex items-center gap-2 text-xs font-mono mb-2 uppercase tracking-wider font-semibold ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <span>Production Showcase</span>
                <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
                <span>Section-Wise Portfolio</span>
              </div>
              <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                DevOps & Cloud Architecture Projects
              </h2>
              <p className={`mt-3 text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Explore advanced enterprise projects featuring modular Terraform IaC on AWS/Azure, Prometheus & Loki unified observability,
                Kubernetes architecture, multi-region GitOps, and DevSecOps pipelines.
                Every project includes complete GitHub file trees, copyable manifests, D3.js impact metrics, and instant ZIP downloads.
              </p>
            </div>

            {/* Filter Tabs (Tier, Category, Search) */}
            <ProjectFilterTabs
              selectedTier={selectedTier}
              onSelectTier={setSelectedTier}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              counts={counts}
            />

            {/* Section Quick Summary Banner if viewing specific tier */}
            {selectedTier === 'advanced' && (
              <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 backdrop-blur-sm transition-colors ${
                isDark
                  ? 'border-cyan-500/30 bg-cyan-950/20 text-slate-300'
                  : 'border-sky-300 bg-sky-50 text-slate-700 shadow-xs'
              }`}>
                <Sparkles className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-sky-900'}`}>
                    Advanced Enterprise Projects (Not on Resume):
                  </span>{' '}
                  These projects reflect the actual production scale of Madhav's work across multi-tier Terraform IaC (VPC, EC2, RDS, S3),
                  unified Prometheus/Loki telemetry, Kubernetes architecture, and multi-region GitOps.
                </div>
              </div>
            )}

            {selectedTier === 'core' && (
              <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 backdrop-blur-sm transition-colors ${
                isDark
                  ? 'border-slate-700 bg-slate-900/40 text-slate-300'
                  : 'border-slate-300 bg-slate-100 text-slate-700 shadow-xs'
              }`}>
                <Layers className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Resume Core Projects:
                  </span>{' '}
                  Foundational infrastructure projects including Automated Enterprise IaC Provisioning and Operations Automation Suites.
                </div>
              </div>
            )}

            {/* Projects Grid with Parallax Entry & 3D Tilt */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx}
                    onOpenRepo={(p) => setActiveRepoProject(p)}
                  />
                ))}
              </div>
            ) : (
              <div className={`py-16 text-center rounded-xl border ${
                isDark ? 'border-slate-800 bg-[#0d121e]' : 'border-slate-200 bg-white shadow-xs'
              }`}>
                <Terminal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  No projects found matching your query
                </h3>
                <p className={`text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Try clearing the search filter or switching to another category.
                </p>
                <button
                  onClick={() => {
                    setSelectedTier('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 cursor-pointer shadow-xs transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Experience & Career Timeline with GSAP ScrollTrigger Beam */}
        <ExperienceSection />

        {/* Competencies & Skills Matrix */}
        <SkillsMatrix />

        {/* Direct Contact Channels */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* MODAL: In-Browser GitHub Repository Code Explorer & D3 Impact */}
      <RepoExplorerModal
        project={activeRepoProject}
        onClose={() => setActiveRepoProject(null)}
      />

      {/* MODAL: Direct Verified PDF CV Viewer */}
      <PdfViewerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
