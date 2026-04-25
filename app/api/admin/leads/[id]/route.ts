import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { score, scoreReason, notes, status, assignedTo, qualified } = body;

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      ...(score !== undefined && { score: Number(score) }),
      ...(scoreReason !== undefined && { scoreReason }),
      ...(notes !== undefined && { notes }),
      ...(status !== undefined && { status }),
      ...(assignedTo !== undefined && { assignedTo }),
      ...(qualified !== undefined && { qualified: Boolean(qualified) }),
    },
  });

  return NextResponse.json(lead);
}
