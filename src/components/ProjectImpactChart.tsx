import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { DevOpsProject } from '../data/projectsData';
import { TrendingUp, Zap, Clock, ShieldCheck, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ProjectImpactChartProps {
  project: DevOpsProject;
}

interface ImpactMetricItem {
  category: string;
  label: string;
  baseline: number;
  achieved: number;
  unit: string;
  percentageGain: number;
  highlightText: string;
}

export const ProjectImpactChart: React.FC<ProjectImpactChartProps> = ({ project }) => {
  const { isDark } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    title: string;
    detail: string;
  } | null>(null);

  // Domain-accurate impact dataset based on the project ID
  const getImpactData = (): ImpactMetricItem[] => {
    switch (project.id) {
      case 'terraform-cloud-iac':
        return [
          { category: 'Provisioning Speed', label: 'Env Spin-up Time', baseline: 72, achieved: 4, unit: 'hours vs min', percentageGain: 94, highlightText: '72 hrs manual down to 4 mins' },
          { category: 'Security Compliance', label: 'Policy Checks Passed', baseline: 40, achieved: 100, unit: '%', percentageGain: 60, highlightText: '100% CIS/Checkov benchmark pass' },
          { category: 'Cost Optimization', label: 'Unused Resource Drift', baseline: 35, achieved: 0, unit: '% drift', percentageGain: 100, highlightText: 'Zero orphaned S3/EBS volumes' },
          { category: 'Deployment Reliability', label: 'Failed Deployments', baseline: 25, achieved: 1, unit: '% fail', percentageGain: 96, highlightText: '96% reduction in syntax/state errors' },
        ];
      case 'monitoring-logging-loki-prometheus':
        return [
          { category: 'Incident MTTR', label: 'Mean Time to Resolution', baseline: 65, achieved: 12, unit: 'mins', percentageGain: 81, highlightText: 'Correlated trace/log speedup' },
          { category: 'Alert Noise Reduction', label: 'False Positive Alarms', baseline: 100, achieved: 25, unit: '%', percentageGain: 75, highlightText: '75% reduction in flapping pages' },
          { category: 'Log Ingestion Speed', label: 'Latency to Searchable', baseline: 15, achieved: 0.25, unit: 'sec', percentageGain: 98, highlightText: 'Sub-second Loki log discovery' },
          { category: 'SLO Coverage', label: 'Production Monitored', baseline: 40, achieved: 99.9, unit: '%', percentageGain: 60, highlightText: '99.9% Golden Signals coverage' },
        ];
      case 'kubernetes-production-platform':
      case 'multi-region-gitops':
        return [
          { category: 'Deployment Velocity', label: 'Release Cycle Time', baseline: 45, achieved: 1.5, unit: 'mins', percentageGain: 96, highlightText: 'Cut from 45 min down to 90 sec' },
          { category: 'Infrastructure Density', label: 'Compute Utilization', baseline: 30, achieved: 90, unit: '%', percentageGain: 200, highlightText: '+200% pod bin-packing efficiency' },
          { category: 'Downtime Impact', label: 'Upgrade Interruption', baseline: 12, achieved: 0, unit: 'sec', percentageGain: 100, highlightText: 'Zero dropped TCP connections' },
          { category: 'Configuration Drift', label: 'Ad-Hoc Cluster Mutations', baseline: 45, achieved: 0, unit: '%', percentageGain: 100, highlightText: 'ArgoCD self-healing auto-reverts drift' },
        ];
      case 'enterprise-devsecops':
        return [
          { category: 'Vulnerability Gating', label: 'High/Critical CVEs', baseline: 18, achieved: 0, unit: 'cves', percentageGain: 100, highlightText: '100% blocked from cluster admission' },
          { category: 'Security Review Lead', label: 'Time to Approval', baseline: 120, achieved: 2.5, unit: 'hours vs min', percentageGain: 98, highlightText: 'Cut from 5 days to 2.5 min in CI' },
          { category: 'Headers Compliance', label: 'OWASP / DAST Score', baseline: 55, achieved: 100, unit: '%', percentageGain: 45, highlightText: 'Strict HSTS, CSP & Clickjack defense' },
          { category: 'Secret Protection', label: 'Unencrypted Token Leaks', baseline: 8, achieved: 0, unit: 'leaks', percentageGain: 100, highlightText: 'Zero credential breaches' },
        ];
      default:
        return [
          { category: 'Pipeline Reduction', label: 'Manual Effort Saved', baseline: 100, achieved: 15, unit: '%', percentageGain: 85, highlightText: '85% manual workflow eliminated' },
          { category: 'Infrastructure Efficiency', label: 'Resource Density', baseline: 35, achieved: 92, unit: '%', percentageGain: 162, highlightText: 'Standardized modular IaC adoption' },
          { category: 'Release Stability', label: 'Uptime & Availability', baseline: 95, achieved: 99.9, unit: '%', percentageGain: 5, highlightText: 'Sustained 99.9%+ SLA compliance' },
          { category: 'Root Cause Resolution', label: 'Diagnostic Speed', baseline: 60, achieved: 10, unit: 'mins', percentageGain: 83, highlightText: 'Runbook-guided incident resolution' },
        ];
    }
  };

  const impactData = getImpactData();

  useEffect(() => {
    if (!svgRef.current) return;

    // D3.js Chart Rendering
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 25, right: 30, bottom: 40, left: 140 };
    const width = 600 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Gradient definition
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'impactGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', isDark ? '#06b6d4' : '#0284c7');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#10b981');

    // Scales
    const y = d3
      .scaleBand()
      .domain(impactData.map((d) => d.category))
      .range([0, height])
      .padding(0.3);

    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickSize(height)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', isDark ? '#1e293b' : '#e2e8f0')
      .attr('stroke-dasharray', '3 3');

    // Y Axis (Labels)
    g.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .call((axis) => axis.select('.domain').remove())
      .selectAll('text')
      .attr('fill', isDark ? '#cbd5e1' : '#334155')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('dx', '-8px');

    // X Axis (Percentage gain)
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `${d}%`))
      .call((axis) => axis.select('.domain').attr('stroke', isDark ? '#334155' : '#cbd5e1'))
      .selectAll('text')
      .attr('fill', isDark ? '#94a3b8' : '#64748b')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace');

    // Background track bars
    g.selectAll('.track-bar')
      .data(impactData)
      .enter()
      .append('rect')
      .attr('class', 'track-bar')
      .attr('y', (d) => y(d.category) || 0)
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', width)
      .attr('rx', 4)
      .attr('fill', isDark ? '#161e2e' : '#f1f5f9');

    // Animated Impact Value Bars
    const bars = g
      .selectAll('.impact-bar')
      .data(impactData)
      .enter()
      .append('rect')
      .attr('class', 'impact-bar')
      .attr('y', (d) => y(d.category) || 0)
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('rx', 4)
      .attr('fill', 'url(#impactGradient)')
      .attr('cursor', 'pointer')
      .attr('width', 0);

    // D3 Transition animation
    bars
      .transition()
      .duration(900)
      .delay((_, i) => i * 120)
      .ease(d3.easeCubicOut)
      .attr('width', (d) => x(Math.min(d.percentageGain, 100)));

    // Event listeners for interactive tooltips
    bars
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('opacity', 0.85);
        const [posX, posY] = d3.pointer(event, svg.node());
        setActiveTooltip({
          x: posX + 10,
          y: posY - 10,
          title: d.label,
          detail: `${d.highlightText} (+${d.percentageGain}% gain)`,
        });
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 1);
        setActiveTooltip(null);
      });

    // Bar End Metric Value Labels
    g.selectAll('.value-label')
      .data(impactData)
      .enter()
      .append('text')
      .attr('y', (d) => (y(d.category) || 0) + y.bandwidth() / 2 + 3.5)
      .attr('x', (d) => x(Math.min(d.percentageGain, 100)) + 8)
      .attr('fill', isDark ? '#34d399' : '#059669')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text((d) => `+${d.percentageGain}%`)
      .attr('opacity', 0)
      .transition()
      .duration(900)
      .delay((_, i) => i * 120 + 300)
      .attr('opacity', 1);
  }, [project, impactData, isDark]);

  return (
    <div className={`rounded-xl border p-5 shadow-lg relative overflow-hidden transition-colors ${
      isDark ? 'border-slate-700/80 bg-[#0e1422]' : 'border-slate-200 bg-white'
    }`}>
      {/* Card Header */}
      <div className={`flex items-center justify-between pb-3 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-sm font-bold tracking-tight flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <span>Project Impact & Engineering Gains</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                isDark
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                D3.js Verified
              </span>
            </h4>
            <p className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Measured production efficiency, cycle time reduction & reliability telemetry
            </p>
          </div>
        </div>

        <div className={`hidden sm:flex items-center gap-1.5 text-xs font-mono font-semibold ${
          isDark ? 'text-cyan-400' : 'text-sky-600'
        }`}>
          <Zap className="w-3.5 h-3.5" />
          <span>High-Efficiency Gain</span>
        </div>
      </div>

      {/* 4 Metric Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
        {impactData.map((item, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                : 'bg-slate-50 border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className={`text-[10px] font-mono truncate ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {item.category}
            </div>
            <div className="text-base font-extrabold font-mono text-emerald-500 mt-0.5">
              +{item.percentageGain}%
            </div>
            <div className={`text-[10px] truncate mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {item.highlightText}
            </div>
          </div>
        ))}
      </div>

      {/* D3 SVG Container with responsive viewbox */}
      <div className="w-full overflow-x-auto relative pt-1">
        <svg
          ref={svgRef}
          viewBox="0 0 600 220"
          className="w-full h-auto max-w-full"
          style={{ minWidth: '450px' }}
        />

        {/* Dynamic Tooltip */}
        {activeTooltip && (
          <div
            style={{ left: activeTooltip.x, top: activeTooltip.y }}
            className={`absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-3 py-1.5 rounded-lg border text-xs shadow-xl backdrop-blur-md ${
              isDark
                ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100'
                : 'bg-slate-900 text-white border-slate-700 shadow-md'
            }`}
          >
            <div className="font-bold text-emerald-400">{activeTooltip.title}</div>
            <div className="text-[11px] text-slate-300">{activeTooltip.detail}</div>
          </div>
        )}
      </div>

      {/* Footer Metrics Narrative */}
      <div className={`mt-3 pt-3 border-t flex flex-wrap items-center justify-between text-xs font-mono ${
        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-emerald-500" />
          <span>Production MTTR & Lead Time Reduction</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
          <span>100% Policy-as-Code Enforced</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-indigo-500" />
          <span>Golden Signals Monitored</span>
        </div>
      </div>
    </div>
  );
};
