# Madhav Gupta — Senior Cloud Engineer, DevOps & SRE Portfolio

An interactive, production-grade DevOps and Site Reliability Engineering portfolio showcasing Madhav Gupta's advanced cloud engineering capabilities. It features 5 enterprise-grade DevOps projects that reflect the actual depth of his real-world platform engineering work at Velotic and PTC—complete with interactive GitHub-style repository browsers, real file trees, Dockerfiles, CI/CD pipelines, Terraform IaC, Helm charts, and SRE runbooks.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The projects currently listed in your resume's "Projects" section only cover basic IaC, basic AKS containerization, and operations scripts. Based on your clarification, we will build **5 brand-new, enterprise-scale projects** derived from your real-world work across multi-region infrastructure, DevSecOps gating, enterprise cloud platform reliability, cross-subscription load balancing, and SLO noise reduction.

- **Confirmed Decision 1**: Add 5 advanced enterprise DevOps projects demonstrating multi-cluster GitOps, automated DevSecOps compliance, production SRE telemetry & SLOs, zero-downtime canary delivery, and the Multi-Cloud "Cloud Provisioner" IaC framework.
- **Confirmed Decision 2**: Provide full GitHub repository file suites for each project directly in the portfolio—including interactive folder trees, syntax-highlighted Dockerfiles, CI/CD pipeline workflows (GitHub Actions & Jenkinsfiles), Terraform & Bicep IaC, Helm charts, Python/Bash scripts, and comprehensive architectural documentation.
- **Confirmed Decision 3**: Include one-click complete repository ZIP exports (via client-side JSZip) and an interactive live CI/CD pipeline simulator for recruiters to test pipeline execution and test logs in real time.

---

## 1. Overview & Core Concept

### What It Does
A high-performance portfolio application built for Senior Cloud Engineers, DevOps Architects, and SREs. Visitors can:
1. Review Madhav Gupta's verified career timeline (Velotic, PTC, MR Softwares), core competencies, certifications, and awards.
2. Explore 5 advanced enterprise DevOps projects that take his platform engineering experience to senior/lead levels.
3. Open an interactive **GitHub-style Project Code Explorer** with live file switching, copy buttons, line numbers, and instant ZIP downloading of complete project repositories.
4. Run an interactive **Live CI/CD Pipeline Simulator** that steps through build, lint, SAST security scan, container build, Helm validation, and cluster deployment with realistic terminal streaming logs.
5. Filter projects by technology stack (Kubernetes, Terraform, DevSecOps, Observability, Multi-Cloud).
6. Access and preview his original verified PDF resume directly with embedded viewing.

### Target Audience & Persona
- Engineering Directors, VP of Infrastructure, DevOps & SRE Hiring Managers, and Technical Recruiters evaluating senior cloud infrastructure capabilities.
- Seeks tangible proof of production readiness: modular IaC, zero-downtime GitOps pipelines, shift-left security enforcement, and high-availability architecture.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Landing & Identity Zone**: Hero introducing Madhav Gupta with professional title ("Cloud Engineer · DevOps · SRE"), core metrics (4+ Years Cloud Ops, 100+ App Teams Supported, 99.9% Uptime, 25% Alert Noise Reduction), verified contact links (GitHub, LinkedIn, Email, Phone), and quick CTA buttons ("Browse Projects", "Inspect GitHub Repos", "Download CV").
2. **Career Timeline & Experience**: Compact, dense chronological timeline detailing roles at Velotic, PTC (promoted from NOC Associate), and MR Softwares with measurable achievements.
3. **Advanced Projects Showcase (The Core Highlight)**:
   - **Project 1: Multi-Region GitOps Orchestration Platform (AKS & EKS)**
     - *Scope*: ArgoCD ApplicationSets, multi-cluster syncing, automated drift detection, cross-region failover.
     - *Repo Files*: `.github/workflows/gitops-sync.yml`, `Dockerfile` (multi-stage non-root distroless), `helm/Chart.yaml`, `helm/values-prod.yaml`, `argocd/application-set.yaml`, `terraform/aks-cluster.tf`, `README.md`.
   - **Project 2: Enterprise DevSecOps CI/CD Pipeline & Shift-Left Compliance Engine**
     - *Scope*: Automated SAST (Semgrep/SonarQube), DAST (OWASP ZAP), image vulnerability scanning (Trivy), SBOM generation (Syft), admission control (Kyverno/OPA).
     - *Repo Files*: `.github/workflows/devsecops-gate.yml`, `Dockerfile.hardened`, `policies/disallow-root-user.yaml`, `security/security-headers.conf`, `scripts/vulnerability-gate.sh`, `README.md`.
   - **Project 3: Production SRE Observability Stack & SLI/SLO Noise Reduction Engine**
     - *Scope*: Multi-window multi-burn-rate alerting, automated telemetry correlation, 25% on-call alert fatigue reduction, RCA incident post-mortems.
     - *Repo Files*: `prometheus/slo-alerts.yml`, `grafana/dashboards/cloud-golden-signals.json`, `docker-compose.yml`, `scripts/alert_deduplication.py`, `runbooks/P0-ClusterOutage-RCA.md`, `README.md`.
   - **Project 4: Zero-Downtime Progressive Canary Delivery Engine**
     - *Scope*: Argo Rollouts with automated metric analysis, automated rollback on 5xx spike, traffic splitting with Azure App Gateway / NGINX Ingress.
     - *Repo Files*: `.github/workflows/canary-release.yml`, `k8s/rollout-spec.yaml`, `k8s/analysis-template.yaml`, `scripts/traffic_validation.sh`, `Dockerfile`, `README.md`.
   - **Project 5: Multi-Cloud Enterprise "Cloud Provisioner" IaC Framework (Terraform & Bicep)**
     - *Scope*: Modular self-service cloud provisioning for 100+ application teams, cross-subscription ALB, Azure RBAC, Managed Identities, and Ansible automated node bootstrapping.
     - *Repo Files*: `terraform/modules/vnet_hub_spoke/main.tf`, `terraform/modules/vnet_hub_spoke/variables.tf`, `bicep/cross-sub-load-balancer.bicep`, `ansible/bootstrap-node.yml`, `workflows/terraform-ci.yml`, `README.md`.
4. **Interactive GitHub Repository Explorer Modal**:
   - Tabbed or split-pane view with a full file tree hierarchy (`.github/`, `terraform/`, `helm/`, `scripts/`, `Dockerfile`, `README.md`).
   - Clean syntax-highlighted code viewer with line numbers, code copy button, and file path indicator.
   - One-click "Download Complete Repo (.ZIP)" button bundling all genuine files on the fly.
5. **Interactive Pipeline Runner / Terminal Simulator**:
   - Recruiters can trigger a simulated test run of the CI/CD pipeline for any project, watching stages (Lint -> Test -> Security Scan -> Build Image -> Helm Lint -> ArgoCD Sync) execute with realistic colored terminal output.

### Visual Identity & Theme
- **Aesthetic Direction**: Sleek, high-precision SRE / Infrastructure Engineering aesthetic. Dark neutral canvas inspired by modern cloud terminals, paired with subtle cool zinc borders and vibrant emerald (`#10B981`) and electric cyan (`#06B6D4`) focal points.
- **Color Budget (60-30-10)**:
  - 60% Canvas: Deep dark slate / jet black (`#090D16` / `#0D1117`).
  - 30% Structural Surfaces: Carbon zinc surfaces (`#161B22`, `#1E2530`), hairline borders (`#30363D`), muted typography (`#94A3B8`).
  - 10% Accents: Emerald green for pipeline success and terminal prompts (`#10B981`), Cyan for Kubernetes/Cloud tags (`#06B6D4`), Amber for warning/drift checks (`#F59E0B`).
- **Typography & Hierarchy**:
  - Headings: `Plus Jakarta Sans` / `Outfit` (tight tracking, semi-bold weights).
  - Code & Telemetry: `JetBrains Mono` / monospace tabular numerals for metrics, log terminals, and repository files.
  - Body: Highly legible sans-serif (`Plus Jakarta Sans`, 14-16px, 1.6 line height).
- **Anti-Slop Discipline**:
  - No decorative pulsing dots next to static headers.
  - Unboxed metadata with typographic separators (`·` and `/`).
  - Strict Top Bar Contract with single-line brand mark, clean nav links, and one primary action ("Download CV").

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full In-Browser Virtual Repository File System**
  - *Chosen Approach*: Embed all authentic repository files, directory hierarchies, and manifests in a structured TypeScript data model, combined with an interactive file-tree viewer and real client-side ZIP generation via JSZip.
  - *Why*: Recruiters rarely follow dead external GitHub links to empty repos. Viewing high-fidelity code, Dockerfiles, and pipelines right inside the portfolio immediately proves technical competence.
- **Decision 2: Interactive Pipeline Simulator vs Static Screenshots**
  - *Chosen Approach*: Build a step-by-step interactive terminal simulator with authentic pipeline stages (build, test, trivy scan, terraform plan, helm dry-run).
  - *Why*: Differentiates Madhav from ordinary portfolio websites; recruiters can see the exact automated steps and security gates he authors.
- **Decision 3: Direct PDF CV Embedding & Download**
  - *Chosen Approach*: Embed the user's provided CV (`/public/assets/aistudio/cv_0f3dcf82.pdf`) seamlessly with a modal preview and direct download affordance.
  - *Why*: Ensures total continuity with his real credentials and contact details.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Navigation & Top Bar                        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────────┐    ┌─────────────────────────┐    ┌──────────────────┐
│ Hero & Overview  │    │ 5 Advanced DevOps Repos │    │ SRE Experience   │
│ - Professional   │    │ - GitOps Multi-Cluster  │    │ - Velotic / PTC  │
│   Summary & KPIs │    │ - DevSecOps CI/CD Gate  │    │ - Certifications │
│ - Quick Actions  │    │ - SRE Observability/SLO │    │ - PDF CV Preview │
└──────────────────┘    │ - Canary Progressive    │    └──────────────────┘
                        │ - Cloud Provisioner IaC │
                        └───────────┬─────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Interactive Project Modal / Code Explorer                │
│ ┌───────────────────────┐ ┌──────────────────────────────────────────┐ │
│ │ File Tree Hierarchy   │ │ Active File Code Viewer                  │ │
│ │  ├─ .github/workflows │ │  - Syntax-highlighted tokens             │ │
│ │  ├─ terraform/        │ │  - Line numbers                          │ │
│ │  ├─ helm/             │ │  - One-click copy code                   │ │
│ │  ├─ Dockerfile        │ │  - Direct ZIP archive export (JSZip)     │ │
│ │  └─ README.md         │ │  - Pipeline Terminal Simulator Mode      │ │
│ └───────────────────────┘ └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Structure
- `src/data/projectsData.ts`: Complete repository tree specifications, file contents, code manifests (Dockerfiles, YAML pipelines, Terraform files, Python scripts, and documentation) for all 5 advanced projects.
- `src/data/profileData.ts`: Madhav Gupta's verified experience, career timeline, competencies, certifications, and contact information.
- `src/components/Header.tsx`: Compliant Top Bar with brand mark, nav anchors, and resume action.
- `src/components/Hero.tsx`: High-impact engineer intro, verified metrics, quick CTA jump links.
- `src/components/ProjectCard.tsx`: Rich showcase cards with stack tags, architecture summary, and quick launch triggers.
- `src/components/RepoExplorerModal.tsx`: Comprehensive GitHub-style file explorer with interactive sidebar, file viewer, copy affordance, and ZIP download.
- `src/components/PipelineSimulatorModal.tsx`: Live simulated execution of CI/CD pipelines with realistic stage progress and colorized logs.
- `src/components/ExperienceTimeline.tsx`: Detailed career milestones and real-world impact.
- `src/components/PdfViewerModal.tsx`: Clean modal viewer for `public/assets/aistudio/cv_0f3dcf82.pdf`.
