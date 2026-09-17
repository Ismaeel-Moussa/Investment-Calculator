import React, { useState, useRef, useEffect } from 'react';
import { Download, Globe, ChevronDown, Check, Sun, Moon } from 'lucide-react';
import { CurrencyCode, Language, ThemeMode, Translations } from '../types/i18n';
import { CURRENCIES } from '../utils/i18n';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  currency: CurrencyCode;
  onSelectCurrency: (c: CurrencyCode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  t: Translations;
  canInstallPWA: boolean;
  onInstallPWA: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  currency,
  onSelectCurrency,
  theme,
  onToggleTheme,
  t,
  canInstallPWA,
  onInstallPWA,
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
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-glow-emerald border border-emerald-500/30 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
            <img
              src="/icon-192.png"
              alt="Compound Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white font-['Cairo',sans-serif] block">
              {t.appTitle}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

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

          {/* PWA Install Button */}
          {canInstallPWA && (
            <button
              onClick={onInstallPWA}
              id="install-pwa-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-glow-emerald transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.installApp}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
