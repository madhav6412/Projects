import React, { useState, useEffect } from 'react';
import { DevOpsProject, ProjectFile } from '../data/projectsData';
import { X, FileCode, Copy, Check, Download, ExternalLink, GitBranch, BarChart3, Code2, Github } from 'lucide-react';
import { downloadProjectAsZip } from '../utils/zipExporter';
import { ProjectImpactChart } from './ProjectImpactChart';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useTheme } from '../context/ThemeContext';

interface RepoExplorerModalProps {
  project: DevOpsProject | null;
  onClose: () => void;
}

export const RepoExplorerModal: React.FC<RepoExplorerModalProps> = ({
  project,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'impact'>('code');
  const [viewMarkdownFormatted, setViewMarkdownFormatted] = useState(true);

  useEffect(() => {
    if (project && project.files.length > 0) {
      const readme = project.files.find((f) => f.name.toLowerCase() === 'readme.md');
      setSelectedFile(readme || project.files[0]);
      setActiveTab('code');
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      await downloadProjectAsZip(project);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'dockerfile': return 'Dockerfile';
      case 'yaml': return 'YAML Manifest';
      case 'hcl': return 'Terraform HCL';
      case 'markdown': return 'Markdown Doc';
      case 'python': return 'Python Script';
      case 'bash': return 'Shell Script';
      case 'json': return 'JSON Spec';
      case 'javascript': return 'Node.js JS';
      default: return lang.toUpperCase();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-6xl h-[90vh] flex flex-col rounded-xl border shadow-2xl overflow-hidden transition-colors ${
        isDark ? 'border-slate-700 bg-[#0d1117] text-slate-100' : 'border-slate-200 bg-white text-slate-900'
      }`}>
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          isDark ? 'bg-[#161b22] border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 text-xs font-mono hover:text-emerald-400 transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
              }`}
              title="Open this repository directly on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>madhav6412</span>
              <span>/</span>
              <span className={`font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {project.githubUrl.split('/').filter(Boolean).pop() || project.id}
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
            </a>
            <div className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border ${
              isDark
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-white text-slate-600 border-slate-200 shadow-xs'
            }`}>
              <GitBranch className="w-3 h-3 text-emerald-500" />
              <span>main</span>
            </div>
            <span className={`hidden md:inline text-xs font-mono font-semibold ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              · {project.tierLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher: Code vs Impact */}
            <div className={`flex items-center p-0.5 rounded-lg border ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code Explorer</span>
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'impact'
                    ? 'bg-sky-500 text-white font-semibold shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Project Impact (D3.js)</span>
              </button>
            </div>

            {/* Direct Link to Repo on GitHub */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors border shadow-xs ${
                isDark
                  ? 'text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-800/60 hover:text-emerald-300'
                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-300 shadow-xs'
              }`}
              title="Open repository directly on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View on GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </a>

            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer border ${
                isDark
                  ? 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700'
                  : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isDownloading ? 'Bundling...' : 'Download (.zip)'}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1 rounded-md transition-colors cursor-pointer ml-1 ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Switchable between Code Explorer and D3 Impact Visualizer */}
        {activeTab === 'impact' ? (
          <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 ${
            isDark ? 'bg-[#090d16]' : 'bg-slate-50'
          }`}>
            {/* D3.js Project Impact Card */}
            <ProjectImpactChart project={project} />

            {/* Architecture & Problem/Solution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-5 rounded-xl border ${
                isDark ? 'border-slate-800 bg-[#0e1422]' : 'border-slate-200 bg-white shadow-xs'
              }`}>
                <h4 className="text-xs font-mono text-sky-600 dark:text-cyan-400 uppercase tracking-wider font-semibold mb-2">
                  The Engineering Challenge
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.problemStatement}
                </p>
              </div>

              <div className={`p-5 rounded-xl border ${
                isDark ? 'border-slate-800 bg-[#0e1422]' : 'border-slate-200 bg-white shadow-xs'
              }`}>
                <h4 className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold mb-2">
                  Architectural Solution
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.solutionArchitecture}
                </p>
              </div>
            </div>

            {/* Verified Quantitative Impacts */}
            <div className={`p-5 rounded-xl border ${
              isDark ? 'border-slate-800 bg-[#0e1422]' : 'border-slate-200 bg-white shadow-xs'
            }`}>
              <h4 className={`text-xs font-mono uppercase tracking-wider font-semibold mb-3 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Production Outcomes & Telemetry Impact
              </h4>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {project.impact.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* File Explorer Sidebar */}
            <div className={`w-full md:w-72 border-b md:border-b-0 md:border-r p-3 overflow-y-auto shrink-0 max-h-48 md:max-h-full ${
              isDark ? 'bg-[#161b22]/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`flex items-center justify-between text-[11px] font-mono uppercase tracking-wider mb-2 px-2 ${
                isDark ? 'text-slate-400' : 'text-slate-500 font-semibold'
              }`}>
                <span>Repository Files ({project.files.length})</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-500 flex items-center gap-1 font-mono text-[11px] text-emerald-500 transition-colors"
                  title="Open this repository on GitHub"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <nav className="space-y-0.5">
                {project.files.map((file) => {
                  const isActive = selectedFile?.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between text-xs font-mono transition-colors cursor-pointer ${
                        isActive
                          ? isDark
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold shadow-xs'
                          : isDark
                          ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-emerald-500' : isDark ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className="truncate">{file.path}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              <div className={`mt-4 pt-3 border-t px-2 text-[11px] space-y-1 ${
                isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                <div className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Key Highlights:
                </div>
                <ul className="list-disc list-inside space-y-0.5">
                  {project.impact.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="line-clamp-2">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Active File Code Area */}
            <div className={`flex-1 flex flex-col overflow-hidden ${
              isDark ? 'bg-[#090d16]' : 'bg-[#0f172a]'
            }`}>
              {selectedFile ? (
                <>
                  {/* File Header Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#161f30] border-b border-slate-700/80 text-xs">
                    <div className="flex items-center gap-2 font-mono text-slate-300 truncate">
                      <span className="font-semibold text-white">{selectedFile.path}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 text-[11px]">{getLanguageLabel(selectedFile.language)}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 text-[11px] truncate max-w-xs">{selectedFile.description}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Markdown Preview / Raw Toggle */}
                      {(selectedFile.language === 'markdown' || selectedFile.path.toLowerCase().endsWith('.md')) && (
                        <div className="flex items-center bg-slate-900/90 rounded border border-slate-700 p-0.5 text-[11px] font-mono">
                          <button
                            onClick={() => setViewMarkdownFormatted(true)}
                            className={`px-2 py-0.5 rounded transition-colors ${
                              viewMarkdownFormatted
                                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Rendered
                          </button>
                          <button
                            onClick={() => setViewMarkdownFormatted(false)}
                            className={`px-2 py-0.5 rounded transition-colors ${
                              !viewMarkdownFormatted
                                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Raw
                          </button>
                        </div>
                      )}

                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700 shadow-xs"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Syntax & Content Display Area */}
                  {(selectedFile.language === 'markdown' || selectedFile.path.toLowerCase().endsWith('.md')) && viewMarkdownFormatted ? (
                    <div className="flex-1 overflow-auto bg-[#090d16]">
                      <MarkdownRenderer content={selectedFile.content} isDark={true} />
                    </div>
                  ) : (
                    <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-slate-200 select-text">
                      <pre className="whitespace-pre overflow-x-auto selection:bg-emerald-500/30 selection:text-emerald-300">
                        {selectedFile.content}
                      </pre>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-xs font-mono text-slate-500">
                  Select a manifest or script from the repository file tree.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
