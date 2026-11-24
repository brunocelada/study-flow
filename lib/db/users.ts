import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

import { sql } from "@/lib/db/client";
import type { User } from "@/types/user";

type UserRow = {
  id: string;
  email: string;
};

export type AuthUser = {
  id: string;
  email: string;
  passwordHash: string | null;
};

type AuthUserRow = {
  id: string;
  email: string;
  password_hash: string | null;
};

export async function getUserById(id: string): Promise<User | null> {
  const rows = (await sql`
    SELECT id, email
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `) as UserRow[];

  return rows[0] ?? null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = (await sql`
    SELECT id, email
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `) as UserRow[];

  return rows[0] ?? null;
}

export async function getUserForAuthentication(
  email: string,
): Promise<AuthUser | null> {
  const rows = (await sql`
    SELECT id, email, password_hash
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `) as AuthUserRow[];

  const user = rows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    passwordHash: user.password_hash,
  };
}

export async function createUserWithPassword(
  email: string,
  password: string,
): Promise<User> {
  const id = randomUUID();
  const passwordHash = await hash(password, 12);

  const rows = (await sql`
    INSERT INTO users (id, email, password_hash)
    VALUES (${id}, ${email}, ${passwordHash})
    RETURNING id, email
  `) as UserRow[];

  return rows[0];
}

export async function upsertUser(user: User): Promise<User> {
  const rows = (await sql`
    INSERT INTO users (id, email)
    VALUES (${user.id}, ${user.email})
    ON CONFLICT (id)
    DO UPDATE SET email = EXCLUDED.email
    RETURNING id, email
  `) as UserRow[];

  return rows[0];
}
