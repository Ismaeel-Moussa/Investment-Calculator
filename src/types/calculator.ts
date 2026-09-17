export type CalculationMode = 'recurring' | 'lumpsum';

export type CompoundingFrequency = 'annually' | 'monthly' | 'quarterly' | 'daily';

export interface RecurringInputs {
  monthlyDeposit: number;
  initialDeposit: number;
  annualReturn: number;
  years: number;
}

export interface LumpSumInputs {
  initialPrincipal: number;
  annualReturn: number;
  years: number;
  compoundingFrequency: CompoundingFrequency;
}

export interface YearlyBreakdownItem {
  year: number;
  startingBalance: number;
  annualContributions: number;
  interestEarned: number;
  totalInterest: number;
  endingBalance: number;
}

export interface CalculationResult {
  totalInvested: number;
  totalInterest: number;
  finalBalance: number;
  returnPercentage: number;
  multiplier: number;
  breakdown: YearlyBreakdownItem[];
}
