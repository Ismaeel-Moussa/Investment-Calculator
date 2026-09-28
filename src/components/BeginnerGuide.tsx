import React, { useState } from 'react';
import {
  Compass,
  ShieldAlert,
  CreditCard,
  Coins,
  PieChart,
  Hourglass,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { Translations } from '../types/i18n';

interface BeginnerGuideProps {
  t: Translations;
}

export const BeginnerGuide: React.FC<BeginnerGuideProps> = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      icon: ShieldAlert,
      title: t.step1Title,
      desc: t.step1Desc,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: CreditCard,
      title: t.step2Title,
      desc: t.step2Desc,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: Coins,
      title: t.step3Title,
      desc: t.step3Desc,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: PieChart,
      title: t.step4Title,
      desc: t.step4Desc,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: Hourglass,
      title: t.step5Title,
      desc: t.step5Desc,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-all duration-300">
      {/* Header / Click to Expand */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
              {t.beginnerGuideTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.beginnerGuideSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
            {isOpen ? t.showLess : t.viewAll}
          </span>
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {isOpen && (
        <div className="px-5 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${step.bg} ${step.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sharia & Educational Note */}
          <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.shariaNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
