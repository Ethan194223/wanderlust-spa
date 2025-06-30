// src/components/AuthForm.tsx
import { useState, type FormEvent } from 'react';

type Props = {
  /** Text shown on the submit button (“Log in”, “Create account”…). */
  submitLabel: string;
  /**
   * Callback invoked on submit.
   * For Login you’ll pass:   (email, pwd, _)      → login(email, pwd)
   * For Register you’ll pass: (email, pwd, name)  → register(email, pwd, name)
   */
  onSubmit: (email: string, password: string, name?: string) => Promise<void>;
  /** If true the full *name* input is rendered (use for Register). */
  askName?: boolean;
};

export default function AuthForm({ submitLabel, onSubmit, askName = false }: Props) {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();                         // 🚫 full-page reload
    await onSubmit(email.trim(), password, name.trim() || undefined);
    setPassword('');                            // optional UX touch
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-xs mx-auto mt-8"
    >
      {askName && (
        <input
          className="border rounded p-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        className="border rounded p-2"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="border rounded p-2"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        {submitLabel}
      </button>
    </form>
  );
}
