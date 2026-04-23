export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category?: string;
}

export interface MonthlyBudget {
  month: string;
  year: number;
  amount: number;
}