import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { YearlyBreakdownItem } from '../types/calculator';
import { CurrencyCode, Language, ThemeMode, Translations } from '../types/i18n';
import { formatCompactCurrency, formatCurrency } from '../utils/formatters';
import { BarChart3, AreaChart as AreaChartIcon } from 'lucide-react';

interface GrowthChartProps {
  data: YearlyBreakdownItem[];
  currency: CurrencyCode;
  lang: Language;
  theme?: ThemeMode;
  t: Translations;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: number;
  currency: CurrencyCode;
  lang: Language;
  t: Translations;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  currency,
  lang,
  t,
}) => {
  if (active && payload && payload.length) {
    const invested = payload.find((p) => p.name === t.chartInvestedLegend)?.value || 0;
    const interest = payload.find((p) => p.name === t.chartInterestLegend)?.value || 0;
    const total = invested + interest;

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 p-3 rounded-xl shadow-xl dark:shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[200px]">
        <div className="font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
          <span>
            {t.chartYearPrefix} {label}
          </span>
          <span className="text-slate-900 dark:text-white font-bold font-mono">
            {formatCurrency(total, false, currency, lang)}
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              {t.chartInvestedLegend}:
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200 font-mono">
              {formatCurrency(invested, false, currency, lang)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
              {t.chartInterestLegend}:
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-300 font-mono">
              +{formatCurrency(interest, false, currency, lang)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const GrowthChart: React.FC<GrowthChartProps> = ({
  data,
  currency,
  lang,
  theme = 'dark',
  t,
}) => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  // Map data for stacked display: invested and accumulated interest
  const chartData = data.map((item) => {
    const invested = item.endingBalance - item.totalInterest;
    return {
      year: item.year,
      [t.chartInvestedLegend]: Math.max(0, Math.round(invested)),
      [t.chartInterestLegend]: Math.max(0, Math.round(item.totalInterest)),
      endingBalance: Math.round(item.endingBalance),
    };
  });

  const gridColor = theme === 'light' ? '#e2e8f0' : '#1e293b';
  const axisColor = theme === 'light' ? '#94a3b8' : '#64748b';

  return (
    <div className="glass-panel p-5 rounded-2xl">
      {/* Chart Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Cairo',sans-serif] flex items-center gap-2">
            {t.chartTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.chartSubtitle}</p>
        </div>

        {/* Area vs Bar Toggle */}
        <div className="flex items-center self-start sm:self-auto bg-slate-100 dark:bg-slate-900/80 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setChartType('area')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              chartType === 'area'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <AreaChartIcon className="w-3.5 h-3.5" />
            <span>{t.chartArea}</span>
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              chartType === 'bar'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.chartBar}</span>
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-72 sm:h-80" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="year"
                stroke={axisColor}
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `${t.chartYearPrefix} ${val}`}
              />
              <YAxis
                stroke={axisColor}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCompactCurrency(val, currency, lang)}
              />
              <Tooltip
                content={
                  <CustomTooltip currency={currency} lang={lang} t={t} />
                }
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 12, fontSize: 11 }}
                formatter={(val) => <span className="text-slate-700 dark:text-slate-300 ml-1">{val}</span>}
              />
              <Area
                type="monotone"
                dataKey={t.chartInvestedLegend}
                stackId="1"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorInvested)"
              />
              <Area
                type="monotone"
                dataKey={t.chartInterestLegend}
                stackId="1"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorInterest)"
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="year"
                stroke={axisColor}
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `${t.chartYearPrefix} ${val}`}
              />
              <YAxis
                stroke={axisColor}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => formatCompactCurrency(val, currency, lang)}
              />
              <Tooltip
                content={
                  <CustomTooltip currency={currency} lang={lang} t={t} />
                }
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 12, fontSize: 11 }}
                formatter={(val) => <span className="text-slate-700 dark:text-slate-300 ml-1">{val}</span>}
              />
              <Bar dataKey={t.chartInvestedLegend} stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
              <Bar dataKey={t.chartInterestLegend} stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
