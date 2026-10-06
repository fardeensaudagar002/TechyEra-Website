import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/server/session";
import { getResume } from "@/lib/server/submissions";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  const r = await getResume(Number((await params).id));
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(Buffer.from(r.resume_data), {
    headers: {
      "Content-Type": r.resume_type,
      // always download — never render an uploaded file inside the admin origin
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(r.resume_name)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    },
  });
}
