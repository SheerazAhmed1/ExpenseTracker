import { defineConfig, type Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
};
