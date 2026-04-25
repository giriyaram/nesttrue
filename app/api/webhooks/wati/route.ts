import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // WATI sends webhooks with waId (phone number) and text
    const phone = body?.waId?.replace(/\D/g, "");
    const text = body?.text?.body ?? body?.message ?? "";
    const sessionId = body?.id ?? body?.sessionId;

    if (!phone) {
      return NextResponse.json({ ok: true });
    }

    const lead = await prisma.lead.findUnique({ where: { phone } });
    if (!lead) return NextResponse.json({ ok: true });

    // Append message to raw transcript
    const messages = Array.isArray(lead.rawMessages) ? lead.rawMessages as object[] : [];
    messages.push({
      role: "user",
      text,
      timestamp: new Date().toISOString(),
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        waSessionId: sessionId ?? lead.waSessionId,
        rawMessages: messages,
        waStatus: "qualifying",
      },
    });

    // Trigger scoring via Inngest
    if (process.env.INNGEST_EVENT_KEY) {
      await fetch("https://inn.gs/e/" + process.env.INNGEST_EVENT_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "lead/message-received",
          data: { leadId: lead.id, message: text },
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WATI webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
