import "server-only";

/**
 * Database access for form submissions.
 *
 * - Production: any PostgreSQL database, via the DATABASE_URL environment variable
 *   (Neon / Vercel Postgres, Supabase, Railway, RDS, or Postgres on your own server).
 * - Local development: with no DATABASE_URL, an embedded Postgres (PGlite) stores data
 *   in ./.data so the site works with zero setup.
 *
 * Tables are created automatically on first use.
 */

type Row = Record<string, unknown>;
interface Driver {
  query<T = Row>(text: string, params?: unknown[]): Promise<{ rows: T[] }>;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS enquiries (
  id          SERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT NOT NULL,
  company     TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL DEFAULT '',
  country     TEXT NOT NULL,
  service     TEXT NOT NULL,
  budget      TEXT NOT NULL,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new',
  notes       TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS applications (
  id           SERIAL PRIMARY KEY,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  job_slug     TEXT NOT NULL,
  job_title    TEXT NOT NULL,
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  location     TEXT NOT NULL,
  experience   TEXT NOT NULL,
  linkedin     TEXT NOT NULL DEFAULT '',
  portfolio    TEXT NOT NULL DEFAULT '',
  cover_letter TEXT NOT NULL DEFAULT '',
  resume_name  TEXT NOT NULL,
  resume_type  TEXT NOT NULL,
  resume_size  INTEGER NOT NULL,
  resume_data  BYTEA NOT NULL,
  status       TEXT NOT NULL DEFAULT 'new',
  notes        TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS login_attempts (
  id         SERIAL PRIMARY KEY,
  ip         TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS applications_created_idx ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries (created_at DESC);
`;

async function createDriver(): Promise<Driver> {
  const url = process.env.DATABASE_URL;
  let driver: Driver;

  if (url) {
    const { Pool } = await import("pg");
    const local = /localhost|127\.0\.0\.1/.test(url);
    const pool = new Pool({ connectionString: url, max: 5, ssl: local || /sslmode=disable/.test(url) ? undefined : { rejectUnauthorized: false } });
    driver = { query: (text, params) => pool.query(text, params) as never };
  } else if (process.env.NODE_ENV !== "production" || process.env.LOCAL_DB === "1") {
    const { PGlite } = await import("@electric-sql/pglite");
    const { mkdirSync } = await import("node:fs");
    mkdirSync(".data", { recursive: true });
    const db = new PGlite(".data/pglite");
    driver = { query: (text, params) => db.query(text, params) as never };
  } else {
    throw new Error("DATABASE_URL is not set. Add a PostgreSQL connection string to the environment (see README → Admin panel).");
  }

  for (const stmt of SCHEMA.split(";").map((s) => s.trim()).filter(Boolean)) await driver.query(stmt);
  return driver;
}

// one driver per server process (survives hot reload in dev)
const g = globalThis as unknown as { __techyeraDb?: Promise<Driver> };

export async function query<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  if (!g.__techyeraDb) {
    g.__techyeraDb = createDriver().catch((e) => { g.__techyeraDb = undefined; throw e; });
  }
  const db = await g.__techyeraDb;
  return (await db.query<T>(text, params)).rows;
}
