// src/hooks/useAuth.ts
import { createContext, useContext, useState } from 'react';

type User = { email: string };
type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem('token') ? { email: 'placeholder' } : null,
  );

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

  async function register(email: string, password: string) {
    await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    // auto-login for convenience
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
