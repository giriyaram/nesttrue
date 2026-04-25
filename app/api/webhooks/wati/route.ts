import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/lib/inngest";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Auth: verify WATI API key header
  const apiKey = req.headers.get("wati-api-key") ?? req.headers.get("x-api-key");
  if (process.env.WATI_WEBHOOK_SECRET && apiKey !== process.env.WATI_WEBHOOK_SECRET) {
    console.warn("[wati] rejected webhook — invalid API key");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const body = await req.json();

    const phone = body?.waId?.replace(/\D/g, "");
    const text = body?.text?.body ?? body?.message ?? "";
    const messageId = body?.id ?? body?.messageId;
    const sessionId = body?.sessionId ?? body?.id;

    if (!phone) return NextResponse.json({ ok: true });

    const lead = await prisma.lead.findUnique({ where: { phone } });
    if (!lead) return NextResponse.json({ ok: true });

    // Message-level dedup: skip if same messageId was already processed
    if (messageId && lead.lastMessageId === messageId) {
      console.log(`[wati] duplicate message ${messageId} for lead ${lead.id} — skipped`);
      return NextResponse.json({ ok: true });
    }

    const messages = Array.isArray(lead.rawMessages) ? (lead.rawMessages as object[]) : [];
    messages.push({ role: "user", text, timestamp: new Date().toISOString() });

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        waSessionId: sessionId ?? lead.waSessionId,
        lastMessageId: messageId ?? lead.lastMessageId,
        rawMessages: messages,
        waStatus: "qualifying",
      },
    });

    console.log(`[wati] message received for lead ${lead.id}: "${text.slice(0, 60)}"`);

    await inngest.send({
      name: "lead/message-received",
      data: { leadId: lead.id, message: text },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WATI webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
