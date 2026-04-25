import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, name, city, area } = body;

    if (!phone || !city) {
      return NextResponse.json({ error: "phone and city are required" }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const lead = await prisma.lead.upsert({
      where: { phone },
      update: { city, area: area ?? undefined, name: name ?? undefined, updatedAt: new Date() },
      create: { phone, name: name ?? undefined, city, area: area ?? undefined },
    });

    await inngest.send({
      name: "lead/created",
      data: { leadId: lead.id, phone: lead.phone, city: lead.city, area: lead.area },
    });

    console.log(`[leads] captured lead ${lead.id} for ${lead.phone} (${lead.city})`);

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
