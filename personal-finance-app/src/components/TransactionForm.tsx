import React, { useState } from 'react';
import { Transaction } from '../types/transaction';
import { formatCurrency } from '../utils/calculations';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  className?: string;
}

const CATEGORIES = [
  { name: 'Makanan', color: 'bg-orange-100 text-orange-800' },
  { name: 'Transportasi', color: 'bg-blue-100 text-blue-800' },
  { name: 'Hiburan', color: 'bg-purple-100 text-purple-800' },
  { name: 'Belanja', color: 'bg-green-100 text-green-800' },
  { name: 'Tagihan', color: 'bg-red-100 text-red-800' },
  { name: 'Gaji', color: 'bg-green-100 text-green-800' },
  { name: 'Lainnya', color: 'bg-gray-100 text-gray-800' },
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
  className = ''
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    if (!description || isNaN(parsedAmount) || parsedAmount === 0) {
      return;
    }

    onAddTransaction({
      description,
      amount: isExpense ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
      category: category || undefined,
    });

    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Tambah Transaksi</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contoh: Seblak, Gaji"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipe
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsExpense(true)}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                  isExpense
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                Pengeluaran
              </button>
              <button
                type="button"
                onClick={() => setIsExpense(false)}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                  !isExpense
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                Pemasukan
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah (Rp)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori (opsional)
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  category === cat.name
                    ? cat.color.replace('100', '200').replace('800', '900')
                    : cat.color
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Tambah Transaksi
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
