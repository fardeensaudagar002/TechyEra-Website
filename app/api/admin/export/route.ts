import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/server/session";
import { listApplications, listEnquiries } from "@/lib/server/submissions";

export const runtime = "nodejs";

// Quote every cell; prefix formula-like values so spreadsheets never execute submitted text.
const cell = (v: unknown) => {
  let s = v instanceof Date ? v.toISOString() : String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const sp = new URL(req.url).searchParams;
  const f = Object.fromEntries(sp.entries());
  const type = sp.get("type") === "enquiries" ? "enquiries" : "applications";

  const rows = (type === "enquiries" ? await listEnquiries(f) : await listApplications(f)) as unknown as Record<string, unknown>[];
  const cols = type === "enquiries"
    ? ["id", "created_at", "name", "company", "email", "phone", "country", "service", "budget", "message", "status", "notes"]
    : ["id", "created_at", "job_title", "full_name", "email", "phone", "location", "experience", "linkedin", "portfolio", "cover_letter", "resume_name", "status", "notes"];
  const csv = "﻿" + [cols.map(cell).join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="techyera-${type}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
