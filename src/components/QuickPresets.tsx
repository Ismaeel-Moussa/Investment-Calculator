import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Rocket } from 'lucide-react';
import { Translations } from '../types/i18n';

interface Preset {
  name: string;
  description: string;
  icon: React.ElementType;
  rate: number;
}

interface QuickPresetsProps {
  onSelectRate: (rate: number) => void;
  currentRate: number;
  t: Translations;
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onSelectRate, currentRate, t }) => {
  const presets: Preset[] = [
    {
      name: t.presetCash,
      description: t.presetCashDesc,
      icon: ShieldCheck,
      rate: 4.0,
    },
    {
      name: t.presetBalanced,
      description: t.presetBalancedDesc,
      icon: TrendingUp,
      rate: 6.5,
    },
    {
      name: t.presetSP500,
      description: t.presetSP500Desc,
      icon: Sparkles,
      rate: 10.0,
    },
    {
      name: t.presetGrowth,
      description: t.presetGrowthDesc,
      icon: Rocket,
      rate: 12.5,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
        {t.benchmarksTitle}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => {
          const Icon = preset.icon;
          const isSelected = Math.abs(currentRate - preset.rate) < 0.1;

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSelectRate(preset.rate)}
              className={`p-3.5 rounded-2xl text-left rtl:text-right border transition-all flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Header: Title & Icon */}
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  {preset.name}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-emerald-500/25 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Footer: Rate & Risk Description */}
              <div className="flex items-baseline justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800/60 w-full">
                <span
                  className={`text-lg font-extrabold font-mono ${
                    isSelected
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {preset.rate}%
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {preset.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
