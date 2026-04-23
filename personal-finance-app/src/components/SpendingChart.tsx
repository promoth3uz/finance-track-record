import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface SpendingChartProps {
  data: { name: string; amount: number }[];
  className?: string;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data, className = '' }) => {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4">Pengeluaran Bulanan</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Belum ada data pengeluaran
        </div>
      </div>
    );
  }

  const totalSpent = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Pengeluaran Bulanan</h3>
          <p className="text-sm text-gray-500">Total pengeluaran</p>
        </div>
        <div className="text-2xl font-bold text-red-600">
          Rp {totalSpent.toLocaleString('id-ID')}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `Rp${value.toLocaleString('id-ID')}`}
            />
            <Tooltip
              formatter={(value) => [`Rp${Number(value).toLocaleString('id-ID')}`, 'Jumlah']}
              labelFormatter={(label) => label}
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((item, index) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span>{item.name}</span>
            </div>
            <span>Rp {item.amount.toLocaleString('id-ID')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;