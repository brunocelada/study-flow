import { sql } from "@/lib/db/client";
import type { User } from "@/types/user";

type UserRow = {
  id: string;
  email: string;
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
