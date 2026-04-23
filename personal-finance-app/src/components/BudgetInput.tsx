import React, { useState } from 'react';

interface BudgetInputProps {
  currentBudget: number;
  onBudgetSet: (amount: number) => void;
  className?: string;
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  currentBudget,
  onBudgetSet,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(inputValue.replace(/[^0-9]/g, ''));

    if (!isNaN(amount) && amount >= 0) {
      onBudgetSet(amount);
      setInputValue('');
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setInputValue('');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Setel Anggaran Bulanan</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
      Masukkan Anggaran (Rp)
      </label>
      <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Contoh: 5000000"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      autoFocus
      />
      </div>
      <div className="flex gap-2">
      <button
      type="submit"
      className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
      >
      Simpan
      </button>
      <button
      type="button"
      onClick={handleCancel}
      className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
      >
      Batal
      </button>
      </div>
      </form>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
    <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Anggaran Bulanan</h3>
    <button
    onClick={() => setIsEditing(true)}
    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
    >
    Ubah
    </button>
    </div>
    {currentBudget > 0 ? (
      <div className="text-2xl font-bold text-primary-600">
      Rp {currentBudget.toLocaleString('id-ID')}
      </div>
    ) : (
      <button
      onClick={() => setIsEditing(true)}
      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors"
      >
      + Setel Anggaran
      </button>
    )}
    </div>
  );
};

export default BudgetInput;
