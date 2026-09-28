import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  Flame,
  ArrowRight,
  ArrowLeft,
  Play,
  ExternalLink,
  GraduationCap,
  PieChart,
  Repeat,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Unlock,
} from 'lucide-react';
import { Language, Translations } from '../types/i18n';

interface EducationalGuidePageProps {
  t: Translations;
  lang: Language;
  onNavigateToCalculator: () => void;
}

export const EducationalGuidePage: React.FC<EducationalGuidePageProps> = ({
  t,
  lang,
  onNavigateToCalculator,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/60 bg-gradient-to-b from-emerald-500/10 via-slate-50 to-slate-50 dark:from-emerald-950/25 dark:via-slate-950 dark:to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-56 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center sm:text-start">
          {/* Top navigation helper & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              type="button"
              onClick={onNavigateToCalculator}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.guideBackToCalc}</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.guideHeroBadge}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight font-['Cairo',sans-serif]">
            {t.guideHeroTitle}
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {t.guideHeroSubtitle}
          </p>



          {/* Jump to Sections Nav Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              {t.tableOfContents}
            </span>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection('mindset-shift')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800/60"
              >
                1. {t.tocWhatIsInvesting}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('financial-freedom')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800/60"
              >
                2. {t.tocFinancialFreedom}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('video-masterclass')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800/60"
              >
                3. {t.tocVideoMasterclass}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('safe-strategy')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800/60"
              >
                4. {t.tocSafeStrategy}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('three-golden-steps')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200/60 dark:border-slate-800/60"
              >
                5. {t.tocThreeSteps}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* ========================================================= */}
        {/* SECTION 1: WHAT IS INVESTING (MINDSET SHIFT) */}
        {/* ========================================================= */}
        <section id="mindset-shift" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
                {t.whatIsInvestingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.whatIsInvestingSubtitle}
              </p>
            </div>
          </div>

          {/* Interactive Mindset Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card A: Traditional Labor */}
            <div className="glass-panel p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-rose-400/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                  {t.traditionalWorkBadge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.traditionalWorkTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.traditionalWorkDesc}
              </p>
            </div>

            {/* Card B: Smart Investing */}
            <div className="glass-panel p-6 rounded-2xl border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-950/15 space-y-4 shadow-sm hover:shadow-glow-emerald transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {t.smartInvestingBadge}
                </span>
              </div>
              <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                {t.smartInvestingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.smartInvestingDesc}
              </p>
            </div>
          </div>

          {/* Inspirational Quote Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/25 flex items-start gap-4">
            <span className="text-3xl text-emerald-600 dark:text-emerald-400 font-serif leading-none select-none">
              “
            </span>
            <div>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white italic leading-relaxed">
                {t.mindsetQuote}
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                — {t.mindsetQuoteAuthor}
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: FINANCIAL FREEDOM & WHY CASH FAILS */}
        {/* ========================================================= */}
        <section id="financial-freedom" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
                {t.financialFreedomTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.financialFreedomSubtitle}
              </p>
            </div>
          </div>

          {/* Dedicated Definition Card for Financial Freedom */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-teal-500/[0.04] space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                <Unlock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.financialFreedomDefBadge}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-['Cairo',sans-serif]">
                {t.financialFreedomDefTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {t.financialFreedomDefText}
              </p>
            </div>

            {/* The Universal Equation */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border-2 border-emerald-500/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-2.5">
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 font-['Cairo',sans-serif]">
                  ⚡ {t.financialFreedomFormulaLabel}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {isAr ? 'قاعدة الاستقلال المالي' : 'Independence Benchmark'}
                </span>
              </div>

              {/* Equation Visualizer */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-1 text-center">
                {/* Side A: Investment Returns */}
                <div className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 font-black text-sm sm:text-base font-['Cairo',sans-serif] shadow-xs">
                  {isAr ? 'عوائد وأرباح استثماراتك السنوية' : 'Annual Investment Returns'}
                </div>

                {/* Mathematical Operator */}
                <div className="w-9 h-9 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white font-black text-lg flex items-center justify-center shadow-md shadow-emerald-600/30 shrink-0">
                  ≥
                </div>

                {/* Side B: Living Costs */}
                <div className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 font-black text-sm sm:text-base font-['Cairo',sans-serif] shadow-xs">
                  {isAr ? 'كامل نفقات ومصاريف معيشتك السنوية' : 'Total Annual Living Expenses'}
                </div>
              </div>
            </div>

            {/* The 3 Real Pillars of Freedom */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.financialFreedomPillar1Title}
                  </h4>
                </div>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.financialFreedomPillar1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.financialFreedomPillar2Title}
                  </h4>
                </div>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.financialFreedomPillar2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.financialFreedomPillar3Title}
                  </h4>
                </div>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.financialFreedomPillar3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Key Question & Direct Reality Check */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border-amber-500/30 bg-amber-500/[0.04] dark:bg-amber-950/15 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{t.canWeReachWithoutInvestingQuestion}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.canWeReachWithoutInvestingAnswer}
            </p>
          </div>

          {/* 3 Main Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Reason 1: Inflation */}
            <div className="glass-panel p-5 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.inflationErosionTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.inflationErosionDesc}
              </p>
            </div>

            {/* Reason 2: Finite Life & Energy */}
            <div className="glass-panel p-5 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.finiteLifeEnergyTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.finiteLifeEnergyDesc}
              </p>
            </div>

            {/* Reason 3: Compound Bridge */}
            <div className="glass-panel p-5 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.compoundBridgeTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.compoundBridgeDesc}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: VIDEO MASTERCLASS (EMBEDDED YOUTUBE) */}
        {/* ========================================================= */}
        <section id="video-masterclass" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                <Play className="w-3 h-3 fill-current" />
                <span>{t.videoBadge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
                {t.videoSectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.videoSectionSubtitle}
              </p>
            </div>
          </div>

          {/* YouTube Video Player Wrapper */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-900/5">
            <div className="relative aspect-video w-full bg-slate-900">
              <iframe
                id="featured-investment-video"
                title="كيفية البدء في الاستثمار للمبتدئين بالحلال - علي الحامد"
                src="https://www.youtube.com/embed/sWiD6hy7tQg?rel=0"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Video Meta & YouTube Action Bar */}
            <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  كيفية البدء في الاستثمار للمبتدئين بالحلال (دليل شامل)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.videoPresenter}
                </p>
              </div>

              <a
                href="https://youtu.be/sWiD6hy7tQg?si=bg52y4QI4EBE8zUl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shrink-0"
              >
                <span>{t.videoWatchOnYoutube}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Video Key Takeaways Grid */}
          <div className="glass-panel p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.videoKeyTakeawaysTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.videoTakeaway1Title}
                </span>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.videoTakeaway1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                  {t.videoTakeaway2Title}
                </span>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.videoTakeaway2Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.videoTakeaway3Title}
                </span>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.videoTakeaway3Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.videoTakeaway4Title}
                </span>
                <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.videoTakeaway4Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: WHERE & HOW TO INVEST FOR BEGINNERS */}
        {/* ========================================================= */}
        <section id="safe-strategy" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
                {t.safeStrategyTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.safeStrategySubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Index Funds ETFs */}
            <div className="glass-panel p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-3 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <PieChart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {t.etfCardBadge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.etfCardTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.etfCardDesc}
              </p>
            </div>

            {/* Card 2: DCA Monthly */}
            <div className="glass-panel p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-3 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Repeat className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                  {t.dcaCardBadge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.dcaCardTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.dcaCardDesc}
              </p>
            </div>

            {/* Card 3: Avoiding Traps */}
            <div className="glass-panel p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 space-y-3 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  {t.trapsCardBadge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.trapsCardTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.trapsCardDesc}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: THE 3 GOLDEN PRE-INVESTMENT STEPS */}
        {/* ========================================================= */}
        <section id="three-golden-steps" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              5
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Cairo',sans-serif]">
                {t.threeStepsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {t.threeStepsSubtitle}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 font-black">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {t.threeStep1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.threeStep1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0 font-black">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {t.threeStep2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.threeStep2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 font-black">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-300">
                  {t.threeStep3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.threeStep3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: INTERACTIVE CALL TO ACTION BANNER */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-2xl shadow-emerald-700/25">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.guideHeroBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-['Cairo',sans-serif] leading-tight">
              {t.guideCtaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
              {t.guideCtaSubtitle}
            </p>
            <div className="pt-2">
              <button
                type="button"
                id="guide-cta-calc-btn"
                onClick={onNavigateToCalculator}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base bg-white text-emerald-800 hover:bg-emerald-50 shadow-xl shadow-black/10 active:scale-95 transition-all group"
              >
                <span>{t.guideCtaBtn}</span>
                <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
