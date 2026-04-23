import React from 'react';
import { Transaction } from '../types/transaction';
import { formatCurrency, formatRelativeDate } from '../utils/calculations';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  className?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  className = ''
}) => {
  const CATEGORIES = {
    Makanan: 'bg-orange-100 text-orange-800',
    Transportasi: 'bg-blue-100 text-blue-800',
    Hiburan: 'bg-purple-100 text-purple-800',
    Belanja: 'bg-green-100 text-green-800',
    Tagihan: 'bg-red-100 text-red-800',
    Gaji: 'bg-green-100 text-green-800',
    Lainnya: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold">Riwayat Transaksi</h3>
        <p className="text-sm text-gray-500 mt-1">
          {transactions.length} transaksi
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Belum ada transaksi
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-gray-50 transition-colors transaction-enter"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatRelativeDate(transaction.date)}
                      </div>
                    </div>
                    {transaction.category && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${CATEGORIES[transaction.category as keyof typeof CATEGORIES] || CATEGORIES.Lainnya}`}
                      >
                        {transaction.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </div>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;