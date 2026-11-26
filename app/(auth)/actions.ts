"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import {
  createUserWithPassword,
  getUserByEmail,
} from "@/lib/db/users";

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type RegisterState = {
  error?: string;
};

export type LoginState = {
  error?: string;
};

export async function registerAction(
  _previousState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsedData = registrationSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedData.success) {
    return {
      error: "Please enter a valid email address and password.",
    };
  }

  const email = parsedData.data.email.trim().toLowerCase();
  const password = parsedData.data.password;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "An account with this email already exists.",
    };
  }

  await createUserWithPassword(email, password);

  redirect("/login");
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsedData = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedData.success) {
    return {
      error: "Please enter a valid email address and password.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsedData.data.email.trim().toLowerCase(),
      password: parsedData.data.password,
      redirectTo: "/dashboard",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Invalid email or password.",
      };
    }

    throw error;
  }
}

export async function logoutAction() {
  await signOut({
    redirectTo: "/login",
  });
}
