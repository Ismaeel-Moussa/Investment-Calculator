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
  heroGuideBtn: string;
  growthMultiplier: string;


  // Strategy Tabs
  calculationStrategy: string;
  recurringMode: string;
  lumpSumMode: string;
  goalMode: string;

  // Goal Mode Inputs & Display
  goalBadge: string;
  targetGoalAmount: string;
  targetGoalTooltip: string;
  requiredMonthlyDeposit: string;
  requiredMonthlyDepositDesc: string;
  goalAlreadyReached: string;
  goalPlanSummary: string;
  perMonth: string;


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

  // Summary Cards & Inflation
  totalInvested: string;
  totalInvestedSub: string;
  interestEarned: string;
  totalReturnSub: string;
  finalPortfolioValue: string;
  multiplierBadge: string;
  principalInvestedRatio: string;
  interestGainsRatio: string;
  inflationToggle: string;
  inflationTooltip: string;
  inflationAdjustedBadge: string;
  todayPurchasingPower: string;

  // Comparison: Investing vs Cash
  vsCashTitle: string;
  vsCashSubtitle: string;
  cashSavings: string;
  cashSavingsDesc: string;
  compoundInvesting: string;
  compoundInvestingDesc: string;
  freeMoneyGained: string;
  cashComparisonInsight: string;

  // Rule of 72 & Notes
  ruleOf72Title: string;
  ruleOf72Prefix: string;
  ruleOf72Suffix: string;
  shariaNote: string;

  // Beginner's Guide Roadmap
  beginnerGuideTitle: string;
  beginnerGuideSubtitle: string;
  guideShow: string;
  guideHide: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;


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
  colRealBalance: string;
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


