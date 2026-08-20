import { NextResponse } from "next/server";

// Consultation booking requests. Validates server-side and returns ok.
// ponytail: no calendar/email delivery wired yet — connect a provider (e.g.
// Resend / a scheduling tool via the Vercel Marketplace) and dispatch here.
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const mode = String(data.mode ?? "").trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!/^[+\d][\d\s-]{7,}$/.test(phone)) errors.push("phone");
  if (!mode) errors.push("mode");

  if (errors.length) {
    return NextResponse.json({ ok: false, fields: errors }, { status: 422 });
  }

  console.log("[consultation] new booking", { name, phone, mode });
  return NextResponse.json({ ok: true });
}
