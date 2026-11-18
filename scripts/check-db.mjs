import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not configured.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

try {
  const result = await sql`SELECT 1 AS connected`;

  console.log("Database connection successful.");
  console.log(result);
} catch (error) {
  console.error("Database connection failed.");
  console.error(error);
  process.exit(1);
}
