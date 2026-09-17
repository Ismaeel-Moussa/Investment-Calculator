import { YearlyBreakdownItem } from '../types/calculator';
import { CurrencyCode, Language } from '../types/i18n';
import { getCurrencySymbol } from './i18n';

/**
 * Format standard currency e.g. $1,234,567 or 1,234,567 ر.س
 */
export function formatCurrency(
  amount: number,
  showDecimals: boolean = false,
  currency: CurrencyCode = 'USD',
  lang: Language = 'en'
): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    const sym = getCurrencySymbol(currency, lang);
    return lang === 'ar' ? `0 ${sym}` : `${sym}0`;
  }

  const formattedNum = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);

  const sym = getCurrencySymbol(currency, lang);

  if (currency === 'USD') {
    return `$${formattedNum}`;
  }
  if (currency === 'EUR') {
    return lang === 'ar' ? `${formattedNum} €` : `€${formattedNum}`;
  }

  // SAR, AED, KWD
  return lang === 'ar' ? `${formattedNum} ${sym}` : `${sym} ${formattedNum}`;
}

/**
 * Format compact currency e.g. $1.2M, $450K, 1.2M ر.س
 */
export function formatCompactCurrency(
  amount: number,
  currency: CurrencyCode = 'USD',
  lang: Language = 'en'
): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return formatCurrency(0, false, currency, lang);
  }

  const sym = getCurrencySymbol(currency, lang);
  const absVal = Math.abs(amount);

  let numStr = '';
  let unit = '';

  if (absVal >= 1_000_000_000) {
    numStr = (amount / 1_000_000_000).toFixed(2);
    unit = lang === 'ar' ? 'مليار' : 'B';
  } else if (absVal >= 1_000_000) {
    numStr = (amount / 1_000_000).toFixed(2);
    unit = lang === 'ar' ? 'مليون' : 'M';
  } else if (absVal >= 10_000) {
    numStr = (amount / 1_000).toFixed(1);
    unit = lang === 'ar' ? 'ألف' : 'K';
  } else {
    return formatCurrency(amount, false, currency, lang);
  }

  if (lang === 'ar') {
    return `${numStr} ${unit} ${sym}`;
  }

  if (currency === 'USD') {
    return `$${numStr}${unit}`;
  }
  if (currency === 'EUR') {
    return `€${numStr}${unit}`;
  }
  return `${sym} ${numStr}${unit}`;
}

/**
 * Format percentage e.g. 8.5%
 */
export function formatPercent(rate: number, decimals: number = 1, lang: Language = 'en'): string {
  if (isNaN(rate) || rate === null || rate === undefined) return '0%';
  return lang === 'ar' ? `%${rate.toFixed(decimals)}` : `${rate.toFixed(decimals)}%`;
}

/**
 * Export yearly breakdown data to CSV file and trigger browser download
 */
export function exportToCSV(
  data: YearlyBreakdownItem[],
  filename: string = 'investment-breakdown.csv',
  currency: CurrencyCode = 'USD',
  lang: Language = 'en'
): void {
  const sym = getCurrencySymbol(currency, lang);
  const headers =
    lang === 'ar'
      ? [
          'السنة',
          `رصيد البداية (${sym})`,
          `الإيداع السنوي (${sym})`,
          `أرباح الفائدة (${sym})`,
          `تراكم الأرباح (${sym})`,
          `رصيد النهاية (${sym})`,
        ]
      : [
          'Year',
          `Starting Balance (${sym})`,
          `Annual Contributions (${sym})`,
          `Interest Earned (${sym})`,
          `Total Interest to Date (${sym})`,
          `Ending Balance (${sym})`,
        ];

  const rows = data.map((item) => [
    item.year,
    item.startingBalance.toFixed(2),
    item.annualContributions.toFixed(2),
    item.interestEarned.toFixed(2),
    item.totalInterest.toFixed(2),
    item.endingBalance.toFixed(2),
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  // Add UTF-8 BOM so Excel opens Arabic properly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
