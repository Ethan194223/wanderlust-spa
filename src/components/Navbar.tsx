import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

/* ───────────────────────────────────────────
   A simple top-bar that reacts to auth state
─────────────────────────────────────────── */
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    logout();            // clear token + user
    nav('/login');       // bounce to login screen
  }

  /* Tailwind utility classes keep things tiny; tweak as you like */
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl flex items-center justify-between p-4">
        {/* Brand / Home */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight text-indigo-600"
        >
          Wanderlust 🏝️
        </NavLink>

        {/* Right-hand side */}
        <ul className="flex items-center gap-6">
          {user ? (
            <>
              {/* Profile link could hit /profile/me or similar */}
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `font-medium ${
                      isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                    }`
                  }
                >
                  {user.email.split('@')[0]}
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            /* Not logged-in → Login link */
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-lg border px-3 py-1 text-sm ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`
                }
              >
                Log in
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
