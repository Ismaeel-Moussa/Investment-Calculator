import React from 'react';
import { Repeat, Wallet } from 'lucide-react';
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
      <div className="grid grid-cols-2 gap-1.5" role="tablist" aria-label={t.calculationStrategy}>
        {/* Tab 1: Monthly Recurring */}
        <button
          type="button"
          role="tab"
          id="tab-recurring"
          aria-selected={activeMode === 'recurring'}
          aria-controls="panel-recurring"
          onClick={() => onChange('recurring')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-medium transition-all duration-200 ${
            activeMode === 'recurring'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/50'
          }`}
        >
          <Repeat className={`w-4 h-4 shrink-0 ${activeMode === 'recurring' ? 'text-emerald-100' : 'text-slate-400'}`} />
          <span className="text-xs sm:text-sm text-center leading-tight sm:leading-normal">
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
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-medium transition-all duration-200 ${
            activeMode === 'lumpsum'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/50'
          }`}
        >
          <Wallet className={`w-4 h-4 shrink-0 ${activeMode === 'lumpsum' ? 'text-cyan-100' : 'text-slate-400'}`} />
          <span className="text-xs sm:text-sm text-center leading-tight sm:leading-normal">
            {t.lumpSumMode}
          </span>
        </button>
      </div>
    </div>
  );
};
