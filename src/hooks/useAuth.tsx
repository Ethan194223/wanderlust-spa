// src/hooks/useAuth.ts
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import api from '@/utils/api';                 // your axios (or ky) wrapper

/* ──────────────────────────────
   Domain model
──────────────────────────────── */
export type User = {
  id:    string;
  email: string;
  role:  'PUBLIC' | 'OPERATOR';
  name?: string;
};

/* ──────────────────────────────
   DTO coming back from /auth/*
──────────────────────────────── */
type AuthResponse = { token: string; user: User };

/* ──────────────────────────────
   Context signature
──────────────────────────────── */
type AuthContextType = {
  user:     User | null;
  login:    (e: string, p: string)                 => Promise<void>;
  register: (e: string, p: string, n?: string)     => Promise<void>;
  logout:   () => void;
};

/* ──────────────────────────────
   Context instance
──────────────────────────────── */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ──────────────────────────────
   Provider component
──────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  /* 1️⃣  Bootstrap once on mount – check for saved token */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;                       // nothing to re-hydrate

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    api
      .get<User>('/profile/me')
      .then(res => setUser(res.data))
      .catch(err => {
        console.warn('Auth re-hydrate failed:', err?.message);
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      });
  }, []);

  /* 2️⃣  Auth helpers */
  async function login(email: string, password: string) {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    /* save + attach token, update state */
    localStorage.setItem('token', data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUser(data.user);                        // immediate navbar flip
  }

  async function register(
    email: string,
    password: string,
    name: string = email.split('@')[0],
  ) {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
      signupCode: 'wanderlust-admin-2025',     // ⚠️ keep/remove per API needs
    });

    localStorage.setItem('token', data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }

  const value: AuthContextType = { user, login, register, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
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
