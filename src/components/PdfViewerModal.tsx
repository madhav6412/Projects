import React, { useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl = '/assets/aistudio/cv_0f3dcf82.pdf',
}) => {
  const { isDark } = useTheme();

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-5xl h-[90vh] flex flex-col rounded-xl border shadow-2xl overflow-hidden transition-colors ${
        isDark ? 'border-slate-700 bg-[#0d121c] text-white' : 'border-slate-200 bg-white text-slate-900'
      }`}>
        {/* Modal Top Bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          isDark ? 'bg-[#151c2a] border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-500" />
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Madhav Gupta — Professional Resume (CV)
            </span>
            <span className={`text-xs font-mono hidden sm:inline ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              · Verified Document
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Madhav_Gupta_Cloud_DevOps_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors border ${
                isDark
                  ? 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700'
                  : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-200 shadow-xs'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors ml-1 cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embed Area */}
        <div className="flex-1 w-full bg-slate-900 overflow-hidden relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Madhav Gupta CV"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};
