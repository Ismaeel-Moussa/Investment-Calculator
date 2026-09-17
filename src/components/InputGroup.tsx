import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Language, ThemeMode } from '../types/i18n';

interface InputGroupProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  icon?: LucideIcon;
  tooltip?: string;
  quickPresets?: number[];
  lang?: Language;
  theme?: ThemeMode;
  onChange: (value: number) => void;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  icon: Icon,
  tooltip,
  quickPresets,
  lang = 'en',
  theme = 'dark',
  onChange,
}) => {
  const isRtl = lang === 'ar';
  // Compute percentage for slider gradient track fill
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onChange(min);
      return;
    }
    const num = parseFloat(rawVal);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const unfilledTrack = theme === 'light' ? '#cbd5e1' : '#334155';
  const sliderGradient = isRtl
    ? `linear-gradient(to left, #10b981 0%, #10b981 ${percentage}%, ${unfilledTrack} ${percentage}%, ${unfilledTrack} 100%)`
    : `linear-gradient(to right, #10b981 0%, #10b981 ${percentage}%, ${unfilledTrack} ${percentage}%, ${unfilledTrack} 100%)`;

  return (
    <div className="space-y-3 bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={`${id}-input`} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          {Icon && <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
          <span>{label}</span>
          {tooltip && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline" title={tooltip}>
              ({tooltip})
            </span>
          )}
        </label>

        {/* Numeric Input */}
        <div className="relative flex items-center">
          {prefix && (
            <span
              className={`absolute text-slate-500 dark:text-slate-400 font-medium text-xs pointer-events-none ${
                isRtl ? 'right-2.5' : 'left-2.5'
              }`}
            >
              {prefix}
            </span>
          )}
          <input
            id={`${id}-input`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={Number.isFinite(value) ? value : 0}
            onChange={handleInputChange}
            className={`w-28 sm:w-32 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 text-right font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all shadow-sm dark:shadow-none ${
              isRtl
                ? `${prefix ? 'pr-7' : 'pr-3'} ${suffix ? 'pl-7' : 'pl-3'}`
                : `${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-7' : 'pr-3'}`
            }`}
          />
          {suffix && (
            <span
              className={`absolute text-slate-500 dark:text-slate-400 font-medium text-xs pointer-events-none ${
                isRtl ? 'left-2.5' : 'right-2.5'
              }`}
            >
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Synchronized Slider with dynamic track gradient */}
      <div className="relative flex items-center pt-1" dir={isRtl ? 'rtl' : 'ltr'}>
        <input
          id={`${id}-slider`}
          aria-label={`${label} slider`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          style={{
            background: sliderGradient,
          }}
          className="w-full h-2 rounded-lg cursor-pointer transition-all"
        />
      </div>

      {/* Quick preset buttons */}
      {quickPresets && quickPresets.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {quickPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-xs active:scale-95 ${
                value === preset
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/50 ring-1 ring-emerald-500/30 font-bold'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-700/70 hover:bg-slate-50 dark:hover:bg-slate-700/80'
              }`}
            >
              {prefix}
              {preset.toLocaleString()}
              {suffix}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
