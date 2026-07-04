const CATEGORY_COLORS = {
  Food: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30',
  Transport: 'bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-500 border-opacity-30',
  Shopping: 'bg-purple-500 bg-opacity-20 text-purple-300 border border-purple-500 border-opacity-30',
  Bills: 'bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30',
  Other: 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500 border-opacity-30'
};

export default function History({ expenses }) {
  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  const grouped = sorted.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(expense);
    return acc;
  }, {});

  if (expenses.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-5">History</h1>
        <div className="glass p-8 text-center">
          <p className="text-gray-400 text-sm">No expenses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-5">📅 History</h1>
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xs text-purple-300 font-semibold">{date}</p>
            <div className="flex-1 h-px bg-white bg-opacity-10"></div>
            <p className="text-xs text-gray-400">
              ₹{items.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {items.map(expense => (
              <div
                key={expense._id}
                className="glass-card px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-white text-sm font-semibold">
                    {expense.description}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${CATEGORY_COLORS[expense.category]}`}>
                    {expense.category}
                  </span>
                </div>
                <span className="text-white text-sm font-bold">
                  ₹{expense.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}