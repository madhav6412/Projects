export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  context: string;
  achievements: string[];
  skills: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  badgeUrl?: string;
}

export interface AwardItem {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export const PROFILE_DATA = {
  name: "Madhav Gupta",
  role: "Senior Cloud Engineer · DevOps · SRE",
  headline: "Architecting Resilient Multi-Cloud Platforms, GitOps Pipelines & SRE Observability",
  contact: {
    phone: "+91-7000467594",
    email: "madhavgupta0594@gmail.com",
    linkedin: "https://www.linkedin.com/in/madhav-gupta-77048b140/",
    github: "https://github.com/madhav6412",
    location: "Ujjain, Madhya Pradesh, India",
    resumeUrl: "/assets/aistudio/cv_5d43cdc1.pdf",
  },
  summary:
    "Cloud Engineer, DevOps Engineer, and Site Reliability Engineer (SRE) with 4+ years building and operating mission-critical cloud infrastructure, GitOps pipelines, and production support across Azure and AWS. Specialist in enterprise ThingWorx IIoT platform reliability, multi-cluster Kubernetes (AKS, EKS), Terraform & Bicep IaC automation, zero-downtime deployment pipelines, and proactive observability with Prometheus, Grafana, and Sumo Logic.",
  metrics: [
    { label: "Cloud Experience", value: "4+ Years", detail: "Azure, AWS & Hybrid Clouds" },
    { label: "Engineering Teams Supported", value: "100+", detail: "Wireline & Wireless Domains" },
    { label: "Alert Noise Reduction", value: "25%", detail: "Optimized SLIs, SLOs & Telemetry" },
    { label: "Deployment Cycle Time", value: "-30%", detail: "Reusable Terraform & GitOps" },
    { label: "Production Availability", value: "99.9%", detail: "Zero-Downtime Releases & DR" },
  ],
  competencies: [
    { category: "Cloud & Container Platforms", items: ["Azure Kubernetes Service (AKS)", "AWS EKS", "Docker", "Azure VNet / Hub-Spoke", "AWS EC2 / IAM", "Azure Entra ID", "Multi-Region Cloud Architecture"] },
    { category: "Infrastructure as Code & Config", items: ["Terraform & Modular IaC", "Azure Bicep", "ARM Templates", "Helm 3", "Ansible Playbooks", "State Management & Drift Detection"] },
    { category: "CI/CD & GitOps Automation", items: ["ArgoCD", "GitHub Actions", "Jenkins CI/CD", "Bitbucket Pipelines", "Zero-Downtime Canary / Blue-Green", "GitOps Synchronizations"] },
    { category: "Observability & Site Reliability", items: ["Prometheus & Alertmanager", "Grafana Dashboards", "Sumo Logic", "Zabbix", "New Relic & NRQL", "SLIs / SLOs / Error Budgets", "Incident RCA & Runbooks"] },
    { category: "Security & Networking", items: ["Azure Key Vault", "Azure DNS & Traffic Manager", "Cross-Subscription Load Balancers", "Network Security Groups (NSGs)", "Azure RBAC & Managed Identity", "DAST / Apache Hardening", "Trivy & Kyverno"] },
    { category: "Scripting & Tooling", items: ["Python Automation", "Bash & Shell Scripting", "PowerShell", "Linux (RHEL, Ubuntu)", "ServiceNow & JIRA", "ThingWorx IIoT Platform"] },
  ],
  experiences: [
    {
      id: "velotic",
      role: "Specialist Cloud Applications Engineer (Cloud / DevOps / SRE)",
      company: "Velotic",
      period: "Oct 2026 – Present",
      location: "Remote",
      type: "Full-Time",
      context: "Multi-region Azure/AWS supporting enterprise ThingWorx IIoT platform for global manufacturing and telecommunications clients (ThingWorx business acquired by Velotic effective Oct 2026).",
      achievements: [
        "Architect, deploy, and manage multi-region Azure and AWS cloud infrastructure supporting enterprise ThingWorx IIoT deployments, sustaining 100% compliance with corporate security and governance.",
        "Design modular, reusable Terraform and Bicep Infrastructure-as-Code templates to standardize cloud resource provisioning across production and non-production environments, cutting deployment cycle time by 30%.",
        "Build and maintain CI/CD pipelines using Jenkins, Git, and Bitbucket Pipelines, enabling zero-downtime, repeatable releases for global engineering teams; deploy Kubernetes workloads using Helm and ArgoCD (GitOps).",
        "Manage Kubernetes clusters (AKS, EKS) and containerized applications; troubleshoot pods, networking, ingress, load balancing, and scaling issues under high-traffic production demands.",
        "Key member of DevSecOps team supporting 100+ application teams across Wireline and Wireless domains, provisioning and managing Azure environments through Cloud Provisioner (a Terraform & Helm automation tool).",
        "Automate routine cloud operations and incident remediation using Python, Bash, and PowerShell scripts integrated with ServiceNow and JIRA.",
      ],
      skills: ["Azure AKS", "AWS EKS", "Terraform", "Bicep", "Helm", "ArgoCD", "Jenkins", "Python", "ThingWorx IIoT"],
    },
    {
      id: "ptc-specialist",
      role: "Specialist Cloud Applications Engineer (Cloud / DevOps / SRE)",
      company: "Parametric Technology Corporation (PTC)",
      period: "Oct 2025 – Sep 2026",
      location: "Remote",
      type: "Full-Time",
      context: "Enterprise ThingWorx IIoT platform cloud operations, automation engineering, and application onboarding.",
      achievements: [
        "Authored and maintained Terraform modules for Azure infrastructure and Helm charts for Kubernetes application deployments.",
        "Onboarded new MSAI Kubernetes instances on Azure Kubernetes Service (AKS) and developed CI/CD pipelines for multiple frontend and backend applications.",
        "Implemented Global IP and cross-subscription load balancer functionality within Cloud Provisioner automation suite.",
        "Collaborated with application teams to assess automation feasibility, configure build agents on AKS, and manage Jenkins builds as per release schedules.",
        "Developed Ansible playbooks to automate the installation of Maven, GitLab, Java, and Node.js on Azure virtual machines.",
        "Managed NSGs, Azure RBAC, and Managed Identities for secure cross-network access, alongside certificate management using Azure Key Vault and Azure DNS.",
        "Supported DAST security reviews and engineered remediation recommendations for Apache web security headers.",
        "Built New Relic alerts, dashboards, and NRQL-based metrics, collaborating with development teams to define SLAs, SLIs, and SLOs.",
      ],
      skills: ["Terraform Modules", "Azure AKS", "Helm", "Ansible", "Azure Key Vault", "New Relic NRQL", "DAST Security", "Apache"],
    },
    {
      id: "ptc-noc",
      role: "Cloud NOC Engineer (Promoted from Cloud NOC Engineer Associate)",
      company: "Parametric Technology Corporation (PTC)",
      period: "Mar 2022 – Sep 2025",
      location: "Remote",
      type: "Full-Time",
      context: "24/7 cloud operations, incident triage, and monitoring across hybrid Linux (RHEL, Ubuntu) and Windows Server environments on Azure and AWS.",
      achievements: [
        "Eliminated unscheduled downtime across hybrid production environments through 24/7 proactive cloud operations and NOC monitoring.",
        "Developed Bash and PowerShell automation scripts for routine system administration and cloud lifecycle health checks, saving 10+ hours of manual effort per week.",
        "Configured telemetry thresholds, monitoring, and alert policies in Zabbix and Sumo Logic, reducing false-positive alert noise by 25% and accelerating incident response times.",
        "Sustained 99%+ uptime through proactive monitoring, log analysis, and automated health-check alerts, reducing SLA breach risk by 30%.",
        "Handled L1/L2 incident escalations, authored Kubernetes operational runbooks and SOPs, and collaborated with core engineering teams to resolve production bottlenecks.",
      ],
      skills: ["Zabbix", "Sumo Logic", "Prometheus", "Bash Scripting", "PowerShell", "RHEL", "Kubernetes Runbooks", "RCA"],
    },
    {
      id: "mr-softwares",
      role: "Systems Administrator & Support Executive",
      company: "MR Softwares",
      period: "Nov 2019 – Mar 2022",
      location: "Ujjain, India",
      type: "Full-Time",
      context: "Enterprise IT infrastructure administration and end-user support operations.",
      achievements: [
        "Administered internal enterprise IT infrastructure including servers, networks, hardware, and end-user systems, achieving a 95% first-contact resolution rate.",
        "Managed IAM user access, roles, and permissions, and automated data backup schedules, sustaining 99.5% uptime across server and network environments.",
      ],
      skills: ["Linux Server Administration", "IAM & Security", "Network Configuration", "Backup Automation"],
    },
  ],
  education: {
    degree: "B.Sc. in Computer Science",
    institution: "Future Vision College, Vikram University",
    location: "Ujjain, India",
    year: "2018",
  },
  certifications: [],
  awards: [
    {
      title: "Cloud Network Automation Champion",
      organization: "Parametric Technology Corporation (PTC)",
      year: "2025",
      description: "Awarded for exceptional contribution to automated cross-subscription networking and Cloud Provisioner infrastructure modules.",
    },
  ],
};
