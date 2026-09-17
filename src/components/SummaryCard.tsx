import React from 'react';
import { PiggyBank, TrendingUp, Landmark, ArrowUpRight } from 'lucide-react';
import { CalculationResult } from '../types/calculator';
import { CurrencyCode, Language, Translations } from '../types/i18n';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface SummaryCardProps {
  result: CalculationResult;
  currency: CurrencyCode;
  lang: Language;
  t: Translations;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ result, currency, lang, t }) => {
  const { totalInvested, totalInterest, finalBalance, returnPercentage, multiplier } = result;

  const principalRatio = finalBalance > 0 ? (totalInvested / finalBalance) * 100 : 0;
  const interestRatio = finalBalance > 0 ? (totalInterest / finalBalance) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* 3 Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total Invested */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.totalInvested}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-['Cairo',sans-serif]">
              {formatCurrency(totalInvested, false, currency, lang)}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              {t.totalInvestedSub}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60" />
        </div>

        {/* Card 2: Total Interest Earned */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-400/60 dark:hover:border-emerald-700/60 transition-all duration-300 shadow-sm dark:shadow-glow-emerald/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {t.interestEarned}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight font-['Cairo',sans-serif]">
              +{formatCurrency(totalInterest, false, currency, lang)}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400/90 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
              <span>
                {formatPercent(returnPercentage, 1, lang)} {t.totalReturnSub}
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        {/* Card 3: Final Portfolio Value */}
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-400/60 dark:hover:border-cyan-700/60 transition-all duration-300 shadow-sm dark:shadow-glow-cyan/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              {t.finalPortfolioValue}
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-['Cairo',sans-serif]">
              {formatCurrency(finalBalance, false, currency, lang)}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                {multiplier.toFixed(2)}x {t.multiplierBadge}
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400" />
        </div>
      </div>

      {/* Portfolio Composition Ratio Bar */}
      <div className="glass-panel p-4 rounded-xl">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span>
              {t.principalInvestedRatio}:{' '}
              <strong className="text-slate-900 dark:text-white">{principalRatio.toFixed(1)}%</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
            <span>
              {t.interestGainsRatio}:{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">{interestRatio.toFixed(1)}%</strong>
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${principalRatio}%` }}
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
            title={`${t.principalInvestedRatio}: ${formatCurrency(totalInvested, false, currency, lang)} (${principalRatio.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${interestRatio}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-500"
            title={`${t.interestGainsRatio}: ${formatCurrency(totalInterest, false, currency, lang)} (${interestRatio.toFixed(1)}%)`}
          />
        </div>
      </div>
    </div>
  );
};
