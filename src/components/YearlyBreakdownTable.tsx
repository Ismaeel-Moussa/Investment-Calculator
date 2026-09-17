import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Table as TableIcon } from 'lucide-react';
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
  const INITIAL_ROWS = 10;
  const displayedRows = isExpanded ? data : data.slice(0, INITIAL_ROWS);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TableIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
              {t.tableTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.tableSubtitle}</p>
          </div>
        </div>

        {/* CSV Export Button */}
        <button
          type="button"
          onClick={() => exportToCSV(data, 'investment-breakdown.csv', currency, lang)}
          id="export-csv-btn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 transition-all self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{t.exportCSV}</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/60 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4 font-semibold">{t.colYear}</th>
              <th className="py-3 px-4 font-semibold text-right rtl:text-left">{t.colStartingBalance}</th>
              <th className="py-3 px-4 font-semibold text-right rtl:text-left">{t.colAnnualDeposit}</th>
              <th className="py-3 px-4 font-semibold text-right rtl:text-left text-emerald-600 dark:text-emerald-400">
                {t.colInterestEarned}
              </th>
              <th className="py-3 px-4 font-semibold text-right rtl:text-left">{t.colTotalInterest}</th>
              <th className="py-3 px-4 font-semibold text-right rtl:text-left text-slate-900 dark:text-white">{t.colEndingBalance}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/40 font-mono text-xs">
            {displayedRows.map((row) => (
              <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300 font-sans">
                  {t.yearRowPrefix} {row.year}
                </td>
                <td className="py-3 px-4 text-right rtl:text-left text-slate-600 dark:text-slate-400">
                  {formatCurrency(row.startingBalance, false, currency, lang)}
                </td>
                <td className="py-3 px-4 text-right rtl:text-left text-slate-700 dark:text-slate-300">
                  {formatCurrency(row.annualContributions, false, currency, lang)}
                </td>
                <td className="py-3 px-4 text-right rtl:text-left text-emerald-600 dark:text-emerald-400 font-semibold">
                  +{formatCurrency(row.interestEarned, false, currency, lang)}
                </td>
                <td className="py-3 px-4 text-right rtl:text-left text-slate-600 dark:text-slate-400">
                  {formatCurrency(row.totalInterest, false, currency, lang)}
                </td>
                <td className="py-3 px-4 text-right rtl:text-left text-slate-900 dark:text-white font-semibold">
                  {formatCurrency(row.endingBalance, false, currency, lang)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
