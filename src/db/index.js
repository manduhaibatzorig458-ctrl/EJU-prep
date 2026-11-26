import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseGlobal = globalThis;

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!databaseGlobal.ejuPrepDatabase) {
    const client = postgres(connectionString, {
      max: 1,
      prepare: false,
    });
    databaseGlobal.ejuPrepDatabase = drizzle({ client, schema });
  }

  return databaseGlobal.ejuPrepDatabase;
}
