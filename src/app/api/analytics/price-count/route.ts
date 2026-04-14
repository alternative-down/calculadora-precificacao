import { NextResponse } from "next/server";

// Static fallback until DB wiring is implemented
// TODO: wire to real count from users/pricing table
const FALLBACK_COUNT = 2400;

export async function GET() {
  try {
    // DB wiring TBD — feedback table has no user/pricing data yet
    // Placeholder: return static count with fallback
    return NextResponse.json({ count: FALLBACK_COUNT });
  } catch {
    return NextResponse.json({ count: FALLBACK_COUNT });
  }
}
