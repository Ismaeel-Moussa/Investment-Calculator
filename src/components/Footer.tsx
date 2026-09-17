import React from 'react';
import { Linkedin, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { Translations } from '../types/i18n';

interface FooterProps {
  t: Translations;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md pt-8 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
          
          {/* Creator Attribution */}
          <div className="flex flex-col items-center md:items-start text-center md:text-start gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.footerDevelopedBy}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {t.developerName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {t.footerTitle}
            </p>
          </div>

          {/* Social & Contact Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/ismaeel-moussa"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-[#0A66C2] dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 hover:border-[#0A66C2]/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow transition-all duration-200"
              aria-label={`${t.developerName} on LinkedIn`}
            >
              <div className="w-6 h-6 rounded-lg bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] group-hover:scale-110 transition-transform">
                <Linkedin className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">{t.contactLinkedIn}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A66C2] dark:group-hover:text-blue-400 transition-colors" />
            </a>

            {/* Email Contact */}
            <a
              href="mailto:ismaeel.moussa1@gmail.com"
              className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 shadow-sm hover:shadow transition-all duration-200"
              aria-label={`Email ${t.developerName}`}
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-500/10 dark:bg-cyan-400/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-medium font-mono" dir="ltr">
                ismaeel.moussa1@gmail.com
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-4 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 text-center">
          <p>
            © {currentYear}{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {t.developerName}
            </span>
            . {t.footerRights}
          </p>
        </div>
      </div>
    </footer>
  );
};
