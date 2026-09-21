import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape and lock page scroll while the mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive ? 'bg-ink text-paper' : 'text-stone-600 hover:bg-stone-100'
    }`;

  return (
    <div className="min-h-screen lg:flex">
      {/* Top bar — mobile / tablet only */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-white border-b border-stone-200">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          className="-ml-2 p-2 rounded-lg text-stone-600 hover:bg-stone-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="font-serif italic text-xl text-ink">TrueQuo</div>
      </header>

      {/* Backdrop behind the mobile drawer */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-40 bg-ink/50 transition-opacity duration-200 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 max-w-[85vw] overflow-y-auto border-r border-stone-200 bg-white flex flex-col transform transition-transform duration-200 ease-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-auto lg:w-60 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:transition-none lg:overflow-visible`}
      >
        <div className="px-5 py-6 flex items-start justify-between">
          <div>
            <div className="font-serif italic text-xl text-ink">TrueQuo</div>
            <div className="text-xs text-stone-400 mt-0.5">Verification Operations</div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="lg:hidden -mr-2 -mt-1 p-2 rounded-lg text-stone-500 hover:bg-stone-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
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

      <main className="flex-1 min-w-0 bg-paper overflow-y-auto">{children}</main>
    </div>
  );
}
