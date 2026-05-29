import "server-only";

import { Pool, type PoolConfig, type QueryResult, type QueryResultRow } from "pg";

declare global {
  var __dashboardPool: Pool | undefined;
}

const DATABASE_URL_KEY = "DATABASE_URL";

function getConnectionString() {
  return process.env[DATABASE_URL_KEY]?.trim() ?? "";
}

export function getDatabaseConfig() {
  const connectionString = getConnectionString();

  return {
    envKey: DATABASE_URL_KEY,
    connectionString,
    configured: connectionString.length > 0,
  };
}

export function createPool(config: PoolConfig = {}) {
  const connectionString = config.connectionString ?? getConnectionString();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return new Pool({
    ...config,
    connectionString,
  });
}

export function getPool() {
  if (!global.__dashboardPool) {
    global.__dashboardPool = createPool();
  }

  return global.__dashboardPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values?: unknown[],
) {
  return getPool().query<T>(text, values) as Promise<QueryResult<T>>;
}
