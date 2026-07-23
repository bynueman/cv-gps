"use client";

import { Suspense, useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(
        result.error === "CredentialsSignin"
          ? "Email atau password salah."
          : result.error
      );
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm rounded-3xl border border-espresso-900/10 bg-cream-50 p-8 shadow-card">
      <h1 className="font-display text-2xl font-semibold text-espresso-950">
        Admin Login
      </h1>
      <p className="mt-1 text-sm text-espresso-600">CV Gama Putra Santosa</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-espresso-900/15 bg-cream-100 px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-espresso-900/15 bg-cream-100 px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          />
        </div>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
