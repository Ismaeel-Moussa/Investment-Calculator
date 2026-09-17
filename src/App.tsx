import React, { useState, useMemo, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Layers, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CalculatorTabs } from './components/CalculatorTabs';
import { InputGroup } from './components/InputGroup';
import { SummaryCard } from './components/SummaryCard';
import { YearlyBreakdownTable } from './components/YearlyBreakdownTable';
import { QuickPresets } from './components/QuickPresets';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
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
  CompoundingFrequency,
} from './types/calculator';
import { CurrencyCode, Language, ThemeMode } from './types/i18n';
import { calculateRecurringInvestment, calculateLumpSum } from './utils/finance';
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
  compoundingFrequency: 'monthly',
};

export const App: React.FC = () => {
  // Localization & Currency State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('investment_calc_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('investment_calc_currency');
    return saved === 'USD' || saved === 'SAR' || saved === 'AED' || saved === 'KWD' || saved === 'EUR'
      ? (saved as CurrencyCode)
      : 'USD';
  });

  // Theme State (Dark / Light)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('investment_calc_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [mode, setMode] = useState<CalculationMode>('recurring');
  const [recurringInputs, setRecurringInputs] = useState<RecurringInputs>(DEFAULT_RECURRING);
  const [lumpSumInputs, setLumpSumInputs] = useState<LumpSumInputs>(DEFAULT_LUMP_SUM);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Synchronize document direction, language, PWA manifest, and titles
  useEffect(() => {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    localStorage.setItem('investment_calc_lang', lang);

    // Update document title
    document.title = isAr
      ? 'حاسبة الاستثمار - محاكي الأرباح المركبة'
      : 'Investment Calculator - Compound Interest Simulator';

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

  // Synchronize document theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('investment_calc_theme', theme);
  }, [theme]);

  // Save currency changes
  useEffect(() => {
    localStorage.setItem('investment_calc_currency', currency);
  }, [currency]);

  // Capture PWA install event for Navbar install button
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

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
    if (mode === 'recurring') {
      return calculateRecurringInvestment(recurringInputs);
    } else {
      return calculateLumpSum(lumpSumInputs);
    }
  }, [mode, recurringInputs, lumpSumInputs]);

  // Handle return rate benchmark preset click
  const handleRatePreset = (rate: number) => {
    if (mode === 'recurring') {
      setRecurringInputs((prev) => ({ ...prev, annualReturn: rate }));
    } else {
      setLumpSumInputs((prev) => ({ ...prev, annualReturn: rate }));
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
        canInstallPWA={!!deferredPrompt}
        onInstallPWA={handleInstallClick}
      />

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-b from-emerald-500/10 via-slate-50 to-slate-50 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
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
                {mode === 'recurring' ? (
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
                ) : (
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

                    {/* Compounding Frequency Toggle */}
                    <div className="space-y-2 bg-slate-100/70 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span>{t.compoundingFrequency}</span>
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {(['annually', 'quarterly', 'monthly'] as CompoundingFrequency[]).map(
                          (freq) => (
                            <button
                              key={freq}
                              type="button"
                              onClick={() =>
                                setLumpSumInputs((prev) => ({
                                  ...prev,
                                  compoundingFrequency: freq,
                                }))
                              }
                              className={`py-2 px-2 rounded-lg text-xs font-medium capitalize transition-all ${
                                lumpSumInputs.compoundingFrequency === freq
                                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950/20'
                                  : 'bg-white dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              {t.frequencies[freq]}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Benchmark Presets */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60">
                <QuickPresets
                  currentRate={
                    mode === 'recurring'
                      ? recurringInputs.annualReturn
                      : lumpSumInputs.annualReturn
                  }
                  onSelectRate={handleRatePreset}
                  t={t}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics, Growth Chart, and Table (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Metric Cards */}
            <SummaryCard
              result={calculationResult}
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
      </main>

      {/* Footer */}
      <Footer t={t} />

      {/* Mobile PWA Install Banner */}
      <PWAInstallPrompt t={t} />

      {/* Vercel Web Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
