import React from 'react';
import { formatCurrency } from '../utils/calculations';

interface BalanceCardProps {
  balance: number;
  budget: number;
  className?: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, budget, className = '' }) => {
  const percentage = budget > 0 ? Math.abs((balance / budget) * 100) : 0;
  const isOverBudget = balance < 0;
  const spent = budget - balance;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="text-gray-600 text-sm mb-2">Saldo Tersisa</div>
      <div className={`text-4xl font-bold mb-4 ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
        {formatCurrency(balance)}
      </div>

      {budget > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Anggaran Bulanan</span>
            <span className="font-medium">{formatCurrency(budget)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Pengeluaran</span>
            <span className="font-medium text-red-600">{formatCurrency(spent)}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isOverBudget ? 'bg-red-500' : 'bg-primary-600'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          <div className="text-xs text-gray-500 text-center mt-1">
            {isOverBudget
              ? `Melebihi anggaran ${Math.abs(percentage).toFixed(1)}%`
              : `Tersisa ${percentage.toFixed(1)}%`
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
