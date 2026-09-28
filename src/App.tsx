import React, { useState, useMemo, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Layers, Sparkles, Target, Compass, ArrowDown } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CalculatorTabs } from './components/CalculatorTabs';
import { InputGroup } from './components/InputGroup';
import { SummaryCard } from './components/SummaryCard';
import { YearlyBreakdownTable } from './components/YearlyBreakdownTable';
import { QuickPresets } from './components/QuickPresets';
import { GoalHighlightBanner } from './components/GoalHighlightBanner';
import { InvestingVsCashCard } from './components/InvestingVsCashCard';
import { RuleOf72Card } from './components/RuleOf72Card';
import { BeginnerGuide } from './components/BeginnerGuide';
import { Footer } from './components/Footer';

const GrowthChart = React.lazy(() =>
  import('./components/GrowthChart').then((m) => ({ default: m.GrowthChart }))
);

const GrowthChartSkeleton: React.FC = () => (
  <div className="glass-panel p-5 rounded-2xl animate-pulse">
    <div className="flex justify-between items-center mb-6">
      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
    </div>
    <div className="w-full h-72 sm:h-80 bg-slate-100/60 dark:bg-slate-900/40 rounded-xl" />
  </div>
);
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import {
  CalculationMode,
  RecurringInputs,
  LumpSumInputs,
  GoalInputs,
} from './types/calculator';
import { CurrencyCode, Language, ThemeMode } from './types/i18n';
import { calculateRecurringInvestment, calculateLumpSum, calculateGoalInvestment } from './utils/finance';
import { TRANSLATIONS } from './utils/i18n';

const DEFAULT_RECURRING: RecurringInputs = {
  monthlyDeposit: 0,
  initialDeposit: 0,
  annualReturn: 10.0,
  years: 20,
};

const DEFAULT_LUMP_SUM: LumpSumInputs = {
  initialPrincipal: 0,
  annualReturn: 10.0,
  years: 20,
  compoundingFrequency: 'annually',
};

const DEFAULT_GOAL: GoalInputs = {
  targetAmount: 0,
  initialDeposit: 0,
  annualReturn: 10.0,
  years: 15,
};

export const App: React.FC = () => {
  // Localization & Currency State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('investment_calc_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'ar';
  });

  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('investment_calc_currency');
    return saved === 'USD' || saved === 'SAR' || saved === 'AED' || saved === 'KWD' || saved === 'EUR'
      ? (saved as CurrencyCode)
      : 'USD';
  });

  // Theme State (Dark / Light) - Defaults to light mode
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('investment_calc_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [mode, setMode] = useState<CalculationMode>('recurring');
  const [recurringInputs, setRecurringInputs] = useState<RecurringInputs>(DEFAULT_RECURRING);
  const [lumpSumInputs, setLumpSumInputs] = useState<LumpSumInputs>(DEFAULT_LUMP_SUM);
  const [goalInputs, setGoalInputs] = useState<GoalInputs>(DEFAULT_GOAL);
  const [adjustForInflation, setAdjustForInflation] = useState<boolean>(false);
  const inflationRate = 3.0; // 3% standard inflation benchmark



  // Synchronize document direction, language, meta tags, and PWA manifest
  useEffect(() => {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    localStorage.setItem('investment_calc_lang', lang);

    const pageTitle = isAr
      ? 'حاسبة الاستثمار - محاكي الأرباح المركبة ونمو الثروة'
      : 'Investment Calculator - Compound Interest & Wealth Simulator';
    const pageDescription = isAr
      ? 'احسب العائد على استثماراتك ونمو ثروتك عبر الفائدة المركبة. خطط لأهدافك المالية بمحاكاة تفاعلية، رسوم بيانية دقيقة، وجداول نمو سنوية مفصلة.'
      : 'Calculate the future value of your wealth with compound interest. Live projections, interactive charts, and year-by-year schedules for monthly recurring and lump-sum investments.';

    // Update document title
    document.title = pageTitle;

    // Update meta description
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', pageDescription);

    // Update Open Graph tags
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDescription);

    // Update Twitter tags
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    const twitterDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', pageDescription);

    // Synchronize PWA manifest href
    const manifestEl = document.getElementById('app-manifest') || document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (manifestEl) {
      manifestEl.setAttribute('href', isAr ? '/manifest-ar.webmanifest' : '/manifest.webmanifest');
    }

    // Synchronize iOS home screen title
    const appleTitleEl = document.getElementById('apple-app-title') || document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-title"]');
    if (appleTitleEl) {
      appleTitleEl.setAttribute('content', isAr ? 'حاسبة الاستثمار' : 'Investment Calculator');
    }
  }, [lang]);

  // Synchronize document theme class and mobile theme-color meta tag
  useEffect(() => {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('investment_calc_theme', theme);

    const themeColorMeta = document.getElementById('meta-theme-color') || document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#080c14' : '#f8fafc');
    }
  }, [theme]);

  // Save currency changes
  useEffect(() => {
    localStorage.setItem('investment_calc_currency', currency);
  }, [currency]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = TRANSLATIONS[lang];

  // Helper to determine input prefix and suffix based on currency & language
  const { currPrefix, currSuffix } = useMemo(() => {
    if (currency === 'USD') {
      return { currPrefix: '$', currSuffix: undefined };
    }
    if (currency === 'EUR') {
      return lang === 'ar'
        ? { currPrefix: undefined, currSuffix: '€' }
        : { currPrefix: '€', currSuffix: undefined };
    }
    if (currency === 'SAR') {
      return lang === 'ar'
        ? { currPrefix: undefined, currSuffix: 'ر.س' }
        : { currPrefix: 'SAR ', currSuffix: undefined };
    }
    if (currency === 'AED') {
      return lang === 'ar'
        ? { currPrefix: undefined, currSuffix: 'د.إ' }
        : { currPrefix: 'AED ', currSuffix: undefined };
    }
    // KWD
    return lang === 'ar'
      ? { currPrefix: undefined, currSuffix: 'د.ك' }
      : { currPrefix: 'KWD ', currSuffix: undefined };
  }, [currency, lang]);

  // Real-time calculation memoized
  const calculationResult = useMemo(() => {
    const currentInflation = adjustForInflation ? inflationRate : 0;
    if (mode === 'recurring') {
      return calculateRecurringInvestment(recurringInputs, currentInflation);
    } else if (mode === 'lumpsum') {
      return calculateLumpSum(lumpSumInputs, currentInflation);
    } else {
      return calculateGoalInvestment(goalInputs, currentInflation);
    }
  }, [mode, recurringInputs, lumpSumInputs, goalInputs, adjustForInflation]);

  // Current annual return rate across all modes
  const currentAnnualReturn =
    mode === 'recurring'
      ? recurringInputs.annualReturn
      : mode === 'lumpsum'
      ? lumpSumInputs.annualReturn
      : goalInputs.annualReturn;

  // Handle return rate benchmark preset click
  const handleRatePreset = (rate: number) => {
    if (mode === 'recurring') {
      setRecurringInputs((prev) => ({ ...prev, annualReturn: rate }));
    } else if (mode === 'lumpsum') {
      setLumpSumInputs((prev) => ({ ...prev, annualReturn: rate }));
    } else {
      setGoalInputs((prev) => ({ ...prev, annualReturn: rate }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white pb-16 transition-colors duration-200">
      {/* Top Header */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
        theme={theme}
        onToggleTheme={toggleTheme}
        t={t}
      />

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-b from-emerald-500/10 via-slate-50 to-slate-50 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.heroBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Cairo',sans-serif]">
                {t.heroTitle}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                {t.heroDescription}
              </p>
            </div>

            {/* Jump to Beginner Guide Button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('beginner-guide')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 shadow-xs hover:shadow transition-all group active:scale-95 touch-manipulation"
              >

                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
                <span>{t.heroGuideBtn}</span>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form Controls (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              {/* Tab Selector */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                  {t.calculationStrategy}
                </h2>
                <CalculatorTabs activeMode={mode} onChange={setMode} t={t} />
              </div>

              {/* Mode-Specific Input Fields */}
              <div className="space-y-4">
                {mode === 'recurring' && (
                  <div
                    id="panel-recurring"
                    role="tabpanel"
                    aria-labelledby="tab-recurring"
                    className="space-y-4"
                  >
                    {/* Monthly Deposit */}
                    <InputGroup
                      id="monthly-deposit"
                      label={t.monthlyDeposit}
                      value={recurringInputs.monthlyDeposit}
                      min={0}
                      step={50}
                      prefix={currPrefix}
                      suffix={currSuffix}
                      icon={DollarSign}
                      tooltip={t.monthlyDepositTooltip}
                      quickPresets={[50, 100, 200, 500]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setRecurringInputs((prev) => ({ ...prev, monthlyDeposit: val }))
                      }
                    />

                    {/* Initial Starting Balance */}
                    <InputGroup
                      id="initial-deposit"
                      label={t.initialStartingPrincipal}
                      value={recurringInputs.initialDeposit}
                      min={0}
                      step={500}
                      prefix={currPrefix}
                      suffix={currSuffix}
                      icon={Layers}
                      tooltip={t.initialPrincipalTooltip}
                      quickPresets={[0, 1000, 5000]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setRecurringInputs((prev) => ({ ...prev, initialDeposit: val }))
                      }
                    />

                    {/* Expected Annual Return */}
                    <InputGroup
                      id="annual-return"
                      label={t.expectedAnnualReturn}
                      value={recurringInputs.annualReturn}
                      min={0}
                      step={0.1}
                      suffix="%"
                      icon={Percent}
                      tooltip={t.expectedReturnTooltip}
                      quickPresets={[5, 8, 10, 12]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setRecurringInputs((prev) => ({ ...prev, annualReturn: val }))
                      }
                    />

                    {/* Investment Horizon */}
                    <InputGroup
                      id="investment-years"
                      label={t.investmentPeriod}
                      value={recurringInputs.years}
                      min={1}
                      max={100}
                      step={1}
                      suffix={t.yearsSuffix}
                      icon={Calendar}
                      tooltip={t.investmentPeriodTooltip}
                      quickPresets={[15, 20, 25, 30, 35]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setRecurringInputs((prev) => ({ ...prev, years: val }))
                      }
                    />
                  </div>
                )}

                {mode === 'lumpsum' && (
                  <div
                    id="panel-lumpsum"
                    role="tabpanel"
                    aria-labelledby="tab-lumpsum"
                    className="space-y-4"
                  >
                    {/* Initial Principal for Lump Sum */}
                    <InputGroup
                      id="lump-principal"
                      label={t.lumpPrincipal}
                      value={lumpSumInputs.initialPrincipal}
                      min={0}
                      step={500}
                      prefix={currPrefix}
                      suffix={currSuffix}
                      icon={DollarSign}
                      tooltip={t.lumpPrincipalTooltip}
                      quickPresets={[0, 1000, 5000]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setLumpSumInputs((prev) => ({ ...prev, initialPrincipal: val }))
                      }
                    />

                    {/* Expected Annual Return */}
                    <InputGroup
                      id="lump-annual-return"
                      label={t.expectedAnnualReturn}
                      value={lumpSumInputs.annualReturn}
                      min={0}
                      step={0.1}
                      suffix="%"
                      icon={Percent}
                      tooltip={t.expectedReturnTooltip}
                      quickPresets={[5, 8, 10, 12]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setLumpSumInputs((prev) => ({ ...prev, annualReturn: val }))
                      }
                    />

                    {/* Investment Horizon */}
                    <InputGroup
                      id="lump-years"
                      label={t.investmentPeriod}
                      value={lumpSumInputs.years}
                      min={1}
                      max={100}
                      step={1}
                      suffix={t.yearsSuffix}
                      icon={Calendar}
                      tooltip={t.investmentPeriodTooltip}
                      quickPresets={[15, 20, 25, 30, 35]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setLumpSumInputs((prev) => ({ ...prev, years: val }))
                      }
                    />
                  </div>
                )}

                {mode === 'goal' && (
                  <div
                    id="panel-goal"
                    role="tabpanel"
                    aria-labelledby="tab-goal"
                    className="space-y-4"
                  >
                    {/* Target Goal Amount */}
                    <InputGroup
                      id="goal-target"
                      label={t.targetGoalAmount}
                      value={goalInputs.targetAmount}
                      min={1000}
                      step={10000}
                      prefix={currPrefix}
                      suffix={currSuffix}
                      icon={Target}
                      tooltip={t.targetGoalTooltip}
                      quickPresets={[100000, 250000, 500000, 1000000]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setGoalInputs((prev) => ({ ...prev, targetAmount: val }))
                      }
                    />

                    {/* Initial Starting Balance */}
                    <InputGroup
                      id="goal-initial"
                      label={t.initialStartingPrincipal}
                      value={goalInputs.initialDeposit}
                      min={0}
                      step={1000}
                      prefix={currPrefix}
                      suffix={currSuffix}
                      icon={Layers}
                      tooltip={t.initialPrincipalTooltip}
                      quickPresets={[0, 5000, 10000, 50000]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setGoalInputs((prev) => ({ ...prev, initialDeposit: val }))
                      }
                    />

                    {/* Expected Annual Return */}
                    <InputGroup
                      id="goal-annual-return"
                      label={t.expectedAnnualReturn}
                      value={goalInputs.annualReturn}
                      min={0}
                      step={0.1}
                      suffix="%"
                      icon={Percent}
                      tooltip={t.expectedReturnTooltip}
                      quickPresets={[5, 8, 10, 12]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setGoalInputs((prev) => ({ ...prev, annualReturn: val }))
                      }
                    />

                    {/* Investment Horizon */}
                    <InputGroup
                      id="goal-years"
                      label={t.investmentPeriod}
                      value={goalInputs.years}
                      min={1}
                      max={100}
                      step={1}
                      suffix={t.yearsSuffix}
                      icon={Calendar}
                      tooltip={t.investmentPeriodTooltip}
                      quickPresets={[5, 10, 15, 20, 25]}
                      lang={lang}
                      theme={theme}
                      onChange={(val) =>
                        setGoalInputs((prev) => ({ ...prev, years: val }))
                      }
                    />
                  </div>
                )}
              </div>

              {/* Quick Benchmark Presets, Rule of 72, & Inflation Switch */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 space-y-4">
                <QuickPresets
                  currentRate={currentAnnualReturn}
                  onSelectRate={handleRatePreset}
                  t={t}
                />

                <RuleOf72Card
                  annualReturn={currentAnnualReturn}
                  t={t}
                />

                {/* Inflation Adjustment Switch */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <Percent className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                        {t.inflationToggle}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {t.inflationTooltip}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={adjustForInflation}
                    onClick={() => setAdjustForInflation(!adjustForInflation)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      adjustForInflation ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        adjustForInflation
                          ? lang === 'ar'
                            ? '-translate-x-5'
                            : 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics, Growth Chart, and Table (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Goal Mode Highlight Banner */}
            {mode === 'goal' && (
              <GoalHighlightBanner
                targetAmount={goalInputs.targetAmount}
                requiredMonthlyDeposit={calculationResult.requiredMonthlyDeposit ?? 0}
                years={goalInputs.years}
                currency={currency}
                lang={lang}
                t={t}
              />
            )}

            {/* Top Metric Cards */}
            <SummaryCard
              result={calculationResult}
              currency={currency}
              lang={lang}
              t={t}
            />

            {/* Investing vs Traditional Cash Savings Card */}
            <InvestingVsCashCard
              totalInvested={calculationResult.totalInvested}
              finalBalance={calculationResult.finalBalance}
              totalInterest={calculationResult.totalInterest}
              currency={currency}
              lang={lang}
              t={t}
            />

            {/* Interactive Growth Visual Chart */}
            <React.Suspense fallback={<GrowthChartSkeleton />}>
              <GrowthChart
                data={calculationResult.breakdown}
                currency={currency}
                lang={lang}
                theme={theme}
                t={t}
              />
            </React.Suspense>

            {/* Year-by-Year Breakdown Table */}
            <YearlyBreakdownTable
              data={calculationResult.breakdown}
              currency={currency}
              lang={lang}
              t={t}
            />
          </div>
        </div>

        {/* Beginner's Roadmap & Guide */}
        <div className="mt-10">
          <BeginnerGuide t={t} />
        </div>

      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Vercel Web Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
