import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  isDark?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, isDark = true }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Helper to parse inline elements: **bold**, `code`, [link](url)
  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Inline Code: `code`
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        parts.push(
          <code
            key={key++}
            className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-medium ${
              isDark
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // Bold: **text**
      const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
      if (boldMatch) {
        parts.push(
          <strong key={key++} className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Link: [text](url)
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={key++}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 underline underline-offset-2 inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // Regular character
      const nextSpecial = remaining.search(/[`*\[]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else if (nextSpecial > 0) {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      } else {
        parts.push(remaining[0]);
        remaining = remaining.slice(1);
      }
    }

    return parts;
  };

  // Split markdown into blocks
  const blocks: React.ReactNode[] = [];
  const lines = content.split('\n');
  let i = 0;
  let codeBlockCounter = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code Block: ```language
    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3).trim() || 'bash';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const fullCode = codeLines.join('\n');
      const currentIndex = codeBlockCounter++;

      blocks.push(
        <div
          key={`code-${currentIndex}-${i}`}
          className={`my-4 rounded-lg overflow-hidden border ${
            isDark ? 'border-slate-700/80 bg-[#0d1117]' : 'border-slate-300 bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-slate-700/60 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-mono">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold">{language}</span>
            </div>
            <button
              onClick={() => handleCopy(fullCode, currentIndex)}
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
            >
              {copiedCodeIndex === currentIndex ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre">
            {fullCode}
          </pre>
        </div>
      );
      continue;
    }

    // Table: starts with | and next line has |---
    if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const headerRow = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      i += 2; // skip header and delimiter row
      const dataRows: string[][] = [];

      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const row = lines[i]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        dataRows.push(row);
        i++;
      }

      blocks.push(
        <div
          key={`table-${i}`}
          className={`my-4 overflow-x-auto rounded-lg border ${
            isDark ? 'border-slate-700 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
          }`}
        >
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'bg-slate-800/70 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}>
                {headerRow.map((h, hIdx) => (
                  <th key={hIdx} className="px-3.5 py-2.5 font-semibold font-mono text-[11px] uppercase tracking-wider">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {dataRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={`transition-colors ${
                    isDark
                      ? rIdx % 2 === 0
                        ? 'bg-transparent'
                        : 'bg-slate-800/30'
                      : rIdx % 2 === 0
                      ? 'bg-white'
                      : 'bg-slate-50'
                  }`}
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`px-3.5 py-2 font-mono text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      blocks.push(
        <h1
          key={`h1-${i}`}
          className={`text-2xl font-extrabold tracking-tight mt-6 mb-3 pb-2 border-b ${
            isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
          }`}
        >
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={`h2-${i}`}
          className={`text-lg font-bold tracking-tight mt-6 mb-2.5 pb-1.5 border-b flex items-center gap-2 ${
            isDark ? 'text-emerald-400 border-slate-800' : 'text-emerald-700 border-slate-200'
          }`}
        >
          <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
          <span>{renderInline(line.slice(3))}</span>
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={`h3-${i}`}
          className={`text-sm font-semibold uppercase tracking-wider mt-4 mb-2 font-mono ${
            isDark ? 'text-sky-300' : 'text-sky-700'
          }`}
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('#### ')) {
      blocks.push(
        <h4
          key={`h4-${i}`}
          className={`text-xs font-semibold mt-3 mb-1 font-mono ${
            isDark ? 'text-slate-300' : 'text-slate-800'
          }`}
        >
          {renderInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // Horizontal Rule: ---
    if (line.trim() === '---') {
      blocks.push(
        <hr
          key={`hr-${i}`}
          className={`my-5 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
        />
      );
      i++;
      continue;
    }

    // Blockquote: >
    if (line.startsWith('>')) {
      blocks.push(
        <blockquote
          key={`quote-${i}`}
          className={`my-2 pl-3.5 py-1.5 border-l-2 text-xs italic ${
            isDark
              ? 'border-emerald-500 text-slate-300 bg-emerald-950/20'
              : 'border-emerald-600 text-slate-700 bg-emerald-50'
          }`}
        >
          {renderInline(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Unordered List: * or -
    if (line.trim().match(/^[\*\-]\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^[\*\-]\s+/)) {
        listItems.push(lines[i].trim().replace(/^[\*\-]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-2 space-y-1.5 pl-4 text-xs">
          {listItems.map((item, idx) => (
            <li key={idx} className={`list-disc ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List: 1. , 2.
    if (line.trim().match(/^\d+\.\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-2 space-y-1.5 pl-5 text-xs">
          {listItems.map((item, idx) => (
            <li key={idx} className={`list-decimal font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Standard Paragraph
    blocks.push(
      <p
        key={`p-${i}`}
        className={`my-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
      >
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return (
    <div className={`prose max-w-none text-xs leading-relaxed space-y-2 p-4 sm:p-6 ${
      isDark ? 'text-slate-200' : 'text-slate-800'
    }`}>
      {blocks}
    </div>
  );
};
