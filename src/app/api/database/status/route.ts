import { NextResponse } from "next/server";

import { getDatabaseConfig, query } from "@/lib/db";

export async function GET() {
  const config = getDatabaseConfig();

  if (!config.configured) {
    return NextResponse.json({
      configured: false,
      envKey: config.envKey,
      message: "DATABASE_URL is not configured.",
    });
  }

  try {
    const result = await query<{ ok: number }>("SELECT 1 AS ok");

    return NextResponse.json({
      configured: true,
      envKey: config.envKey,
      connected: result.rows[0]?.ok === 1,
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        envKey: config.envKey,
        connected: false,
        message: error instanceof Error ? error.message : "Unknown database error.",
      },
      { status: 500 },
    );
  }
}
