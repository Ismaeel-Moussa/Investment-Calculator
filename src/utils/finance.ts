import {
  RecurringInputs,
  LumpSumInputs,
  GoalInputs,
  CalculationResult,
  YearlyBreakdownItem,
  CompoundingFrequency,
} from '../types/calculator';

/**
 * Frequency to number of compounding periods per year
 */
export function getPeriodsPerYear(frequency: CompoundingFrequency): number {
  switch (frequency) {
    case 'annually':
      return 1;
    case 'quarterly':
      return 4;
    case 'monthly':
      return 12;
    case 'daily':
      return 365;
    default:
      return 12;
  }
}

/**
 * Calculate purchasing power adjusted for inflation
 */
export function calculateRealPurchasingPower(nominalAmount: number, inflationRate: number, years: number): number {
  if (inflationRate <= 0 || years <= 0) return nominalAmount;
  const discountFactor = Math.pow(1 + inflationRate / 100, years);
  return Math.round((nominalAmount / discountFactor) * 100) / 100;
}

/**
 * Calculates compound interest for Monthly Recurring Investment
 * Formula: FV = P * (1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
 */
export function calculateRecurringInvestment(
  inputs: RecurringInputs,
  inflationRate: number = 0
): CalculationResult {
  const { monthlyDeposit, initialDeposit = 0, annualReturn, years } = inputs;
  const safeYears = Math.min(100, Math.max(1, Math.round(years || 1)));
  const r = annualReturn / 100;
  const n = 12; // monthly compounding
  const totalMonths = Math.round(safeYears * 12);
  const monthlyRate = r / n;

  const breakdown: YearlyBreakdownItem[] = [];
  let currentBalance = initialDeposit;
  let totalInvestedSoFar = initialDeposit;
  let accumulatedInterest = 0;

  for (let year = 1; year <= safeYears; year++) {
    const yearStartBalance = currentBalance;
    let yearContributions = 0;
    let yearInterestEarned = 0;

    for (let m = 1; m <= 12; m++) {
      const interestForMonth = currentBalance * monthlyRate;
      currentBalance += interestForMonth + monthlyDeposit;
      yearContributions += monthlyDeposit;
      yearInterestEarned += interestForMonth;
    }

    totalInvestedSoFar += yearContributions;
    accumulatedInterest += yearInterestEarned;

    const realEndingBalance =
      inflationRate > 0
        ? Math.round((currentBalance / Math.pow(1 + inflationRate / 100, year)) * 100) / 100
        : undefined;

    breakdown.push({
      year,
      startingBalance: Math.round(yearStartBalance * 100) / 100,
      annualContributions: Math.round(yearContributions * 100) / 100,
      interestEarned: Math.round(yearInterestEarned * 100) / 100,
      totalInterest: Math.round(accumulatedInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
      realEndingBalance,
    });
  }

  const totalInvested = initialDeposit + monthlyDeposit * totalMonths;
  const finalBalance = breakdown.length > 0 ? breakdown[breakdown.length - 1].endingBalance : initialDeposit;
  const totalInterest = Math.max(0, finalBalance - totalInvested);
  const returnPercentage = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;
  const multiplier = totalInvested > 0 ? finalBalance / totalInvested : 1;
  const realFinalBalance =
    inflationRate > 0 ? calculateRealPurchasingPower(finalBalance, inflationRate, safeYears) : undefined;

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    returnPercentage: Math.round(returnPercentage * 10) / 10,
    multiplier: Math.round(multiplier * 100) / 100,
    breakdown,
    realFinalBalance,
  };
}

/**
 * Calculates compound interest for Lump Sum (One-Time Investment)
 * Formula: FV = P * (1 + r/n)^(n*t)
 */
export function calculateLumpSum(
  inputs: LumpSumInputs,
  inflationRate: number = 0
): CalculationResult {
  const { initialPrincipal, annualReturn, years, compoundingFrequency = 'annually' } = inputs;
  const safeYears = Math.min(100, Math.max(1, Math.round(years || 1)));
  const r = annualReturn / 100;
  const n = getPeriodsPerYear(compoundingFrequency);

  const breakdown: YearlyBreakdownItem[] = [];
  let currentBalance = initialPrincipal;
  let accumulatedInterest = 0;

  for (let year = 1; year <= safeYears; year++) {
    const yearStartBalance = currentBalance;

    const yearEndBalance =
      r === 0 ? initialPrincipal : initialPrincipal * Math.pow(1 + r / n, n * year);

    const yearInterestEarned = yearEndBalance - yearStartBalance;
    accumulatedInterest += yearInterestEarned;
    currentBalance = yearEndBalance;

    const realEndingBalance =
      inflationRate > 0
        ? Math.round((currentBalance / Math.pow(1 + inflationRate / 100, year)) * 100) / 100
        : undefined;

    breakdown.push({
      year,
      startingBalance: Math.round(yearStartBalance * 100) / 100,
      annualContributions: 0,
      interestEarned: Math.round(yearInterestEarned * 100) / 100,
      totalInterest: Math.round(accumulatedInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
      realEndingBalance,
    });
  }

  const totalInvested = initialPrincipal;
  const finalBalance = breakdown.length > 0 ? breakdown[breakdown.length - 1].endingBalance : initialPrincipal;
  const totalInterest = Math.max(0, finalBalance - totalInvested);
  const returnPercentage = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;
  const multiplier = totalInvested > 0 ? finalBalance / totalInvested : 1;
  const realFinalBalance =
    inflationRate > 0 ? calculateRealPurchasingPower(finalBalance, inflationRate, safeYears) : undefined;

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    returnPercentage: Math.round(returnPercentage * 10) / 10,
    multiplier: Math.round(multiplier * 100) / 100,
    breakdown,
    realFinalBalance,
  };
}

/**
 * Calculates required monthly deposit to reach a specific financial goal
 */
export function calculateGoalInvestment(
  inputs: GoalInputs,
  inflationRate: number = 0
): CalculationResult {
  const { targetAmount, initialDeposit = 0, annualReturn, years } = inputs;
  const safeYears = Math.min(100, Math.max(1, Math.round(years || 1)));
  const totalMonths = safeYears * 12;
  const r = annualReturn / 100;
  const monthlyRate = r / 12;
  const safeTarget = Math.max(0, targetAmount);
  const safeInitial = Math.max(0, initialDeposit);

  let requiredMonthlyDeposit = 0;

  if (monthlyRate === 0) {
    const remaining = Math.max(0, safeTarget - safeInitial);
    requiredMonthlyDeposit = totalMonths > 0 ? remaining / totalMonths : 0;
  } else {
    // Initial deposit compounded over totalMonths: PV * (1 + monthlyRate)^totalMonths
    const compoundedInitial = safeInitial * Math.pow(1 + monthlyRate, totalMonths);
    const remaining = safeTarget - compoundedInitial;
    if (remaining <= 0) {
      requiredMonthlyDeposit = 0;
    } else {
      // PMT = remaining / [((1 + monthlyRate)^totalMonths - 1) / monthlyRate]
      const annuityFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      requiredMonthlyDeposit = annuityFactor > 0 ? remaining / annuityFactor : 0;
    }
  }

  const roundedMonthlyDeposit = Math.ceil(requiredMonthlyDeposit);

  const recurringResult = calculateRecurringInvestment(
    {
      monthlyDeposit: roundedMonthlyDeposit,
      initialDeposit: safeInitial,
      annualReturn,
      years: safeYears,
    },
    inflationRate
  );

  return {
    ...recurringResult,
    requiredMonthlyDeposit: roundedMonthlyDeposit,
  };
}

