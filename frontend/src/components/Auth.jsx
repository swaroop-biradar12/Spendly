import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async () => {
        setError('');
        setLoading(true);
        const url = isLogin
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/register';

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                setLoading(false);
                return;
            }

            login(data.user, data.token);

        } catch (err) {
            setError('Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {/* Background orbs */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

            <div className="glass p-8 w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-1">
                        💸 Spendly
                    </h1>
                    <p className="text-purple-300 text-sm">
                        Smart expense tracking
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex glass-card mb-6 p-1">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                            isLogin
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                            !isLogin
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-xl px-4 py-3 mb-4">
                        <p className="text-red-300 text-sm text-center">{error}</p>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="glass-input w-full px-4 py-3 text-sm"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="glass-input w-full px-4 py-3 text-sm"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="glass-input w-full px-4 py-3 text-sm"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="glass-btn w-full py-3 mt-2"
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
                    </button>
                </div>

                <p className="text-center text-sm mt-6 text-gray-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span
                        className="text-purple-400 cursor-pointer ml-1 font-semibold hover:text-purple-300"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
}