import React from 'react';
import { Zap } from 'lucide-react';
import { Translations } from '../types/i18n';

interface RuleOf72CardProps {
  annualReturn: number;
  t: Translations;
}

export const RuleOf72Card: React.FC<RuleOf72CardProps> = ({ annualReturn, t }) => {
  if (annualReturn <= 0) return null;

  const yearsToDouble = (72 / annualReturn).toFixed(1);

  return (
    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/20 flex items-center gap-3 text-xs">
      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 fill-emerald-500/30" />
      </div>

      <div className="leading-relaxed text-slate-700 dark:text-slate-300">
        <strong className="text-emerald-800 dark:text-emerald-300 font-bold block sm:inline sm:mr-1 rtl:sm:ml-1">
          {t.ruleOf72Title}:
        </strong>
        <span>
          {t.ruleOf72Prefix}{' '}
          <strong className="text-slate-900 dark:text-white font-mono font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 mx-0.5">
            {yearsToDouble}
          </strong>{' '}
          {t.ruleOf72Suffix}
        </span>
      </div>
    </div>
  );
};
