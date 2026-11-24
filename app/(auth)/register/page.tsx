"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  registerAction,
  type RegisterState,
} from "@/app/(auth)/actions";

const initialState: RegisterState = {};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <main>
      <h1>Create account</h1>

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
            autoComplete="new-password"
            required
          />
        </div>

        {state.error && <p role="alert">{state.error}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </main>
  );
}
