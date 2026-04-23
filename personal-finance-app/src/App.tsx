import React, { useState } from 'react';
import { useFinance } from './hooks/useFinance';
import BalanceCard from './components/BalanceCard';
import BudgetInput from './components/BudgetInput';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';

const App: React.FC = () => {
  const {
    transactions,
    budget,
    currentBalance,
    spendingData,
    addTransaction,
    deleteTransaction,
    setMonthlyBudget,
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'transactions' | 'chart'>('transactions');

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Personal Finance Tracker
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {monthNames[currentMonth]} {currentYear}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo Tersisa</p>
              <p className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(currentBalance)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Budget Input */}
          <div className="lg:col-span-1">
            <BudgetInput
              currentBudget={budget}
              onBudgetSet={setMonthlyBudget}
            />
          </div>

          {/* Balance Card */}
          <div className="lg:col-span-2">
            <BalanceCard balance={currentBalance} budget={budget} />
          </div>
        </div>

        {/* Transaction Form */}
        <div className="mb-8">
          <TransactionForm onAddTransaction={addTransaction} />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Riwayat Transaksi
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'chart'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Grafik Pengeluaran
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        <div>
          {activeTab === 'transactions' ? (
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={deleteTransaction}
            />
          ) : (
            <SpendingChart data={spendingData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
