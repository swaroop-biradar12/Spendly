import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async () => {
    if (!form.description || !form.amount) return;
    await onAdd(form);
    setForm({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="glass p-5 mb-4">
      <h3 className="text-white font-semibold text-sm mb-4 opacity-80">
        ➕ Add New Expense
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          placeholder="Description"
          className="glass-input px-4 py-3 text-sm w-full"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          className="glass-input px-4 py-3 text-sm w-full"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <select
          className="glass-input px-4 py-3 text-sm w-full"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          style={{ color: 'white' }}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat} style={{ background: '#1e1b4b' }}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="glass-input px-4 py-3 text-sm w-full"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          style={{ colorScheme: 'dark' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="glass-btn w-full py-3 text-sm"
      >
        Add Expense
      </button>
    </div>
  );
}