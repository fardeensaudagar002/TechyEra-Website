import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/forms";
import { query } from "@/lib/server/db";
import { notify } from "@/lib/server/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ error: "Invalid form submission." }, { status: 400 }); }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (form.get("website")) return NextResponse.json({ ok: true });

  const parsed = contactSchema.safeParse(Object.fromEntries(Array.from(form.entries()).filter(([, v]) => typeof v === "string")));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form and try again." }, { status: 422 });
  const v = parsed.data;

  try {
    const [row] = await query<{ id: number }>(
      `INSERT INTO enquiries (name, company, email, phone, country, service, budget, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [v.name, v.company, v.email, v.phone, v.country, v.service, v.budget, v.message],
    );
    await notify(`New enquiry from ${v.name} (${v.company})`, [
      ["Name", v.name], ["Company", v.company], ["Email", v.email], ["Phone", v.phone], ["Country", v.country],
      ["Service", v.service], ["Budget", v.budget], ["Message", v.message],
    ], `/admin/enquiries/${row.id}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to save enquiry", e);
    return NextResponse.json({ error: "We couldn’t save your message. Please try again shortly." }, { status: 500 });
  }
}
