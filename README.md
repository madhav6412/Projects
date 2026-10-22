# Madhav Gupta — DevOps, Cloud & SRE Portfolio Platform

> Enterprise-grade DevOps, Cloud Architecture, and Site Reliability Engineering portfolio showcasing production-ready Infrastructure as Code (Terraform), Kubernetes architectures, ArgoCD GitOps, DevSecOps compliance gates, and real-time observability telemetry.

---

## 🚀 Quick Start: How to Create and Push this GitHub Repository

Follow these step-by-step instructions to create and push this repository to your GitHub account (`madhav6412`).

### Option 1: Using the GitHub CLI (`gh`) (Fastest)

```bash
# 1. Authenticate with GitHub (if not already logged in)
gh auth login

# 2. Initialize a local git repository
git init
git branch -M main

# 3. Stage and commit all files
git add .
git commit -m "feat: initial commit for Madhav Gupta DevOps & SRE portfolio"

# 4. Create the remote repository on GitHub and push in one command
gh repo create madhav6412/devops-sre-portfolio --public --source=. --remote=origin --push
```

---

### Option 2: Using Standard Git Commands

#### Step 1: Create a New Repository on GitHub Web
1. Navigate to [github.com/new](https://github.com/new).
2. Enter Repository name: `devops-sre-portfolio` (or `madhav6412.github.io` for GitHub Pages).
3. Select **Public**.
4. **Do NOT** initialize with a README, .gitignore, or license (these are already configured in this repository).
5. Click **Create repository**.

#### Step 2: Initialize & Push Local Code
```bash
# 1. Initialize local git tracking
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: initial commit for Madhav Gupta DevOps & SRE portfolio"

# 4. Set default branch to main
git branch -M main

# 5. Link to your newly created GitHub repository
git remote add origin https://github.com/madhav6412/devops-sre-portfolio.git

# 6. Push your commits to GitHub
git push -u origin main
```

---

## 📦 How to Create Individual Repositories for the Showcase Projects

Every project in this portfolio contains full production file manifests that can be downloaded as `.zip` or initialized as standalone GitHub repositories:

### 1. Enterprise Multi-Tier Cloud IaC
```bash
# Repository Name: terraform-cloud-iac-enterprise
mkdir terraform-cloud-iac-enterprise && cd terraform-cloud-iac-enterprise
# (Extract the downloaded .zip or copy files)
git init
git add .
git commit -m "feat: modular Terraform AWS VPC, EC2, RDS, ALB, and Checkov CI/CD"
gh repo create madhav6412/terraform-cloud-iac-enterprise --public --source=. --remote=origin --push
```

### 2. SRE Observability & Logging Stack (Prometheus, Loki, Promtail, Grafana)
```bash
# Repository Name: monitoring-logging-loki-prometheus
mkdir monitoring-logging-loki-prometheus && cd monitoring-logging-loki-prometheus
git init
git add .
git commit -m "feat: Prometheus, Loki, Promtail, and Grafana observability stack with Docker Compose"
gh repo create madhav6412/monitoring-logging-loki-prometheus --public --source=. --remote=origin --push
```

### 3. Production Kubernetes Platform & Rolling Deployments
```bash
# Repository Name: kubernetes-production-platform
mkdir kubernetes-production-platform && cd kubernetes-production-platform
git init
git add .
git commit -m "feat: production Kubernetes manifests (Deployment, HPA, PDB, Ingress) and Kind setup"
gh repo create madhav6412/kubernetes-production-platform --public --source=. --remote=origin --push
```

### 4. Multi-Region GitOps Orchestration Platform
```bash
# Repository Name: multi-region-gitops-orchestrator
mkdir multi-region-gitops-orchestrator && cd multi-region-gitops-orchestrator
git init
git add .
git commit -m "feat: ArgoCD ApplicationSets multi-cluster GitOps delivery platform"
gh repo create madhav6412/multi-region-gitops-orchestrator --public --source=. --remote=origin --push
```

### 5. Enterprise DevSecOps CI/CD & Compliance Gate
```bash
# Repository Name: enterprise-devsecops-pipeline
mkdir enterprise-devsecops-pipeline && cd enterprise-devsecops-pipeline
git init
git add .
git commit -m "feat: shift-left DevSecOps automated gate with Trivy, Semgrep, and Kyverno"
gh repo create madhav6412/enterprise-devsecops-pipeline --public --source=. --remote=origin --push
```

---

## 🛠️ GitHub Actions Secrets Configuration

For the automated CI/CD workflows to execute seamlessly in your repositories, configure the following repository secrets under **Settings > Secrets and variables > Actions**:

| Secret Name | Purpose | Example / Format |
|---|---|---|
| `AWS_TERRAFORM_ROLE_ARN` | AWS OIDC IAM Role for keyless Terraform deployments | `arn:aws:iam::123456789012:role/GitHubActionsTerraformRole` |
| `INFRACOST_API_KEY` | Infracost API key for automated cloud cost diff comments on PRs | `ico-xxxxxxxxxxxxxxxxxxxx` |
| `KUBECONFIG_PROD` | Base64-encoded Kubeconfig for production Kubernetes rollout checks | `apiVersion: v1...` |
| `AZURE_CREDENTIALS` | Service Principal credentials for Azure Terraform deployments | `{"clientId":"...","clientSecret":"..."}` |

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run Vite development server on port 3000
npm run dev

# Build production bundle
npm run build

# Validate TypeScript without errors
npm run lint
```

---

## 👤 Profile & Contacts

- **Engineer**: Madhav Gupta
- **Role**: Cloud Engineer · DevOps · SRE
- **LinkedIn**: [linkedin.com/in/madhav-gupta-77048b140](https://www.linkedin.com/in/madhav-gupta-77048b140/)
- **GitHub**: [github.com/madhav6412](https://github.com/madhav6412)
- **Email**: madhavgupta0594@gmail.com
