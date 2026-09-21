import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('ops@truequo.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-serif italic text-3xl text-paper">TrueQuo</div>
          <div className="text-sm text-stone-400 mt-1">Verification Operations</div>
        </div>
        <form onSubmit={handleSubmit} className="bg-paper rounded-2xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-stone-600">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-600">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" className="w-full bg-ink text-paper rounded-lg py-2.5 text-sm font-medium hover:bg-stone-800 transition">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
