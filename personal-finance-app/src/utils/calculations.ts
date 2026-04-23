import { Transaction } from '../types/transaction';

export const calculateBalance = (transactions: Transaction[], budget?: number): number => {
  const totalSpent = transactions.reduce((sum, transaction) => {
    return transaction.amount < 0 ? sum + transaction.amount : sum + transaction.amount;
  }, 0);

  return budget ? budget + totalSpent : totalSpent;
};

export const getTransactionsByMonth = (transactions: Transaction[], month: number, year: number): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hari ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};
