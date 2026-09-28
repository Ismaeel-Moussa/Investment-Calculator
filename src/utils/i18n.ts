import { CurrencyCode, CurrencyConfig, Language, Translations } from '../types/i18n';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbolEn: '$',
    symbolAr: '$',
    nameEn: 'US Dollar ($)',
    nameAr: 'دولار أمريكي ($)',
    flag: '🇺🇸',
  },
  SAR: {
    code: 'SAR',
    symbolEn: 'SAR',
    symbolAr: 'ر.س',
    nameEn: 'Saudi Riyal (SAR)',
    nameAr: 'ريال سعودي (ر.س)',
    flag: '🇸🇦',
  },
  AED: {
    code: 'AED',
    symbolEn: 'AED',
    symbolAr: 'د.إ',
    nameEn: 'UAE Dirham (AED)',
    nameAr: 'درهم إماراتي (د.إ)',
    flag: '🇦🇪',
  },
  KWD: {
    code: 'KWD',
    symbolEn: 'KWD',
    symbolAr: 'د.ك',
    nameEn: 'Kuwaiti Dinar (KWD)',
    nameAr: 'دينار كويتي (د.ك)',
    flag: '🇰🇼',
  },
  EUR: {
    code: 'EUR',
    symbolEn: '€',
    symbolAr: '€',
    nameEn: 'Euro (€)',
    nameAr: 'يورو (€)',
    flag: '🇪🇺',
  },
};

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appTitle: 'Investment Calculator',
    appSubtitle: 'Investment & Compound Interest Simulator',
    proBadge: '',
    installApp: 'Install App',
    resetButton: 'Reset',
    switchLanguage: 'العربية',
    selectCurrency: 'Currency',
    themeToggle: 'Toggle Theme',
    themeLight: 'Switch to Light Mode',
    themeDark: 'Switch to Dark Mode',

    heroBadge: 'The Power of Compound Growth',
    heroTitle: 'Investment & Compound Interest Calculator',
    heroDescription:
      'Model your financial independence. See how regular contributions and compound returns turn modest savings into significant wealth over time.',
    heroGuideBtn: 'Beginner’s Investment Guide',
    growthMultiplier: 'Growth Multiplier',


    calculationStrategy: 'Calculation Strategy',
    recurringMode: 'Monthly Recurring',
    lumpSumMode: 'Lump Sum',
    goalMode: 'Target Goal',

    // Goal Mode Inputs & Display
    goalBadge: 'Smart Goal Plan',
    targetGoalAmount: 'Target Goal',

    targetGoalTooltip: 'The total target amount you aim to achieve',
    requiredMonthlyDeposit: 'Required Monthly Deposit',
    requiredMonthlyDepositDesc: 'Amount you must invest each month to reach your target',
    goalAlreadyReached: 'Your starting balance will reach or exceed this goal through compound growth without any additional monthly contributions!',
    goalPlanSummary: 'To reach your goal of',
    perMonth: '/ month',

    monthlyDeposit: 'Monthly Deposit',
    monthlyDepositTooltip: 'Recurring monthly contribution',
    initialStartingPrincipal: 'Initial Principal',
    initialPrincipalTooltip: 'Amount you have right now to start with',
    expectedAnnualReturn: 'Annual Return',
    expectedReturnTooltip: 'Annual compound rate of return',
    investmentPeriod: 'Investment Period',
    investmentPeriodTooltip: 'Number of years invested',
    yearsSuffix: ' yrs',


    lumpPrincipal: 'Initial Principal',
    lumpPrincipalTooltip: 'One-time upfront investment',
    compoundingFrequency: 'Compounding Frequency',
    frequencies: {
      annually: 'Annually',
      quarterly: 'Quarterly',
      monthly: 'Monthly',
      daily: 'Daily',
    },

    benchmarksTitle: 'Expected Annual Return Benchmarks',
    presetCash: 'Cash & Murabaha',
    presetCashDesc: 'Low risk (Deposits & Sukuk)',
    presetBalanced: 'Balanced 60/40',
    presetBalancedDesc: 'Modest risk (Stocks & Bonds)',
    presetSP500: 'S&P 500 Index',
    presetSP500Desc: 'Top 500 US firms (Historical avg)',
    presetGrowth: 'Growth & Tech',
    presetGrowthDesc: 'High growth (Higher volatility)',
    formulaTitle: 'Mathematical Formula Used:',

    totalInvested: 'Total Invested',
    totalInvestedSub: 'Your direct out-of-pocket capital',
    interestEarned: 'Compound Gains',
    totalReturnSub: 'total return',
    finalPortfolioValue: 'Final Portfolio Value',
    multiplierBadge: 'Multiplier',
    principalInvestedRatio: 'Principal Invested',
    interestGainsRatio: 'Compound Gains',
    inflationToggle: 'Adjust for Inflation (3%)',
    inflationTooltip: 'Displays future wealth in terms of today’s real purchasing power',
    inflationAdjustedBadge: 'Real Purchasing Power',
    todayPurchasingPower: 'Today’s Purchasing Power',

    // Comparison: Investing vs Cash
    vsCashTitle: 'Smart Investing vs. Traditional Cash Savings',
    vsCashSubtitle: 'See the true cost of leaving your money idle in a checking account versus compounding it',
    cashSavings: 'Traditional Cash Savings',
    cashSavingsDesc: '0% return (value slowly erodes to inflation)',
    compoundInvesting: 'Smart Compound Growth',
    compoundInvestingDesc: 'Your money works for you continuously',
    freeMoneyGained: 'Extra Wealth Created by Compound Growth',
    cashComparisonInsight: 'By not investing, you miss out on earning this entire extra gain without working a single extra hour!',

    // Rule of 72 & Notes
    ruleOf72Title: 'Rule of 72 Insight',
    ruleOf72Prefix: 'At this return rate, your wealth will automatically double every',
    ruleOf72Suffix: 'years without needing to double your deposits!',
    shariaNote: '💡 Educational note: Calculations simulate long-term capital growth and distributions in investment funds (including Sharia-compliant ETFs/equities), not interest-bearing debt.',

    // Beginner's Guide Roadmap
    beginnerGuideTitle: 'Beginner’s Guide: How to Start Investing for Everyday People',
    beginnerGuideSubtitle: 'Simple, practical steps to build financial peace of mind without financial jargon',
    guideShow: 'View Guide',
    guideHide: 'Hide Guide',
    step1Title: '1. Build an Emergency Fund First',

    step1Desc: 'Before investing, set aside 3 to 6 months of basic living expenses in an easily accessible bank account for true emergencies.',
    step2Title: '2. Pay Off High-Cost Debts',
    step2Desc: 'Clear credit card debt and high-interest personal loans first, as their interest charges exceed typical investment gains.',
    step3Title: '3. Start Small & Invest Monthly (DCA)',
    step3Desc: 'Don’t wait for a huge lump sum. Investing a modest amount every month (Dollar-Cost Averaging) builds serious wealth over time.',
    step4Title: '4. Diversify with Low-Cost Index Funds (ETFs)',
    step4Desc: 'Avoid gambling on a single hot stock. Diversify through index funds and Sharia-compliant ETFs (like SPUS and SPWO) that spread your risk across hundreds of solid companies.',
    step5Title: '5. Stay Patient & Ignore Daily Market Noise',

    step5Desc: 'Investing is a 10–20 year marathon. Market ups and downs are normal; emotional discipline and consistency are the secrets to compounding.',

    chartTitle: 'Portfolio Growth Projection',
    chartSubtitle: 'Visualization of principal vs compound interest accumulation over time',
    chartArea: 'Area',
    chartBar: 'Bar',
    chartYearPrefix: 'Yr',
    chartInvestedLegend: 'Total Invested',
    chartInterestLegend: 'Compound Gains',
    chartEndingBalance: 'Ending Balance',

    tableTitle: 'Annual Breakdown Schedule',
    tableSubtitle: 'Year-by-year balance, contributions, and compound gains',
    exportCSV: 'Export CSV',
    colYear: 'Year',
    colStartingBalance: 'Starting Balance',
    colAnnualDeposit: 'Annual Deposit',
    colInterestEarned: 'Year Gains',
    colTotalInterest: 'Total Gains',
    colEndingBalance: 'Ending Balance',
    colRealBalance: 'Real Value (Adj.)',
    yearRowPrefix: 'Year',
    showLess: 'Show less',
    viewAll: 'View all',
    moreRowsSuffix: 'more',

    footerTitle: 'Investment Calculator • Compound Interest Simulator',
    footerDevelopedBy: 'Designed & Developed by',
    developerName: 'Ismaeel Moussa',
    footerRights: 'All rights reserved.',
    contactLinkedIn: 'LinkedIn',
    contactEmail: 'Email',
    pwaTitle: 'Install Investment Calculator',
    pwaDescriptionIos: 'Tap "Share" and select "Add to Home Screen" for instant offline access.',
    pwaDescriptionOther: 'Add to your mobile home screen for fast full-screen simulation & offline access.',
    pwaInstallNow: 'Install Now',
    pwaMaybeLater: 'Maybe later',

    // Navigation
    navCalculator: 'Calculator',
    navGuide: 'Investment Guide',
    navGuideBadge: '',

    // Educational Guide Page
    guideHeroBadge: 'Beginner’s Financial Freedom Guide',
    guideHeroTitle: 'From Zero to Wealth: How Smart Investing Creates True Freedom',
    guideHeroSubtitle:
      'A plain-language, jargon-free guide designed for real people who want to beat inflation, build passive income, and make money work for them.',
    guideBackToCalc: 'Back to Calculator',
    guideTryCalc: 'Simulate Your Numbers',
    tableOfContents: 'Jump to Topic',

    // Guide Section 1: Mindset
    tocWhatIsInvesting: 'What is Investing?',
    whatIsInvestingTitle: 'What is Investing Really? (The Mindset Shift)',
    whatIsInvestingSubtitle:
      'Understanding the crucial difference between working for money and making money work for you',
    traditionalWorkTitle: 'Traditional Labor (Trading Time for Money)',
    traditionalWorkBadge: 'Limited Ceiling',
    traditionalWorkDesc:
      'You sell your finite hours for a paycheck. If you take time off, fall sick, or retire, the income stops immediately. You carry 100% of the burden alone.',
    smartInvestingTitle: 'Smart Investing (Owning Productive Assets)',
    smartInvestingBadge: 'Exponential Growth',
    smartInvestingDesc:
      'You buy shares in profitable, innovative companies. Thousands of employees and executives work every day, and a portion of their profits flows directly to you—even while you sleep.',
    mindsetQuote: '“If you don’t find a way to make money while you sleep, you will work until you die.”',
    mindsetQuoteAuthor: 'Warren Buffett (Legendary Investor)',

    // Guide Section 2: Financial Freedom & Inflation
    tocFinancialFreedom: 'Financial Freedom & Inflation',
    financialFreedomTitle: 'What is Financial Freedom?',
    financialFreedomSubtitle:
      'And can you achieve it by just saving cash in a regular bank account?',
    financialFreedomDefBadge: 'Core Definition',
    financialFreedomDefTitle: 'The True Meaning of Financial Freedom',
    financialFreedomDefText:
      'Financial Freedom (or Financial Independence) is the state where your accumulated investments and assets generate enough continuous passive income (dividends and compounding growth) to cover 100% of your living expenses, without requiring you to work for a paycheck.',
    financialFreedomFormulaLabel: 'The Universal Freedom Equation',
    financialFreedomFormulaValue: 'Annual Investment Returns ≥ Annual Living Costs',
    financialFreedomPillar1Title: 'Time Sovereignty',
    financialFreedomPillar1Desc:
      'You own your 24 hours. You wake up each morning and decide what to work on, when, and with whom.',
    financialFreedomPillar2Title: 'Zero Survival Stress',
    financialFreedomPillar2Desc:
      'No anxiety over sudden layoffs, economic recessions, or emergency costs—your foundation is solid.',
    financialFreedomPillar3Title: 'Work by Passion, Not Necessity',
    financialFreedomPillar3Desc:
      'You work only because you love the mission or want to create value, never because you desperately need next month’s rent.',
    canWeReachWithoutInvestingQuestion: 'Can you reach financial independence without investing?',
    canWeReachWithoutInvestingAnswer:
      'The realistic answer is: Mathematically impossible for 99% of people. Saving cash is vital, but cash alone cannot build freedom.',
    whyCashFailsTitle: 'Why Cash Savings Alone Fail over Time:',
    inflationErosionTitle: 'The Silent Thief: Inflation',
    inflationErosionDesc:
      'With a modest 3% inflation rate, $10,000 kept in cash loses nearly 50% of its purchasing power in 20 years. Leaving cash idle guarantees guaranteed loss.',
    finiteLifeEnergyTitle: 'Finite Human Energy & Aging',
    finiteLifeEnergyDesc:
      'You cannot work 24/7 or maintain peak workplace energy past your 60s. Freedom means your accumulated wealth generates enough return to cover your life expenses.',
    compoundBridgeTitle: 'The Compounding Bridge to Freedom',
    compoundBridgeDesc:
      'Investing harnesses the power of compound interest. Over 15–25 years, the accumulated gains often dwarf the actual money you deposited from your own salary.',

    // Guide Section 3: Video Masterclass
    tocVideoMasterclass: 'Video Masterclass',
    videoSectionTitle: 'Recommended Video: Complete 2026 Beginner Guide',
    videoSectionSubtitle:
      'A structured, practical breakdown of how to start halal investing step by step without fear',
    videoBadge: 'Featured Masterclass',
    videoChannelName: 'Ali Alhamed',
    videoPresenter: 'Ali Alhamed (Financial Content Creator)',
    videoKeyTakeawaysTitle: 'Key Takeaways from This Masterclass:',
    videoTakeaway1Title: '1. Choosing the Right Brokerage Account',
    videoTakeaway1Desc:
      'How to pick a licensed, low-fee broker suitable for your country to buy stocks and funds securely.',
    videoTakeaway2Title: '2. Halal & Ethical Screening Standards',
    videoTakeaway2Desc:
      'Understanding Sharia guidelines, non-interest businesses, and screening tools to invest 100% clean and halal.',
    videoTakeaway3Title: '3. Why Index Funds (ETFs) Beat Stock Picking',
    videoTakeaway3Desc:
      'Why owning hundreds of solid companies in a single fund protects beginners from losing money on bad gambles.',
    videoTakeaway4Title: '4. Consistency Beats Timing the Market',
    videoTakeaway4Desc:
      'Starting with whatever modest amount you have today, rather than waiting for a mythical perfect moment.',
    videoWatchOnYoutube: 'Watch on YouTube',

    // Guide Section 4: Safe Strategy for Beginners
    tocSafeStrategy: 'Where to Invest?',
    safeStrategyTitle: 'Where & How Should a Beginner Actually Invest?',
    safeStrategySubtitle:
      'Simple, battle-tested pillars to build long-term wealth without financial anxiety',
    etfCardTitle: 'Diversified Index Funds (ETFs)',
    etfCardBadge: 'The Cornerstone',
    etfCardDesc:
      'Instead of risking your savings on one trendy company that could crash, buy an Exchange-Traded Fund (like SPUS or SPWO). You instantly own tiny pieces of top global companies with one click.',
    dcaCardTitle: 'Dollar-Cost Averaging (Monthly DCA)',
    dcaCardBadge: 'Stress-Free',
    dcaCardDesc:
      'Automate a fixed monthly investment (e.g., $100 or $300) regardless of whether the market went up or down this week. Over decades, this beats 90% of professional wall street traders.',
    trapsCardTitle: 'Avoid the "Get-Rich-Quick" Traps',
    trapsCardBadge: 'Capital Protection',
    trapsCardDesc:
      'Stay far away from daily day-trading, forex signals, meme coins, and gurus promising 50% monthly returns. Real investing is slow, boring, and remarkably effective.',

    // Guide Section 5: The 3 Golden Steps
    tocThreeSteps: 'The 3 Golden Rules',
    threeStepsTitle: 'The 3 Rules Before Investing Your First Dollar',
    threeStepsSubtitle:
      'Build an unbreakable foundation so market fluctuations never disrupt your daily peace of mind',
    threeStep1Title: '1. Build an Emergency Buffer (3–6 Months)',
    threeStep1Desc:
      'Keep 3 to 6 months of basic living expenses liquid in a safe checking or cash-yield account so you never have to sell investments in a downturn.',
    threeStep2Title: '2. Eradicate High-Cost Consumer Debt',
    threeStep2Desc:
      'Pay off credit card balances and high-interest personal loans first. Debt interest charges usually outpace investment returns.',
    threeStep3Title: '3. Start Immediately with Any Amount & Hold',
    threeStep3Desc:
      'Time in the market is much more potent than timing the market. Starting with $50 today is vastly better than waiting 5 years to start with $5,000.',

    // Guide Section 6: Interactive CTA
    guideCtaTitle: 'Ready to See Your Financial Future in Numbers?',
    guideCtaSubtitle:
      'Plug your numbers into our interactive simulator to discover the exact wealth and passive income you can build over time.',
    guideCtaBtn: 'Open the Investment Simulator Now 🚀',
  },

  ar: {
    appTitle: 'حاسبة الاستثمار',
    appSubtitle: 'حاسبة ومحاكي الاستثمار وعوائد الأرباح المركبة',
    proBadge: '',
    installApp: 'تثبيت التطبيق',
    resetButton: 'إعادة ضبط',
    switchLanguage: 'English',
    selectCurrency: 'العملة',
    themeToggle: 'تبديل المظهر',
    themeLight: 'التبديل إلى الوضع النهاري',
    themeDark: 'التبديل إلى الوضع الليلي',

    heroBadge: 'قوة النمو والعائد المركب',
    heroTitle: 'حاسبة الاستثمار والأرباح المركبة',
    heroDescription:
      'خطط لمستقبلك المالي واستقلالك. اكتشف كيف تحول المساهمات الشهرية البسيطة والأرباح المركبة مدخراتك إلى ثروة حقيقية مع مرور الوقت.',
    heroGuideBtn: 'دليل الاستثمار للمبتدئ',
    growthMultiplier: 'مضاعف النمو',


    calculationStrategy: 'استراتيجية الاستثمار',
    recurringMode: 'استثمار شهري دوري',
    lumpSumMode: 'مبلغ إجمالي دفعة واحدة',
    goalMode: 'تحقيق هدف مالي',

    // Goal Mode Inputs & Display
    goalBadge: 'خطة الهدف المالي',
    targetGoalAmount: 'المبلغ المستهدف',

    targetGoalTooltip: 'المبلغ الإجمالي أو الثروة التي تطمح للوصول إليها',
    requiredMonthlyDeposit: 'الإيداع الشهري المطلوب',
    requiredMonthlyDepositDesc: 'المبلغ الذي تحتاجه شهرياً لتحقيق هدفك',
    goalAlreadyReached: 'رأس مالك الحالي سينمو ذاتياً ليتجاوز هدفك بفضل الأرباح التراكمية دون الحاجة لإيداع شهري إضافي!',
    goalPlanSummary: 'للوصول إلى هدفك البالغ',
    perMonth: 'شهرياً',

    monthlyDeposit: 'الإيداع الشهري',
    monthlyDepositTooltip: 'المبلغ المودع شهرياً بانتظام',
    initialStartingPrincipal: 'رأس المال الحالي',
    initialPrincipalTooltip: 'المبلغ المتوفر لديك للبدء به اليوم',
    expectedAnnualReturn: 'العائد السنوي',
    expectedReturnTooltip: 'نسبة النمو أو الربح السنوي المركب',
    investmentPeriod: 'مدة الاستثمار',
    investmentPeriodTooltip: 'عدد سنوات استمرار الاستثمار',
    yearsSuffix: ' سنة',


    lumpPrincipal: 'رأس المال الأولي',
    lumpPrincipalTooltip: 'استثمار لمرة واحدة مقدماً',
    compoundingFrequency: 'تكرار احتساب العائد المركب',
    frequencies: {
      annually: 'سنوياً',
      quarterly: 'ربع سنوي',
      monthly: 'شهرياً',
      daily: 'يومياً',
    },

    benchmarksTitle: 'مؤشرات العائد السنوي الاسترشادية',
    presetCash: 'نقد ومرابحة',
    presetCashDesc: 'مخاطر منخفضة (ودائع وصكوك)',
    presetBalanced: 'محفظة متوازنة 60/40',
    presetBalancedDesc: 'مخاطر معتدلة (أسهم وصكوك)',
    presetSP500: 'مؤشر S&P 500',
    presetSP500Desc: 'أكبر 500 شركة أمريكية (متوسط تاريخي)',
    presetGrowth: 'أسهم نمو وتكنولوجيا',
    presetGrowthDesc: 'عوائد أعلى (تذبذب أكبر)',
    formulaTitle: 'المعادلة الحسابية المعتمدة:',

    totalInvested: 'إجمالي ما تدفعه من جيبك',
    totalInvestedSub: 'مجموع مساهماتك المالية المباشرة',
    interestEarned: 'أرباح النمو التراكمي',
    totalReturnSub: 'إجمالي العائد المحقق',
    finalPortfolioValue: 'القيمة النهائية للثروة',
    multiplierBadge: 'مضاعف نمو',
    principalInvestedRatio: 'رأس المال المدفوع',
    interestGainsRatio: 'عوائد الأرباح المركبة',
    inflationToggle: 'احتساب أثر التضخم (3%)',
    inflationTooltip: 'يُظهر لك القيمة المستقبلية بما يعادلها من قوة شرائية حقيقية بأسعار اليوم',
    inflationAdjustedBadge: 'القوة الشرائية الحقيقية',
    todayPurchasingPower: 'القوة الشرائية بأسعار اليوم',

    // Comparison: Investing vs Cash
    vsCashTitle: 'مقارنة: الاستثمار الذكي مقابل ترك الأموال كاش',
    vsCashSubtitle: 'شاهد الفارق الصادم بين أن تنمي أموالك بالأرباح المركبة أو تتركها مجمدة في حساب جارٍ تفقد قيمتها',
    cashSavings: 'الادخار التقليدي (كاش في البنك)',
    cashSavingsDesc: 'عائد 0% (وقيمتها تتآكل سنوياً بسبب التضخم)',
    compoundInvesting: 'الاستثمار التراكمي الذكي',
    compoundInvestingDesc: 'أموالك تعمل وتنمو لأجلك على مدار الساعة',
    freeMoneyGained: 'أرباح إضافية صنعتها قوة الوقت والتراكم',
    cashComparisonInsight: 'لو تركت أموالك كاش دون استثمار، ستفقد فرصة الحصول على هذا المبلغ الإضافي الضخم دون أن تبذل ساعة عمل إضافية واحدة!',

    // Rule of 72 & Notes
    ruleOf72Title: 'قاعدة الـ 72 المالية (متى تتضاعف أموالك؟)',
    ruleOf72Prefix: 'بهذا العائد المتوقع، ستتضاعف ثروتك تلقائياً كل',
    ruleOf72Suffix: 'سنوات دون الحاجة لمضاعفة إيداعاتك!',
    shariaNote: '💡 تنبيه تعليمي للمبتدئين: توضح هذه الحاسبة نمو الأرباح التراكمية في الصناديق والأسهم الاستثمارية وتوزيعاتها (بما فيها الصناديق والأسهم المتوافقة مع الشريعة الإسلامية) وليست فوائد قروض بنكية.',

    // Beginner's Guide Roadmap
    beginnerGuideTitle: 'دليل المبتدئ السريع: كيف تبدأ الاستثمار كشخص عادي؟',
    beginnerGuideSubtitle: 'خمس خطوات واقعية وبسيطة لكل شخص يريد بناء أمانه المالي دون تعقيد',
    guideShow: 'عرض الدليل',
    guideHide: 'إخفاء الدليل',
    step1Title: '1. صندوق الطوارئ أولاً وقبل كل شيء',

    step1Desc: 'قبل أن تستثمر فلساً واحداً، احتفظ بمصاريف 3 إلى 6 أشهر في حساب جارٍ أو حساب مرابحة آمن وسهل السحب للطوارئ فقط.',
    step2Title: '2. سدد ديونك الاستهلاكية وبطاقات الائتمان',
    step2Desc: 'تخلص أولاً من أي ديون ذات فوائد عالية؛ لأن تكلفة الديون تفوق أي عائد استثماري قد تحققه في أي سوق.',
    step3Title: '3. ابدأ بمبالغ بسيطة واستثمر شهرياً بانتظام',
    step3Desc: 'لا تنتظر توفر مبالغ طائلة للبدء! استقطاع 200 أو 500 دولار شهرياً مع الاستمرار لسنوات يبني ثروة تفوق توقعاتك.',
    step4Title: '4. نوّع عبر صناديق المؤشرات (ETFs)',
    step4Desc: 'تجنب وضع مدخراتك كلها في سهم شركة واحدة؛ بل نوّع عبر صناديق المؤشرات (ETFs) مثل الصناديق المتوافقة مع الشريعة الإسلامية (مثل SPUS و SPWO) التي توزع استثمارك بأمان على مئات الشركات الناجحة.',
    step5Title: '5. الصبر وتجاهل الهبوط اللحظي للسوق',

    step5Desc: 'الاستثمار الحقيقي ماراثون طويل الأمد (10 إلى 20 سنة). صعود وهبوط الأسواق أمر طبيعي ومؤقت؛ الاستمرارية هي السر الحقيقي للأثرياء.',

    chartTitle: 'توقعات نمو المحفظة الاستثمارية',
    chartSubtitle: 'مخطط بياني يوضح تراكم رأس المال مقابل العوائد المركبة عبر السنوات',
    chartArea: 'مساحي',
    chartBar: 'أعمدة',
    chartYearPrefix: 'سنة',
    chartInvestedLegend: 'إجمالي رأس المال',
    chartInterestLegend: 'إجمالي أرباح النمو',
    chartEndingBalance: 'الرصيد النهائي',

    tableTitle: 'جدول التوزيع والنمو السنوي',
    tableSubtitle: 'رصيد كل سنة، الإيداعات الجديدة، وأرباح الفائدة المركبة',
    exportCSV: 'تصدير ملف CSV',
    colYear: 'السنة',
    colStartingBalance: 'رصيد البداية',
    colAnnualDeposit: 'الإيداع السنوي',
    colInterestEarned: 'أرباح السنة',
    colTotalInterest: 'تراكم الأرباح',
    colEndingBalance: 'رصيد النهاية',
    colRealBalance: 'القيمة بالقوة الشرائية',
    yearRowPrefix: 'السنة',
    showLess: 'عرض أقل',
    viewAll: 'عرض كافة السنوات',
    moreRowsSuffix: 'سنة إضافية',

    footerTitle: 'حاسبة ومحاكي الاستثمار وعوائد الأرباح المركبة',
    footerDevelopedBy: 'تصميم وتطوير',
    developerName: 'إسماعيل موسى',
    footerRights: 'جميع الحقوق محفوظة.',
    contactLinkedIn: 'لينكد إن',
    contactEmail: 'البريد الإلكتروني',
    pwaTitle: 'تثبيت حاسبة الاستثمار',
    pwaDescriptionIos: 'اضغط على زر "مشاركة" ثم اختر "إضافة إلى الصفحة الرئيسية" للوصول الفوري بدون إنترنت.',
    pwaDescriptionOther: 'أضف التطبيق لشاشتك الرئيسية لتجربة سريعة بملء الشاشة مع العمل بدون اتصال.',
    pwaInstallNow: 'تثبيت الآن',
    pwaMaybeLater: 'لاحقاً',

    // Navigation
    navCalculator: 'الحاسبة المالية',
    navGuide: 'دليل الاستثمار',
    navGuideBadge: '',

    // Educational Guide Page
    guideHeroBadge: 'دليل المبتدئين الشامل للحرية المالية',
    guideHeroTitle: 'من الصفر إلى الثروة: كيف تجعل أموالك تصنع لك الحرية الحقيقية؟',
    guideHeroSubtitle:
      'دليل عملي مبسّط بلغة واقعية خالية من الفلسفة والمصطلحات المعقدة، كُتب خصيصاً لكل شخص يريد حماية تعبه، ومحاربة التضخم، وجعل أمواله تعمل لأجله.',
    guideBackToCalc: 'العودة للحاسبة',
    guideTryCalc: 'جرّب أرقامك في الحاسبة',
    tableOfContents: 'الانتقال السريع للأقسام',

    // Guide Section 1: Mindset
    tocWhatIsInvesting: 'ما هو الاستثمار؟',
    whatIsInvestingTitle: 'ما هو الاستثمار حقاً؟ (تغيير العقلية المالية)',
    whatIsInvestingSubtitle:
      'الفرق الجوهري والمصيري بين أن تظل تبيع وقتك للمال، وبين أن تجعل أموالك تعمل وتلد أرباحاً لأجلك',
    traditionalWorkTitle: 'العمل التقليدي (بيع الساعات مقابل راتب)',
    traditionalWorkBadge: 'سقف محدود للدخل',
    traditionalWorkDesc:
      'تبيع ساعات يومك وصحتك مقابل راتب شهري ثابت. إذا أخذت إجازة أو مرضت أو تقاعدت، يتوقف تدفق المال فوراً! أنت وحدك مَن يحمل 100% من عبء جلب المال.',
    smartInvestingTitle: 'الاستثمار الذكي (امتلاك أصول حقيقية منتجة)',
    smartInvestingBadge: 'نمو تراكمي لا محدود',
    smartInvestingDesc:
      'تشتري حصصاً في شركات ناجحة ومربحة. آلاف الموظفين والمدراء يكدحون يومياً لتطوير أعمالهم، وحصتك من أرباحهم وتوزيعاتهم تنمو وتدخل حسابك حتى وأنت نائم.',
    mindsetQuote: '«إذا لم تجد طريقة لجعل أموالك تعمل وتكسب لك وأنت نائم، فستظل تعمل طوال حياتك حتى تموت.»',
    mindsetQuoteAuthor: 'وارن بافيت (أحد أعظم المستثمرين بالتاريخ)',

    // Guide Section 2: Financial Freedom & Inflation
    tocFinancialFreedom: 'تعريف الحرية المالية',
    financialFreedomTitle: 'ما هي الحرية المالية حقاً؟',
    financialFreedomSubtitle:
      'التعريف الحقيقي للاستقلال المالي، وهل يمكن أن تصل إليها بمجرد جمع وتكديس الكاش في حساب بنكي عادي؟',
    financialFreedomDefBadge: 'المفهوم والتعريف الأساسي',
    financialFreedomDefTitle: 'ما هي الحرية المالية (Financial Freedom)؟',
    financialFreedomDefText:
      'الحرية المالية هي وصولك إلى مرحلة تولّد فيها أصولك واستثماراتك دخلاً تراكمياً مستمراً (عبر الأرباح المركبة والتوزيعات الدورية) يغطي كامل تكاليف ونفقات معيشتك الشخصية والأسرية، دون أن تكون مضطراً أو مجبراً على بيع وقتك يومياً في وظيفة من أجل لقمة العيش.',
    financialFreedomFormulaLabel: 'المعادلة الذهبية للحرية المالية',
    financialFreedomFormulaValue: 'عوائد الاستثمارات السنوية ≥ تكاليف ونفقات المعيشة السنوية',
    financialFreedomPillar1Title: 'امتلاك كامل لوقتك (24 ساعة لك)',
    financialFreedomPillar1Desc:
      'أن تستيقظ كل صباح وتملك قرارك: كيف تقضي يومك، أين تعيش، ومع من تقضي وقتك دون انتظار إذن أو موافقة من أحد.',
    financialFreedomPillar2Title: 'راحة البال وانعدام قلق البقاء',
    financialFreedomPillar2Desc:
      'التحرر التام من رعب فقدان الوظيفة أو الأزمات الاقتصادية المفاجئة؛ لأن مدخولك محمي بأصول حقيقية تدر عليك دخلاً.',
    financialFreedomPillar3Title: 'العمل بشغف واختيار لا إجبار',
    financialFreedomPillar3Desc:
      'إذا عملت، فإنك تعمل في المشاريع التي تحبها وتبدع فيها، وليس مجرد عمل روتيني شاق لإيفاء إيجار وفواتير نهاية الشهر.',
    canWeReachWithoutInvestingQuestion: 'هل تستطيع تحقيق الحرية المالية دون استثمار؟',
    canWeReachWithoutInvestingAnswer:
      'الإجابة الصادمة والصريحة: مستحيل رياضياً واقتصادياً لـ 99% من البشر. الادخار وحفظ الكاش خطوة أولى، لكنه بمفرده لا يصنع حرية مالية أبداً!',
    whyCashFailsTitle: 'لماذا يفشل ادخار الكاش وحده عبر الزمن؟',
    inflationErosionTitle: 'اللص الصامت: وحش التضخم (Inflation)',
    inflationErosionDesc:
      'بمعدل تضخم سنوي طبيعي 3%، كل 10,000 دولار تدخرها كاش في البنك ستفقد قرابة نصف قيمتها الشرائية بعد 20 سنة! ترك المال راكداً يعني خسارة مؤكدة 100%.',
    finiteLifeEnergyTitle: 'طاقة الإنسان محدودة مع تقدم العمر',
    finiteLifeEnergyDesc:
      'لا يمكنك العمل 24 ساعة يومياً، ولن تمتلك نفس النشاط البدني بعد سن الستين. الحرية المالية تعني أن يصبح عائد أموالك المستثمرة كافياً لتغطية مصاريف معيشتك دون الحاجة لوظيفة.',
    compoundBridgeTitle: 'الاستثمار هو الجسر الوحيد للحرية',
    compoundBridgeDesc:
      'قوة الأرباح المركبة تجعل المال يلد مالاً. بعد 15 إلى 25 سنة، يصبح حجم الأرباح الناتجة عن محفظتك أكبر بكثير من مجموع الرواتب التي دفعتها من جيبك.',

    // Guide Section 3: Video Masterclass
    tocVideoMasterclass: 'فيديو الدليل العملي',
    videoSectionTitle: 'فيديو مقترح: دليل المبتدئين للاستثمار بالحلال خطوة بخطوة',
    videoSectionSubtitle:
      'شرح عملي وموجز يشرح لك بالصوت والصورة كيفية البدء بأمان دون خوف ومن أين تشتري أصولك',
    videoBadge: 'الدليل المرئي الشامل',
    videoChannelName: 'علي الحامد',
    videoPresenter: 'علي الحامد (صانع محتوى مالي واستثماري)',
    videoKeyTakeawaysTitle: 'أهم المحاور التي يغطيها هذا الفيديو:',
    videoTakeaway1Title: '1. اختيار وسيط التداول المالي المرخص',
    videoTakeaway1Desc:
      'كيفية فتح حساب في منصة مرخصة وآمنة ومعتمدة في بلدك لشراء الأسهم والصناديق برسوم منخفضة.',
    videoTakeaway2Title: '2. معايير الاستثمار الحلال والأسهم النقية',
    videoTakeaway2Desc:
      'الضوابط الشرعية المعتمدة (تجنب الربا، القروض البنكية، والأنشطة المحرمة) لضمان بركة أموالك ونقائها.',
    videoTakeaway3Title: '3. لماذا صناديق المؤشرات (ETFs) هي خيار المبتدئ الأفضل؟',
    videoTakeaway3Desc:
      'كيف تحميك الصناديق التي تجمع مئات الشركات من مخاطر إفلاس شركة واحدة أو خسارة مدخراتك.',
    videoTakeaway4Title: '4. الاستمرارية تهزم التوقيت',
    videoTakeaway4Desc:
      'البدء بأي مبلغ بسيط متاح لديك اليوم، وعدم انتظار توفر مبالغ خيالية أو محاولة التنبؤ بقمم وقيعان السوق.',
    videoWatchOnYoutube: 'مشاهدة الفيديو مباشرة على YouTube',

    // Guide Section 4: Safe Strategy for Beginners
    tocSafeStrategy: 'أين وكيف تستثمر؟',
    safeStrategyTitle: 'أين وكيف يستثمر الشخص العادي بأمان؟',
    safeStrategySubtitle:
      'ركائز واضحة ومثبتة تاريخياً لبناء الثروة دون توتر أو قلق من متابعة الأخبار',
    etfCardTitle: 'صناديق المؤشرات المتداولة (ETFs)',
    etfCardBadge: 'حجر الأساس للأمان',
    etfCardDesc:
      'بدلاً من المخاطرة برأس مالك في شركة واحدة قد تهبط، اشترِ صندوق مؤشرات (مثل SPUS أو SPWO). بضغطة زر واحدة تصبح مالكاً لحصص في مئات الشركات العالمية الرائدة مع توزيع آمن للمخاطر.',
    dcaCardTitle: 'الشراء الشهري المنتظم (DCA)',
    dcaCardBadge: 'استراتيجية راحة البال',
    dcaCardDesc:
      'خصّص مبلغاً شهرياً ثابتاً (مثلاً 50$ أو 200$) للاستثمار بصرف النظر عن سعر السوق هذا الأسبوع. هذه الطريقة تجعلك تشتري رخيصاً عند الهبوط، وتتفوق تاريخياً على 90% من مدراء الصناديق المحترفين.',
    trapsCardTitle: 'تجنب فخاخ "الثراء السريع"',
    trapsCardBadge: 'حماية رأس المال',
    trapsCardDesc:
      'ابتعد تماماً عن المضاربة اليومية، وتوصيات التلغرام، ومواقع الفوركس والعملات المشبوهة، والوعود الزائفة بأرباح سريعة. الاستثمار الحقيقي هو مثل زراعة شجرة تثمر بالصبر مع السنوات.',

    // Guide Section 5: The 3 Golden Steps
    tocThreeSteps: 'القواعد الذهبية الثلاث',
    threeStepsTitle: '3 قواعد ذهبية قبل أن تستثمر أول فلس',
    threeStepsSubtitle:
      'ابنِ أساساً مالياً صلباً حتى لا تضطر أبداً لبيع استثماراتك في أوقات هبوط الأسواق',
    threeStep1Title: '1. صندوق الطوارئ أولاً (3 إلى 6 أشهر)',
    threeStep1Desc:
      'احتفظ بمصاريف 3 إلى 6 أشهر في حساب جارٍ أو حساب مرابحة عالي السيولة، مخصص تماماً للظروف المفاجئة فقط حتى لا تمس محفظتك الاستثمارية.',
    threeStep2Title: '2. سداد الديون الاستهلاكية وبطاقات الائتمان',
    threeStep2Desc:
      'تخلص أولاً من أي ديون أو فوائد بنكية استهلاكية مرتفعة؛ لأن تكلفة الديون تستنزف أي عوائد استثمارية قد تحققها.',
    threeStep3Title: '3. ابدأ فوراً بما تملك ولا تنتظر',
    threeStep3Desc:
      'الوقت هو العامل الأقوى في معادلة الثروة. البدء بـ 50 دولاراً اليوم أفضل بأضعاف من البدء بـ 5,000 دولار بعد 5 سنوات بسبب قوة التراكم الزمني.',

    // Guide Section 6: Interactive CTA
    guideCtaTitle: 'هل أنت جاهز لرؤية مستقبلك المالي بالأرقام؟',
    guideCtaSubtitle:
      'ادخل إلى الحاسبة الآن، حدد مبلغ إيداعك الشهري الذي يناسب ميزانيتك، وشاهد بالأرقام والرسوم البيانية كيف ستصنع لك الأرباح المركبة استقلالك المالي.',
    guideCtaBtn: 'انتقل إلى حاسبة الاستثمار والأرباح المركبة 🚀',
  },
};

export function getCurrencySymbol(currency: CurrencyCode, lang: Language): string {
  const c = CURRENCIES[currency] || CURRENCIES.USD;
  return lang === 'ar' ? c.symbolAr : c.symbolEn;
}
