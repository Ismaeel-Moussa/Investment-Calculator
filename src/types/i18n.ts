export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';
export type ThemeMode = 'dark' | 'light';

export type CurrencyCode = 'USD' | 'SAR' | 'AED' | 'KWD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbolEn: string;
  symbolAr: string;
  nameEn: string;
  nameAr: string;
  flag: string;
}

export interface Translations {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  proBadge: string;
  installApp: string;
  resetButton: string;
  switchLanguage: string;
  selectCurrency: string;
  themeToggle: string;
  themeLight: string;
  themeDark: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  growthMultiplier: string;

  // Strategy Tabs
  calculationStrategy: string;
  recurringMode: string;
  lumpSumMode: string;

  // Recurring Inputs
  monthlyDeposit: string;
  monthlyDepositTooltip: string;
  initialStartingPrincipal: string;
  initialPrincipalTooltip: string;
  expectedAnnualReturn: string;
  expectedReturnTooltip: string;
  investmentPeriod: string;
  investmentPeriodTooltip: string;
  yearsSuffix: string;

  // Lump Sum Inputs
  lumpPrincipal: string;
  lumpPrincipalTooltip: string;
  compoundingFrequency: string;
  frequencies: {
    annually: string;
    quarterly: string;
    monthly: string;
    daily: string;
  };

  // Presets & Formula
  benchmarksTitle: string;
  presetCash: string;
  presetCashDesc: string;
  presetBalanced: string;
  presetBalancedDesc: string;
  presetSP500: string;
  presetSP500Desc: string;
  presetGrowth: string;
  presetGrowthDesc: string;
  formulaTitle: string;

  // Summary Cards
  totalInvested: string;
  totalInvestedSub: string;
  interestEarned: string;
  totalReturnSub: string;
  finalPortfolioValue: string;
  multiplierBadge: string;
  principalInvestedRatio: string;
  interestGainsRatio: string;

  // Growth Chart
  chartTitle: string;
  chartSubtitle: string;
  chartArea: string;
  chartBar: string;
  chartYearPrefix: string;
  chartInvestedLegend: string;
  chartInterestLegend: string;
  chartEndingBalance: string;

  // Breakdown Table
  tableTitle: string;
  tableSubtitle: string;
  exportCSV: string;
  colYear: string;
  colStartingBalance: string;
  colAnnualDeposit: string;
  colInterestEarned: string;
  colTotalInterest: string;
  colEndingBalance: string;
  yearRowPrefix: string;
  showLess: string;
  viewAll: string;
  moreRowsSuffix: string;

  // Footer & PWA
  footerTitle: string;
  footerDevelopedBy: string;
  developerName: string;
  footerRights: string;
  contactLinkedIn: string;
  contactEmail: string;
  pwaTitle: string;
  pwaDescriptionIos: string;
  pwaDescriptionOther: string;
  pwaInstallNow: string;
  pwaMaybeLater: string;
}

