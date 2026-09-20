import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive ? 'bg-ink text-paper' : 'text-stone-600 hover:bg-stone-100'
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r border-stone-200 bg-white flex flex-col">
        <div className="px-5 py-6">
          <div className="font-serif italic text-xl text-ink">TrueHire</div>
          <div className="text-xs text-stone-400 mt-0.5">Verification Operations</div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {user?.role !== 'verifier' && (
            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
          )}
          {user?.role !== 'verifier' && (
            <NavLink to="/cases" className={linkClass}>Cases</NavLink>
          )}
          {user?.role === 'verifier' && (
            <NavLink to="/my-tasks" className={linkClass}>My Assignments</NavLink>
          )}
        </nav>
        <div className="px-5 py-4 border-t border-stone-200">
          <div className="text-sm font-medium">{user?.name}</div>
          <div className="text-xs text-gold capitalize">{user?.role?.replace('_', ' ')}</div>
          <button onClick={handleLogout} className="text-xs text-stone-400 hover:text-stone-600 mt-2">
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-paper overflow-y-auto">{children}</main>
    </div>
  );
}
