import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sun, Moon, Calculator, GraduationCap } from 'lucide-react';
import { CurrencyCode, Language, ThemeMode, Translations } from '../types/i18n';
import { CURRENCIES } from '../utils/i18n';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  currency: CurrencyCode;
  onSelectCurrency: (c: CurrencyCode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeView: 'calculator' | 'guide';
  onSelectView: (view: 'calculator' | 'guide') => void;
  t: Translations;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  currency,
  onSelectCurrency,
  theme,
  onToggleTheme,
  activeView,
  onSelectView,
  t,
}) => {

  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(event.target as Node)) {
        setCurrencyMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCurrencyConfig = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <button
          type="button"
          onClick={() => onSelectView('calculator')}
          className="flex items-center gap-3 text-left rtl:text-right group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-glow-emerald border border-emerald-500/30 flex items-center justify-center bg-slate-100 dark:bg-slate-900 group-hover:scale-105 transition-transform">
            <img
              src="/icon-192.png"
              alt="Compound Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white font-['Cairo',sans-serif] block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.appTitle}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden lg:block">
              {t.appSubtitle}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Tabs (Center) */}
        <nav
          aria-label="Main Navigation"
          className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-xs"
        >
          <button
            type="button"
            id="nav-tab-calc"
            onClick={() => onSelectView('calculator')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'calculator'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.navCalculator}</span>
          </button>

          <button
            type="button"
            id="nav-tab-guide"
            onClick={() => onSelectView('guide')}
            className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'guide'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.navGuide}</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all"
            title={theme === 'dark' ? t.themeLight : t.themeDark}
            aria-label={t.themeToggle}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-200 hover:-rotate-12" />
            )}
          </button>

          {/* Currency Selector Dropdown */}
          <div className="relative" ref={currencyMenuRef}>
            <button
              type="button"
              id="currency-selector-btn"
              onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all"
              title={t.selectCurrency}
            >
              <span className="text-sm leading-none">{activeCurrencyConfig.flag}</span>
              <span className="font-semibold">{activeCurrencyConfig.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currencyMenuOpen && (
              <div
                className={`absolute mt-2 w-44 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl py-1.5 z-50 ${
                  lang === 'ar' ? 'left-0' : 'right-0'
                }`}
              >
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                  {t.selectCurrency}
                </div>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => {
                  const item = CURRENCIES[cCode];
                  const isSelected = item.code === currency;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        onSelectCurrency(item.code);
                        setCurrencyMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${
                        isSelected
                          ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.flag}</span>
                        <span>{lang === 'ar' ? item.nameAr : item.nameEn}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            id="language-switcher-btn"
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-300/60 dark:border-emerald-500/30 shadow-sm transition-all"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.switchLanguage}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="sm:hidden px-4 pb-2.5 pt-1 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50">
        <button
          type="button"
          id="mobile-nav-tab-calc"
          onClick={() => onSelectView('calculator')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'calculator'
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{t.navCalculator}</span>
        </button>

        <button
          type="button"
          id="mobile-nav-tab-guide"
          onClick={() => onSelectView('guide')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeView === 'guide'
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{t.navGuide}</span>
        </button>
      </div>
    </header>

  );
};
