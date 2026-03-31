import { getDashboards } from "@/lib/dashboards"
import type { NextRequest } from "next/server"

export async function GET(_req: NextRequest) {
  try {
    const dashboards = await getDashboards()
    return Response.json(dashboards, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error loading dashboards:", error)
    return Response.json([], {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
