import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Language, ThemeMode } from '../types/i18n';

interface InputGroupProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
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
  prefix,
  suffix,
  icon: Icon,
  quickPresets,
  lang = 'en',
  onChange,
}) => {
  const isRtl = lang === 'ar';
  const [localValue, setLocalValue] = React.useState<string>(
    Number.isFinite(value) ? String(value) : '0'
  );
  const [isFocused, setIsFocused] = React.useState(false);

  // Sync external value when not focused
  React.useEffect(() => {
    if (!isFocused) {
      setLocalValue(Number.isFinite(value) ? String(value) : '0');
    }
  }, [value, isFocused]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // If the value is 0, clear it so typing immediately sets the first digit
    if (value === 0 || localValue === '0') {
      setLocalValue('');
    } else {
      // Select all content so typing immediately overwrites the old number
      const target = e.currentTarget;
      target.select();
      setTimeout(() => {
        target.select();
      }, 40);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (localValue.trim() === '' || isNaN(parseFloat(localValue))) {
      const fallback = min !== undefined && min > 0 ? min : 0;
      setLocalValue(String(fallback));
      onChange(fallback);
      return;
    }

    const num = parseFloat(localValue);
    // Don't restrict the user from entering large numbers! Only ensure it doesn't go below min (e.g. >= 0)
    let validNum = min !== undefined ? Math.max(min, num) : Math.max(0, num);
    if (max !== undefined) {
      validNum = Math.min(max, validNum);
    }
    setLocalValue(String(validNum));
    onChange(validNum);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value;

    // Convert Arabic-Indic digits (٠-٩) to standard numerals
    rawVal = rawVal.replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString());

    // Allow only digits and at most one decimal point
    if (!/^[0-9]*\.?[0-9]*$/.test(rawVal)) {
      return;
    }

    // If empty, keep display empty for user typing and notify 0
    if (rawVal === '') {
      setLocalValue('');
      onChange(0);
      return;
    }

    // Strip leading zero if followed by another digit (e.g. '05' -> '5')
    // but keep decimal forms like '0.' or '0.5'
    if (rawVal.length > 1 && rawVal.startsWith('0') && !rawVal.startsWith('0.')) {
      rawVal = rawVal.replace(/^0+(?=\d)/, '');
    }

    setLocalValue(rawVal);

    const num = parseFloat(rawVal);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handlePresetClick = (preset: number) => {
    setLocalValue(String(preset));
    onChange(preset);
  };

  return (
    <div className="space-y-3 bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={`${id}-input`}
          className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none flex-1 min-w-0"
        >
          {Icon && <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
          <span className="truncate">{label}</span>
        </label>

        {/* Numeric Input */}
        <div className="relative flex items-center shrink-0">
          {prefix && (
            <span
              className={`absolute text-slate-400 dark:text-slate-500 font-medium text-xs pointer-events-none z-10 ${
                isRtl ? 'right-2' : 'left-2'
              }`}
            >
              {prefix}
            </span>
          )}
          <input
            id={`${id}-input`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            value={localValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-[90px] sm:w-28 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all shadow-sm dark:shadow-none text-right ${
              isRtl
                ? `${prefix ? 'pr-5 sm:pr-6' : 'pr-2.5'} ${suffix ? 'pl-5 sm:pl-6' : 'pl-2.5'}`
                : `${prefix ? 'pl-5 sm:pl-6' : 'pl-2.5'} ${suffix ? 'pr-5 sm:pr-6' : 'pr-2.5'}`
            }`}
          />
          {suffix && (
            <span
              className={`absolute text-slate-400 dark:text-slate-500 font-medium text-xs pointer-events-none z-10 ${
                isRtl ? 'left-2' : 'right-2'
              }`}
            >
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Quick preset buttons */}
      {quickPresets && quickPresets.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {quickPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-xs active:scale-95 touch-manipulation ${
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
