import { useState, useEffect } from 'react';
import { Transaction, MonthlyBudget } from '../types/transaction';
import { storage } from '../utils/storage';
import { calculateBalance, getTransactionsByMonth, formatCurrency } from '../utils/calculations';

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [budgetMonth, setBudgetMonth] = useState<number>(new Date().getMonth());
  const [budgetYear, setBudgetYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const storedTransactions = storage.getTransactions();
    setTransactions(storedTransactions);

    const currentBudget = storage.getMonthlyBudget(budgetMonth, budgetYear);
    setBudget(currentBudget?.amount || 0);
  }, [budgetMonth, budgetYear]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date(),
    };

    storage.addTransaction(newTransaction);
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    storage.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const setMonthlyBudget = (amount: number) => {
    const newBudget: MonthlyBudget = {
      month: budgetMonth,
      year: budgetYear,
      amount,
    };

    storage.saveMonthlyBudget(newBudget);
    setBudget(amount);
  };

  const currentBalance = calculateBalance(
    getTransactionsByMonth(transactions, budgetMonth, budgetYear),
    budget
  );

  const spendingData = getTransactionsByMonth(transactions, budgetMonth, budgetYear)
    .filter(t => t.amount < 0)
    .map(t => ({
      name: t.description,
      amount: Math.abs(t.amount),
    }));

  return {
    transactions,
    budget,
    currentBalance,
    spendingData,
    addTransaction,
    deleteTransaction,
    setMonthlyBudget,
    budgetMonth,
    budgetYear,
    setBudgetMonth,
    setBudgetYear,
    formatCurrency,
  };
};