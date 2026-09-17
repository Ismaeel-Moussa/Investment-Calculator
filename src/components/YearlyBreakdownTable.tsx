import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Table as TableIcon, LayoutList, ArrowLeftRight } from 'lucide-react';
import { YearlyBreakdownItem } from '../types/calculator';
import { CurrencyCode, Language, Translations } from '../types/i18n';
import { formatCurrency, exportToCSV } from '../utils/formatters';

interface YearlyBreakdownTableProps {
  data: YearlyBreakdownItem[];
  currency: CurrencyCode;
  lang: Language;
  t: Translations;
}

export const YearlyBreakdownTable: React.FC<YearlyBreakdownTableProps> = ({
  data,
  currency,
  lang,
  t,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const INITIAL_ROWS = 10;
  const displayedRows = isExpanded ? data : data.slice(0, INITIAL_ROWS);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TableIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
              {t.tableTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.tableSubtitle}</p>
          </div>
        </div>

        {/* Actions: View Toggle on Mobile & CSV Export Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Mobile view toggle */}
          <div className="sm:hidden flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700/60 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <TableIcon className="w-3 h-3" />
              <span>{lang === 'ar' ? 'جدول' : 'Table'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LayoutList className="w-3 h-3" />
              <span>{lang === 'ar' ? 'بطاقات' : 'Cards'}</span>
            </button>
          </div>

          {/* CSV Export Button */}
          <button
            type="button"
            onClick={() => exportToCSV(data, 'investment-breakdown.csv', currency, lang)}
            id="export-csv-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.exportCSV}</span>
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <>
          {/* Mobile Swipe Hint */}
          <div className="sm:hidden flex items-center justify-between px-4 py-2 bg-emerald-500/5 dark:bg-emerald-950/20 border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-500" />
              <span>{lang === 'ar' ? 'اسحب أفقياً لعرض باقي الأعمدة (6 أعمدة)' : 'Swipe horizontally to view all columns'}</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left rtl:text-right text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/60 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-3 sm:px-4 font-semibold whitespace-nowrap sticky rtl:right-0 ltr:left-0 z-10 bg-slate-100 dark:bg-slate-900 shadow-[inset_-1px_0_0_rgba(226,232,240,0.9)] dark:shadow-[inset_-1px_0_0_rgba(51,65,85,0.8)] rtl:shadow-[inset_1px_0_0_rgba(226,232,240,0.9)] rtl:dark:shadow-[inset_1px_0_0_rgba(51,65,85,0.8)]">
                    {t.colYear}
                  </th>
                  <th className="py-3 px-3 sm:px-4 font-semibold text-right rtl:text-left whitespace-nowrap">{t.colStartingBalance}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold text-right rtl:text-left whitespace-nowrap">{t.colAnnualDeposit}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold text-right rtl:text-left text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                    {t.colInterestEarned}
                  </th>
                  <th className="py-3 px-3 sm:px-4 font-semibold text-right rtl:text-left whitespace-nowrap">{t.colTotalInterest}</th>
                  <th className="py-3 px-3 sm:px-4 font-semibold text-right rtl:text-left text-slate-900 dark:text-white whitespace-nowrap">{t.colEndingBalance}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/40 font-mono text-xs">
                {displayedRows.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 font-semibold text-slate-800 dark:text-slate-200 font-sans whitespace-nowrap sticky rtl:right-0 ltr:left-0 z-10 bg-white dark:bg-slate-950 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/90 shadow-[inset_-1px_0_0_rgba(226,232,240,0.9)] dark:shadow-[inset_-1px_0_0_rgba(51,65,85,0.8)] rtl:shadow-[inset_1px_0_0_rgba(226,232,240,0.9)] rtl:dark:shadow-[inset_1px_0_0_rgba(51,65,85,0.8)]">
                      {t.yearRowPrefix} {row.year}
                    </td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-right rtl:text-left text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {formatCurrency(row.startingBalance, false, currency, lang)}
                    </td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-right rtl:text-left text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {formatCurrency(row.annualContributions, false, currency, lang)}
                    </td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-right rtl:text-left text-emerald-700 dark:text-emerald-400 font-semibold whitespace-nowrap">
                      +{formatCurrency(row.interestEarned, false, currency, lang)}
                    </td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-right rtl:text-left text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {formatCurrency(row.totalInterest, false, currency, lang)}
                    </td>
                    <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-right rtl:text-left text-slate-900 dark:text-white font-semibold whitespace-nowrap">
                      {formatCurrency(row.endingBalance, false, currency, lang)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Mobile Cards View */
        <div className="p-3 space-y-2.5 sm:hidden">
          {displayedRows.map((row) => (
            <div
              key={row.year}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2.5"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  {t.yearRowPrefix} {row.year}
                </span>
                <div className="text-right rtl:text-left">
                  <span className="text-[10px] uppercase text-slate-400 block">{t.colEndingBalance}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {formatCurrency(row.endingBalance, false, currency, lang)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] font-sans text-slate-500 dark:text-slate-400 block mb-0.5">
                    {t.colStartingBalance}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">
                    {formatCurrency(row.startingBalance, false, currency, lang)}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] font-sans text-slate-500 dark:text-slate-400 block mb-0.5">
                    {t.colAnnualDeposit}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">
                    {formatCurrency(row.annualContributions, false, currency, lang)}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[10px] font-sans text-emerald-800 dark:text-emerald-300 block mb-0.5">
                    {t.colInterestEarned}
                  </span>
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold">
                    +{formatCurrency(row.interestEarned, false, currency, lang)}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] font-sans text-slate-500 dark:text-slate-400 block mb-0.5">
                    {t.colTotalInterest}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">
                    {formatCurrency(row.totalInterest, false, currency, lang)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expand / Collapse Button if data > INITIAL_ROWS */}
      {data.length > INITIAL_ROWS && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            id="toggle-table-expansion-btn"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>
              {isExpanded
                ? `${t.showLess} (${INITIAL_ROWS} ${t.moreRowsSuffix})`
                : `${t.viewAll} (${data.length} ${t.moreRowsSuffix})`}
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};
