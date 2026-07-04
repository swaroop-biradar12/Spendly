import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import History from './components/History';
import Auth from './components/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';

const API = 'http://localhost:5000';

function Home({ expenses, onAdd, onDelete }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const biggest = expenses.length
    ? Math.max(...expenses.map((e) => e.amount))
    : 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 min-h-screen flex flex-col justify-center">

      {/* Total Spent Card */}
      <div className="glass p-6 text-center mb-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 opacity-30 rounded-2xl"></div>
        <div className="relative z-10">
          <p className="text-purple-300 text-sm mb-2">Total Spent</p>
          <h2 className="text-5xl font-bold text-white">
            ₹{total.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass-card p-4">
          <div className="text-xs text-gray-400 mb-1">Transactions</div>
          <div className="text-2xl font-bold text-white">{expenses.length}</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-gray-400 mb-1">Biggest Expense</div>
          <div className="text-2xl font-bold text-white">₹{biggest.toFixed(2)}</div>
        </div>
      </div>

      <ExpenseForm onAdd={onAdd} />
      <ExpenseList expenses={expenses} onDelete={onDelete} />
      <ExpenseChart expenses={expenses} />
    </div>
  );
}

function AppContent() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch(`${API}/api/expenses`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Could not connect to backend:', err);
        setLoading(false);
      });
  }, [token]);

  async function addExpense(newExpense) {
    const res = await fetch(`${API}/api/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newExpense),
    });
    const saved = await res.json();
    setExpenses([...expenses, saved]);
  }

  async function deleteExpense(id) {
    await fetch(`${API}/api/expenses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(expenses.filter((e) => e._id !== id));
  }

  if (!token) return <Auth />;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="glass p-8 text-center">
          <p className="text-purple-300 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              expenses={expenses}
              onAdd={addExpense}
              onDelete={deleteExpense}
            />
          }
        />
        <Route
          path="/history"
          element={<History expenses={expenses} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;