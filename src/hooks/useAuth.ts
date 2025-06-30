// src/hooks/useAuth.ts
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import api from '@/utils/api';

/* ──────────────────────────────
   Types
──────────────────────────────── */
export type User = {
  id:    string;
  email: string;
  role:  'PUBLIC' | 'OPERATOR';
};

type AuthContextType = {
  user:     User | null;
  login:    (email: string, password: string)                 => Promise<void>;
  register: (email: string, password: string, name?: string)  => Promise<void>;
  logout:   () => void;
};

/* ──────────────────────────────
   Context
──────────────────────────────── */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ──────────────────────────────
   Provider
──────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  /* ---------- 1.  Re-hydrate on mount ---------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    (async () => {
      try   { const { data } = await api.get<User>('/profile/me'); setUser(data); }
      catch { localStorage.removeItem('token'); setUser(null); }
    })();
  }, []);

  /* ---------- 2.  Auth helpers ---------- */
  async function login(email: string, password: string) {
    const { data } = await api.post<{ token: string; user: User }>(
      '/auth/login',
      { email, password },
    );
    localStorage.setItem('token', data.token);
    setUser(data.user);
  }

  async function register(
    email: string,
    password: string,
    name: string = email.split('@')[0],
  ) {
    try {
      const { data } = await api.post<{ token: string; user: User }>(
        '/auth/register',
        { email, password, name, signupCode: 'wanderlust-admin-2025' },
      );
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ?? err?.message ?? 'Registration failed';
      throw new Error(msg);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  const value: AuthContextType = { user, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ──────────────────────────────
   Hook
──────────────────────────────── */
function useAuthHook() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/* Export BOTH named and default so either import style works */
export { useAuthHook as useAuth };
export default useAuthHook;
