import React, { useState } from 'react';
import { PROFILE_DATA } from '../data/profileData';
import { Mail, Phone, Linkedin, Github, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ContactSection: React.FC = () => {
  const { isDark } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className={`py-16 md:py-24 border-b transition-colors duration-300 ${
      isDark ? 'border-slate-800 bg-[#090d16]' : 'border-slate-200/90 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 uppercase tracking-wider font-semibold ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            <span>Get In Touch</span>
            <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
            <span>Direct Channels</span>
          </div>
          <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Let's Build Resilient Infrastructure
          </h2>
          <p className={`mt-3 text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Open to discussing Senior Cloud Engineer, DevOps Lead, and Site Reliability Engineering roles,
            multi-region Kubernetes migrations, or GitOps architecture consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Email Card */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0d121e]'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-emerald-500/50'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Email Address
                </span>
                <Mail className="w-4 h-4 text-emerald-500" />
              </div>
              <div className={`text-sm font-semibold break-all ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {PROFILE_DATA.contact.email}
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className={`mt-4 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Phone Card */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0d121e]'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-sky-500/50'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Phone
                </span>
                <Phone className="w-4 h-4 text-sky-500" />
              </div>
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {PROFILE_DATA.contact.phone}
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className={`mt-4 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-sky-500 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Phone</span>
                </>
              )}
            </button>
          </div>

          {/* LinkedIn Card */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0d121e]'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-sky-500/50'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  LinkedIn Profile
                </span>
                <Linkedin className="w-4 h-4 text-sky-600" />
              </div>
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                in/madhav-gupta-77048b140
              </div>
            </div>
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`mt-4 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-sky-600 hover:bg-sky-700 text-white border-sky-600 shadow-xs'
              }`}
            >
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* GitHub Card */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all shadow-xs hover:shadow-md ${
            isDark
              ? 'border-slate-800 bg-[#0d121e]'
              : 'border-slate-200/90 bg-slate-50/70 hover:border-slate-400'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  GitHub Repos
                </span>
                <Github className="w-4 h-4 text-purple-500" />
              </div>
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                github.com/madhav6412
              </div>
            </div>
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noreferrer"
              className={`mt-4 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-xs'
              }`}
            >
              <span>Visit GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
