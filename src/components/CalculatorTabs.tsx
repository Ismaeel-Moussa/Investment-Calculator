import React from 'react';
import { Repeat, Wallet, Target } from 'lucide-react';
import { CalculationMode } from '../types/calculator';
import { Translations } from '../types/i18n';

interface CalculatorTabsProps {
  activeMode: CalculationMode;
  onChange: (mode: CalculationMode) => void;
  t: Translations;
}

export const CalculatorTabs: React.FC<CalculatorTabsProps> = ({ activeMode, onChange, t }) => {
  return (
    <div className="w-full bg-slate-200/70 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-300/70 dark:border-slate-800/80 shadow-inner transition-colors">
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5" role="tablist" aria-label={t.calculationStrategy}>
        {/* Tab 1: Monthly Recurring */}
        <button
          type="button"
          role="tab"
          id="tab-recurring"
          aria-selected={activeMode === 'recurring'}
          aria-controls="panel-recurring"
          onClick={() => onChange('recurring')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl font-medium transition-all duration-200 ${
            activeMode === 'recurring'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/50'
          }`}
        >
          <Repeat className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeMode === 'recurring' ? 'text-emerald-100' : 'text-slate-400'}`} />
          <span className="text-[11px] sm:text-xs md:text-sm text-center leading-tight">
            {t.recurringMode}
          </span>
        </button>

        {/* Tab 2: Lump Sum */}
        <button
          type="button"
          role="tab"
          id="tab-lumpsum"
          aria-selected={activeMode === 'lumpsum'}
          aria-controls="panel-lumpsum"
          onClick={() => onChange('lumpsum')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl font-medium transition-all duration-200 ${
            activeMode === 'lumpsum'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/50'
          }`}
        >
          <Wallet className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeMode === 'lumpsum' ? 'text-cyan-100' : 'text-slate-400'}`} />
          <span className="text-[11px] sm:text-xs md:text-sm text-center leading-tight">
            {t.lumpSumMode}
          </span>
        </button>

        {/* Tab 3: Target Goal */}
        <button
          type="button"
          role="tab"
          id="tab-goal"
          aria-selected={activeMode === 'goal'}
          aria-controls="panel-goal"
          onClick={() => onChange('goal')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl font-medium transition-all duration-200 ${
            activeMode === 'goal'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/50'
          }`}
        >
          <Target className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeMode === 'goal' ? 'text-amber-100' : 'text-slate-400'}`} />
          <span className="text-[11px] sm:text-xs md:text-sm text-center leading-tight">
            {t.goalMode}
          </span>
        </button>
      </div>
    </div>
  );
};

