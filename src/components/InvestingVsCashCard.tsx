import React from 'react';
import { PiggyBank, TrendingUp, Sparkles } from 'lucide-react';
import { CurrencyCode, Language, Translations } from '../types/i18n';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface InvestingVsCashCardProps {
  totalInvested: number;
  finalBalance: number;
  totalInterest: number;
  currency: CurrencyCode;
  lang: Language;
  t: Translations;
}

export const InvestingVsCashCard: React.FC<InvestingVsCashCardProps> = ({
  totalInvested,
  finalBalance,
  totalInterest,
  currency,
  lang,
  t,
}) => {
  // Avoid division by zero
  const multiplier = totalInvested > 0 ? (finalBalance / totalInvested) : 1;
  const growthPercent = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;

  return (
    <div className="glass-panel p-5 rounded-2xl relative overflow-hidden space-y-4 border border-slate-200/80 dark:border-slate-800/80">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-3">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.vsCashTitle}</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            {t.vsCashSubtitle}
          </p>
        </div>
      </div>

      {/* Two Comparison Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Box 1: Traditional Cash Savings */}
        <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t.cashSavings}
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 font-['Cairo',sans-serif]">
            {formatCurrency(totalInvested, false, currency, lang)}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {t.cashSavingsDesc}
          </p>
        </div>

        {/* Box 2: Smart Compound Growth */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {t.compoundInvesting}
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-['Cairo',sans-serif]">
            {formatCurrency(finalBalance, false, currency, lang)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
            <span>+{formatPercent(growthPercent, 1, lang)}</span>
            <span>({multiplier.toFixed(2)}x {t.multiplierBadge})</span>
          </div>
        </div>
      </div>

      {/* Extra Wealth Highlight Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <span className="text-slate-700 dark:text-slate-300 font-semibold block">
              {t.freeMoneyGained}:
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              {t.cashComparisonInsight}
            </span>
          </div>
        </div>

        <div className="text-base sm:text-lg font-extrabold text-amber-700 dark:text-amber-400 font-mono shrink-0 self-end sm:self-auto">
          +{formatCurrency(totalInterest, false, currency, lang)}
        </div>
      </div>
    </div>
  );
};
