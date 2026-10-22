import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Terminal, GitBranch, Github, ExternalLink, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface GitHubSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubSetupModal: React.FC<GitHubSetupModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'cli' | 'git' | 'projects' | 'secrets'>('cli');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const cliCommands = `# 1. Authenticate with GitHub CLI
gh auth login

# 2. Initialize local repository & default branch
git init
git branch -M main

# 3. Stage and commit files
git add .
git commit -m "feat: initial commit for Madhav Gupta DevOps & SRE portfolio"

# 4. Create repository on GitHub and push immediately
gh repo create madhav6412/devops-sre-portfolio --public --source=. --remote=origin --push`;

  const gitCommands = `# 1. Create repository 'devops-sre-portfolio' on github.com/new (do NOT check init with README)

# 2. Initialize local git tracking
git init
git branch -M main

# 3. Stage and commit all files
git add .
git commit -m "feat: initial commit for Madhav Gupta DevOps & SRE portfolio"

# 4. Connect to your remote repository
git remote add origin https://github.com/madhav6412/devops-sre-portfolio.git

# 5. Push code to main
git push -u origin main`;

  const projectRepoCommands = `# Create separate repositories for each project:

# Project 1: Terraform Cloud IaC Enterprise
gh repo create madhav6412/terraform-cloud-iac-enterprise --public --description "Enterprise Multi-Tier Cloud IaC (Terraform AWS VPC, EC2, RDS, S3 & ALB)"

# Project 2: Observability & Logging Stack
gh repo create madhav6412/monitoring-logging-loki-prometheus --public --description "Enterprise Observability & Logging Stack (Prometheus, Grafana, Loki & Promtail)"

# Project 3: Kubernetes Production Platform
gh repo create madhav6412/kubernetes-production-platform --public --description "Production Kubernetes Platform & Automated Deployment Strategy"

# Project 4: Multi-Region GitOps Orchestrator
gh repo create madhav6412/multi-region-gitops-orchestrator --public --description "Multi-Region GitOps Orchestration Platform with ArgoCD"

# Project 5: Enterprise DevSecOps Pipeline
gh repo create madhav6412/enterprise-devsecops-pipeline --public --description "Enterprise DevSecOps CI/CD & Automated Compliance Gate"`;

  const secretsGuide = `# Required GitHub Actions Repository Secrets
# Set these under: Settings > Secrets and variables > Actions

# 1. Keyless AWS OIDC Role ARN (for Terraform Apply):
AWS_TERRAFORM_ROLE_ARN = arn:aws:iam::123456789012:role/GitHubActionsTerraformRole

# 2. Infracost API Key (for automated PR cost breakdown):
INFRACOST_API_KEY = ico-xxxxxxxxxxxxxxxxxxxx

# 3. Production Kubeconfig (for automated deployment check):
KUBECONFIG_PROD = <base64-encoded-kubeconfig>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl border shadow-2xl overflow-hidden transition-colors ${
        isDark ? 'border-slate-700 bg-[#0d121c] text-white' : 'border-slate-200 bg-white text-slate-900'
      }`}>
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          isDark ? 'bg-[#151c2a] border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                Create & Push GitHub Repositories
              </h3>
              <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Commands for madhav6412/devops-sre-portfolio & project repos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
            >
              <span>GitHub.com/new</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex items-center gap-1 px-4 py-2 border-b overflow-x-auto text-xs font-medium ${
          isDark ? 'bg-[#0f1522] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cli'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>GitHub CLI (1-Step)</span>
          </button>

          <button
            onClick={() => setActiveTab('git')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'git'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Standard Git Remote</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-sky-500 text-white font-semibold shadow-xs'
                : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Individual Project Repos</span>
          </button>

          <button
            onClick={() => setActiveTab('secrets')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'secrets'
                ? 'bg-purple-500 text-white font-semibold shadow-xs'
                : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CI/CD Secrets</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className={`p-5 overflow-y-auto space-y-4 ${
          isDark ? 'bg-[#090d16]' : 'bg-slate-50'
        }`}>
          {activeTab === 'cli' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  Create and push repository using GitHub CLI:
                </span>
                <button
                  onClick={() => copyToClipboard(cliCommands, 'cli')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {copiedSnippet === 'cli' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-[#0f172a] text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {cliCommands}
              </pre>
            </div>
          )}

          {activeTab === 'git' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  Standard Git Remote Add & Push:
                </span>
                <button
                  onClick={() => copyToClipboard(gitCommands, 'git')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {copiedSnippet === 'git' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-[#0f172a] text-cyan-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {gitCommands}
              </pre>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-semibold ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
                  Create Repositories for Showcase Projects:
                </span>
                <button
                  onClick={() => copyToClipboard(projectRepoCommands, 'projects')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {copiedSnippet === 'projects' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-[#0f172a] text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {projectRepoCommands}
              </pre>
            </div>
          )}

          {activeTab === 'secrets' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  GitHub Actions Secrets for CI/CD Pipelines:
                </span>
                <button
                  onClick={() => copyToClipboard(secretsGuide, 'secrets')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {copiedSnippet === 'secrets' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Secrets</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-[#0f172a] text-amber-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {secretsGuide}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`px-5 py-3 border-t flex flex-wrap items-center justify-between text-xs font-mono ${
          isDark ? 'bg-[#151c2a] border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <span>Account: <strong>madhav6412</strong></span>
          <span className="text-emerald-500 font-semibold">README.md generated in root</span>
        </div>
      </div>
    </div>
  );
};
