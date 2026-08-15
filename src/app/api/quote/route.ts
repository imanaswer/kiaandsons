import { NextResponse } from "next/server";

// Quote submissions. Validates server-side and returns ok.
// ponytail: no email/CRM delivery wired yet — add a provider (e.g. Resend via
// the Vercel Marketplace) and send from here when the owner is ready.
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const projectType = String(data.projectType ?? "").trim();

  const errors: string[] = [];
  if (name.length < 2) errors.push("name");
  if (!/^[+\d][\d\s-]{7,}$/.test(phone)) errors.push("phone");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("email");
  if (!projectType) errors.push("projectType");

  if (errors.length) {
    return NextResponse.json({ ok: false, fields: errors }, { status: 422 });
  }

  // Record the enquiry so it isn't lost before delivery is wired.
  console.log("[quote] new enquiry", { name, phone, email, projectType });

  return NextResponse.json({ ok: true });
}
