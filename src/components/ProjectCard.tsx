import React, { useState, useRef } from 'react';
import { DevOpsProject } from '../data/projectsData';
import { FolderGit2, Download, ExternalLink, Check, Star, GitFork, GitCommit, Github } from 'lucide-react';
import { downloadProjectAsZip } from '../utils/zipExporter';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useRepoStats } from '../services/githubStatsService';

interface ProjectCardProps {
  project: DevOpsProject;
  onOpenRepo: (project: DevOpsProject) => void;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenRepo,
  index = 0,
}) => {
  const { isDark } = useTheme();
  const repoStats = useRepoStats(project.githubUrl);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  // 3D Parallax Tilt Effect on Mouse Move
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      await downloadProjectAsZip(project);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error("ZIP download failed", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const getTierBadge = () => {
    if (project.tier === 'advanced') {
      return (
        <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
          isDark
            ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
            : 'text-sky-700 bg-sky-50 border border-sky-200'
        }`}>
          ★ Advanced Enterprise
        </span>
      );
    }
    if (project.tier === 'core') {
      return (
        <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${
          isDark
            ? 'text-slate-300 bg-slate-800/60 border border-slate-700/60'
            : 'text-slate-700 bg-slate-100 border border-slate-200'
        }`}>
          Resume Core
        </span>
      );
    }
    return (
      <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${
        isDark
          ? 'text-amber-400 bg-amber-950/40 border border-amber-800/40'
          : 'text-amber-700 bg-amber-50 border border-amber-200'
      }`}>
        NOC & Automation
      </span>
    );
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: (index % 2) * 0.1 }}
        className={`group relative rounded-xl border flex flex-col justify-between overflow-hidden transition-all duration-300 backdrop-blur-sm h-full ${
          isDark
            ? 'bg-[#0c111c]/95 border-slate-800 hover:border-emerald-500/50 shadow-xl hover:shadow-[0_12px_35px_rgba(16,185,129,0.15)]'
            : 'bg-white border-slate-200/90 hover:border-emerald-500/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12)]'
        }`}
      >
        <div className="p-5 sm:p-6" style={{ transform: 'translateZ(15px)' }}>
          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3">
            <div className="flex items-center gap-2">
              {getTierBadge()}
              <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}>
                {project.categoryLabel}
              </span>
              <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {project.files.length} files
              </span>
            </div>
            <span className={`font-mono text-[11px] font-semibold ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              Zero-Downtime Ready
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold tracking-tight transition-colors ${
            isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
          }`}>
            {project.title}
          </h3>

          {/* Tagline */}
          <p className={`mt-2 text-sm leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {project.tagline}
          </p>

          {/* Real-Time GitHub Repository Stats */}
          <div
            style={{ transform: 'translateZ(18px)' }}
            className={`mt-3 py-2 px-3 rounded-lg border flex flex-wrap items-center justify-between text-xs font-mono transition-colors ${
              isDark
                ? 'bg-[#0f1523] border-slate-800'
                : 'bg-slate-50 border-slate-200/90'
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 font-semibold" title="GitHub Stars">
                <Star className="w-3.5 h-3.5 fill-amber-500/20 text-amber-500" />
                <span>{repoStats.stars}</span>
                <span className={`text-[10px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>stars</span>
              </div>
              <div className="flex items-center gap-1 text-sky-500 font-semibold" title="GitHub Forks">
                <GitFork className="w-3.5 h-3.5 text-sky-500" />
                <span>{repoStats.forks}</span>
                <span className={`text-[10px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>forks</span>
              </div>
              <div className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`} title="Last commit date">
                <GitCommit className="w-3.5 h-3.5 text-emerald-500" />
                <span>Updated {repoStats.lastCommitDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px]">
              <span className={`w-1.5 h-1.5 rounded-full ${
                repoStats.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-sky-500'
              }`} />
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {repoStats.isLive ? 'GitHub API Live' : 'GitHub Synced'}
              </span>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className={`mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-3 rounded-lg border ${
              isDark
                ? 'bg-slate-900/80 border-slate-800/80'
                : 'bg-white border-slate-200/90 shadow-xs'
            }`}
          >
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-left">
                <div className={`text-[10px] uppercase tracking-wider font-mono ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {m.label}
                </div>
                <div className={`text-xs font-bold font-mono tabular-nums mt-0.5 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Short Summary */}
          <p className={`mt-4 text-xs leading-relaxed line-clamp-3 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {project.overview}
          </p>

          {/* Architecture Diagram Collapsible */}
          {project.architectureDiagram && (
            <div className="mt-4">
              <button
                onClick={() => setShowArchitecture(!showArchitecture)}
                className={`text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                  isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-700 hover:text-sky-800 font-medium'
                }`}
              >
                <span>{showArchitecture ? '▾ Hide Architecture Diagram' : '▸ View ASCII Architecture Diagram'}</span>
              </button>
              {showArchitecture && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mt-2 p-3 rounded font-mono text-[11px] whitespace-pre overflow-x-auto leading-tight border ${
                    isDark
                      ? 'bg-black/60 border-slate-800 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-emerald-400'
                  }`}
                >
                  {project.architectureDiagram}
                </motion.div>
              )}
            </div>
          )}

          {/* Tech Stack List */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 text-[11px] font-mono rounded border ${
                  isDark
                    ? 'bg-slate-800/80 text-slate-300 border-slate-700/60'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div
          style={{ transform: 'translateZ(10px)' }}
          className={`px-5 py-3.5 border-t flex flex-wrap items-center justify-between gap-2 transition-colors ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-slate-50/90 border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Open GitHub Explorer Modal & D3 Impact */}
            <button
              onClick={() => onOpenRepo(project)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Inspect Code & Impact</span>
            </button>

            {/* 2. Real ZIP Download */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              title="Download full project repository as .zip"
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer border ${
                isDark
                  ? 'text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border-slate-700/80'
                  : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-300 shadow-xs'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>ZIP</span>
                </>
              )}
            </button>
          </div>

          {/* In-browser repo viewer & verified GitHub profile link */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenRepo(project)}
              className={`text-xs flex items-center gap-1 transition-colors font-mono cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
              }`}
              title="Open full interactive code explorer"
            >
              <span>View Code</span>
            </button>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>·</span>
            <a
              href="https://github.com/madhav6412"
              target="_blank"
              rel="noreferrer"
              className={`text-xs flex items-center gap-1 transition-colors font-mono ${
                isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'
              }`}
              title="Visit Madhav's verified GitHub profile (@madhav6412)"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@madhav6412</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
};
