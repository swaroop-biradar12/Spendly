import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="glass mx-4 mt-4 px-6 flex items-center gap-6 sticky top-4 z-50">
      <span className="text-white font-bold text-lg py-4">
        💸 Spendly
      </span>

      <Link
        to="/"
        className={`text-sm py-4 border-b-2 transition-colors ${
          location.pathname === '/'
            ? 'border-purple-400 text-purple-300 font-semibold'
            : 'border-transparent text-gray-400 hover:text-gray-200'
        }`}
      >
        Home
      </Link>

      <Link
        to="/history"
        className={`text-sm py-4 border-b-2 transition-colors ${
          location.pathname === '/history'
            ? 'border-purple-400 text-purple-300 font-semibold'
            : 'border-transparent text-gray-400 hover:text-gray-200'
        }`}
      >
        History
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm text-gray-300">
          👤 {user?.name}
        </span>
        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded-xl border border-red-500 border-opacity-40 text-red-400 hover:bg-red-500 hover:bg-opacity-20 transition-all font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}