"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  loginAction,
  type LoginState,
} from "@/app/(auth)/actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <main>
      <h1>Sign in</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {state.error && <p role="alert">{state.error}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p>
        Don&apos;t have an account? <Link href="/register">Create account</Link>
      </p>
    </main>
  );
}
