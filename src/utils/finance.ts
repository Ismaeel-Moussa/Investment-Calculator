import {
  RecurringInputs,
  LumpSumInputs,
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
 * Calculates compound interest for Monthly Recurring Investment
 * Formula: FV = P * (1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
 */
export function calculateRecurringInvestment(inputs: RecurringInputs): CalculationResult {
  const { monthlyDeposit, initialDeposit = 0, annualReturn, years } = inputs;
  const r = annualReturn / 100;
  const n = 12; // monthly compounding
  const totalMonths = Math.round(years * 12);
  const monthlyRate = r / n;

  const breakdown: YearlyBreakdownItem[] = [];
  let currentBalance = initialDeposit;
  let totalInvestedSoFar = initialDeposit;
  let accumulatedInterest = 0;

  for (let year = 1; year <= years; year++) {
    const yearStartBalance = currentBalance;
    let yearContributions = 0;
    let yearInterestEarned = 0;

    for (let m = 1; m <= 12; m++) {
      // Month start balance
      // If interest applied on current balance for the month:
      const interestForMonth = currentBalance * monthlyRate;
      currentBalance += interestForMonth + monthlyDeposit;
      yearContributions += monthlyDeposit;
      yearInterestEarned += interestForMonth;
    }

    totalInvestedSoFar += yearContributions;
    accumulatedInterest += yearInterestEarned;

    breakdown.push({
      year,
      startingBalance: Math.round(yearStartBalance * 100) / 100,
      annualContributions: Math.round(yearContributions * 100) / 100,
      interestEarned: Math.round(yearInterestEarned * 100) / 100,
      totalInterest: Math.round(accumulatedInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  const totalInvested = initialDeposit + monthlyDeposit * totalMonths;
  const finalBalance = breakdown.length > 0 ? breakdown[breakdown.length - 1].endingBalance : initialDeposit;
  const totalInterest = Math.max(0, finalBalance - totalInvested);
  const returnPercentage = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;
  const multiplier = totalInvested > 0 ? finalBalance / totalInvested : 1;

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    returnPercentage: Math.round(returnPercentage * 10) / 10,
    multiplier: Math.round(multiplier * 100) / 100,
    breakdown,
  };
}

/**
 * Calculates compound interest for Lump Sum (One-Time Investment)
 * Formula: FV = P * (1 + r/n)^(n*t)
 */
export function calculateLumpSum(inputs: LumpSumInputs): CalculationResult {
  const { initialPrincipal, annualReturn, years, compoundingFrequency } = inputs;
  const r = annualReturn / 100;
  const n = getPeriodsPerYear(compoundingFrequency);

  const breakdown: YearlyBreakdownItem[] = [];
  let currentBalance = initialPrincipal;
  let accumulatedInterest = 0;

  for (let year = 1; year <= years; year++) {
    const yearStartBalance = currentBalance;
    
    // Balance at end of this year:
    // With compounding n times per year, 1 year compounding multiplier is (1 + r/n)^n
    const yearEndBalance = r === 0 
      ? initialPrincipal 
      : initialPrincipal * Math.pow(1 + r / n, n * year);

    const yearInterestEarned = yearEndBalance - yearStartBalance;
    accumulatedInterest += yearInterestEarned;
    currentBalance = yearEndBalance;

    breakdown.push({
      year,
      startingBalance: Math.round(yearStartBalance * 100) / 100,
      annualContributions: 0,
      interestEarned: Math.round(yearInterestEarned * 100) / 100,
      totalInterest: Math.round(accumulatedInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  const totalInvested = initialPrincipal;
  const finalBalance = breakdown.length > 0 ? breakdown[breakdown.length - 1].endingBalance : initialPrincipal;
  const totalInterest = Math.max(0, finalBalance - totalInvested);
  const returnPercentage = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;
  const multiplier = totalInvested > 0 ? finalBalance / totalInvested : 1;

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    returnPercentage: Math.round(returnPercentage * 10) / 10,
    multiplier: Math.round(multiplier * 100) / 100,
    breakdown,
  };
}
