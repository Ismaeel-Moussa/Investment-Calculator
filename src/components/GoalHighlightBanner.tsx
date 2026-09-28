import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { CurrencyCode, Language, Translations } from '../types/i18n';
import { formatCurrency } from '../utils/formatters';

interface GoalHighlightBannerProps {
  targetAmount: number;
  requiredMonthlyDeposit: number;
  years: number;
  currency: CurrencyCode;
  lang: Language;
  t: Translations;
}

export const GoalHighlightBanner: React.FC<GoalHighlightBannerProps> = ({
  targetAmount,
  requiredMonthlyDeposit,
  years,
  currency,
  lang,
  t,
}) => {
  const isAlreadyReached = requiredMonthlyDeposit === 0;


  return (
    <div className="relative overflow-hidden rounded-2xl p-5 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        {/* Top Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <Target className="w-3.5 h-3.5" />
            <span>{t.goalBadge || 'خطة الهدف المالي'}</span>
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {years} {t.yearsSuffix}
          </span>
        </div>

        {/* Main Result */}
        {isAlreadyReached ? (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              {t.goalAlreadyReached}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
              <span>{t.goalPlanSummary}</span>
              <strong className="text-slate-900 dark:text-white font-bold">
                {formatCurrency(targetAmount, false, currency, lang)}
              </strong>
            </p>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                {t.requiredMonthlyDeposit}:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {formatCurrency(requiredMonthlyDeposit, false, currency, lang)}
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {t.perMonth}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.requiredMonthlyDepositDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
