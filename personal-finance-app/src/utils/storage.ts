import { Transaction, MonthlyBudget } from '../types/transaction';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-transactions',
  MONTHLY_BUDGET: 'finance-monthly-budget',
} as const;

export const storage = {
  // Transactions
  getTransactions: (): Transaction[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!stored) return [];

    const transactions = JSON.parse(stored);
    return transactions.map((t: any) => ({
      ...t,
      date: new Date(t.date),
    }));
  },

  saveTransactions: (transactions: Transaction[]) => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  addTransaction: (transaction: Transaction) => {
    const transactions = storage.getTransactions();
    transactions.push(transaction);
    storage.saveTransactions(transactions);
  },

  deleteTransaction: (id: string) => {
    const transactions = storage.getTransactions().filter(t => t.id !== id);
    storage.saveTransactions(transactions);
  },

  // Monthly Budget
  getMonthlyBudget: (month: number, year: number): MonthlyBudget | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.MONTHLY_BUDGET);
    if (!stored) return null;

    const budgets = JSON.parse(stored);
    return budgets.find((b: MonthlyBudget) => b.month === month && b.year === year);
  },

  saveMonthlyBudget: (budget: MonthlyBudget) => {
    const stored = localStorage.getItem(STORAGE_KEYS.MONTHLY_BUDGET);
    const budgets = stored ? JSON.parse(stored) : [];

    const existingIndex = budgets.findIndex((b: MonthlyBudget) =>
      b.month === budget.month && b.year === budget.year
    );

    if (existingIndex >= 0) {
      budgets[existingIndex] = budget;
    } else {
      budgets.push(budget);
    }

    localStorage.setItem(STORAGE_KEYS.MONTHLY_BUDGET, JSON.stringify(budgets));
  },
};
