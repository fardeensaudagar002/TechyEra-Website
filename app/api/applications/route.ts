import { NextResponse } from "next/server";
import { applicationSchema, MAX_RESUME_BYTES } from "@/lib/forms";
import { getJob } from "@/data/jobs";
import { query } from "@/lib/server/db";
import { notify } from "@/lib/server/notify";

export const runtime = "nodejs";

const fieldsSchema = applicationSchema.omit({ resume: true, consent: true });

/** Checks the file's first bytes so a renamed file can't pass as a PDF/Word document. */
function sniff(bytes: Uint8Array): string | null {
  const b = (i: number) => bytes[i];
  if (b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46) return "application/pdf";
  if (b(0) === 0x50 && b(1) === 0x4b) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (b(0) === 0xd0 && b(1) === 0xcf && b(2) === 0x11 && b(3) === 0xe0) return "application/msword";
  return null;
}

export async function POST(req: Request) {
  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ error: "Invalid form submission." }, { status: 400 }); }
  if (form.get("website")) return NextResponse.json({ ok: true });

  const job = getJob(String(form.get("job") ?? ""));
  if (!job) return NextResponse.json({ error: "This position is no longer open." }, { status: 404 });
  if (form.get("consent") !== "true") return NextResponse.json({ error: "Consent is required to process your application." }, { status: 422 });

  const parsed = fieldsSchema.safeParse(Object.fromEntries(Array.from(form.entries()).filter(([, v]) => typeof v === "string")));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form and try again." }, { status: 422 });
  const v = parsed.data;

  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Attach your resume." }, { status: 422 });
  if (file.size > MAX_RESUME_BYTES) return NextResponse.json({ error: "Resume must be 4 MB or smaller." }, { status: 413 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniff(bytes);
  if (!type) return NextResponse.json({ error: "Upload your resume as a PDF or Word document." }, { status: 422 });
  const name = file.name.replace(/[^\w.\- ()]/g, "_").slice(-120) || "resume";

  try {
    const [row] = await query<{ id: number }>(
      `INSERT INTO applications (job_slug, job_title, full_name, email, phone, location, experience, linkedin, portfolio, cover_letter, resume_name, resume_type, resume_size, resume_data)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id`,
      [job.slug, job.title, v.fullName, v.email, v.phone, v.location, v.experience, v.linkedin, v.portfolio, v.coverLetter, name, type, file.size, Buffer.from(bytes)],
    );
    await notify(`New application: ${job.title} — ${v.fullName}`, [
      ["Position", job.title], ["Name", v.fullName], ["Email", v.email], ["Phone", v.phone], ["Location", v.location],
      ["Experience", v.experience], ["LinkedIn", v.linkedin], ["Portfolio", v.portfolio], ["Resume", name], ["Cover letter", v.coverLetter],
    ], `/admin/applications/${row.id}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to save application", e);
    return NextResponse.json({ error: "We couldn’t save your application. Please try again shortly." }, { status: 500 });
  }
}
