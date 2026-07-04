import { useState } from 'react';

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Other'];

const CATEGORY_COLORS = {
  Food: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30',
  Transport: 'bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-500 border-opacity-30',
  Shopping: 'bg-purple-500 bg-opacity-20 text-purple-300 border border-purple-500 border-opacity-30',
  Bills: 'bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30',
  Other: 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500 border-opacity-30'
};

export default function ExpenseList({ expenses, onDelete }) {
  const [active, setActive] = useState('All');

  const visible = active === 'All'
    ? expenses
    : expenses.filter(e => e.category === active);

  return (
    <div className="mb-4">
      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs px-4 py-1.5 rounded-full transition-all font-semibold ${
              active === cat
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'glass-card text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {visible.length === 0 ? (
          <div className="glass p-8 text-center">
            <p className="text-gray-400 text-sm">No expenses here yet.</p>
          </div>
        ) : (
          [...visible].reverse().map(expense => (
            <div
              key={expense._id}
              className="glass-card px-4 py-3 flex items-center justify-between hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <div>
                <p className="text-white text-sm font-semibold">
                  {expense.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{expense.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[expense.category]}`}>
                    {expense.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-bold">
                  ₹{expense.amount}
                </span>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="text-gray-500 hover:text-red-400 text-xl transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}