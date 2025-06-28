// src/hooks/useAuth.ts
import { createContext, useContext, useState, ReactNode } from 'react';

type User = { email: string };

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Wrap your app with this in main.tsx */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem('token') ? { email: 'placeholder' } : null,
  );

  /** hit /auth/login and stash JWT */
  async function login(email: string, password: string) {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const { token } = await res.json();
    localStorage.setItem('token', token);
    setUser({ email });
  }

  /** /auth/register then auto-login */
  async function register(email: string, password: string) {
    await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  const value = { user, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook other components call */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
