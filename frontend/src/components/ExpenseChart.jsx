const CATEGORY_COLORS = {
  Food: 'bg-green-500',
  Transport: 'bg-blue-500',
  Shopping: 'bg-purple-500',
  Bills: 'bg-red-500',
  Other: 'bg-gray-500'
};

const CATEGORY_GLOW = {
  Food: 'shadow-green-500/50',
  Transport: 'shadow-blue-500/50',
  Shopping: 'shadow-purple-500/50',
  Bills: 'shadow-red-500/50',
  Other: 'shadow-gray-500/50'
};

export default function ExpenseChart({ expenses }) {
  const totals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const max = Math.max(...Object.values(totals), 1);
  const total = Object.values(totals).reduce((a, b) => a + b, 0);

  if (expenses.length === 0) return null;

  return (
    <div className="glass p-5 mb-4">
      <h3 className="text-white font-semibold text-sm mb-4 opacity-80">
        📊 Spending by Category
      </h3>
      <div className="flex flex-col gap-4">
        {Object.entries(totals).map(([category, amount]) => (
          <div key={category}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-300 font-medium">{category}</span>
              <div className="flex gap-3">
                <span className="text-gray-400">
                  {((amount / total) * 100).toFixed(1)}%
                </span>
                <span className="text-white font-semibold">
                  ₹{amount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-10 rounded-full h-2">
              <div
                className={`${CATEGORY_COLORS[category]} h-2 rounded-full shadow-lg ${CATEGORY_GLOW[category]} transition-all duration-500`}
                style={{ width: `${(amount / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}