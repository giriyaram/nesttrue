import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

// Phase 2: AI verdict generation lives here.
// Stub: acknowledges the message and sends a fallback response.
// The full Anthropic SDK verdict call is the next Phase 2 task.

const WATI_ENDPOINT = process.env.WATI_API_ENDPOINT ?? "";
const WATI_TOKEN = process.env.WATI_ACCESS_TOKEN ?? "";

const FALLBACK_MESSAGE =
  "Thanks for sharing that. Our research team will send you a detailed analysis on WhatsApp shortly. " +
  "We earn a referral fee only when we connect you with a developer — our research is independent, " +
  "and we'll tell you if a project isn't right for you.";

async function sendWatiMessage(phone: string, message: string): Promise<boolean> {
  try {
    const res = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${phone}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WATI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageText: message }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const leadMessage = inngest.createFunction(
  {
    id: "lead-message",
    triggers: [{ event: "lead/message-received" }],
  },
  async ({ event }) => {
    const { leadId } = event.data as { leadId: string; message: string };

    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { ok: false, reason: "lead not found" };

    // Phase 2 TODO: extract project/area intent, load area data,
    // call Anthropic SDK for verdict, send structured verdict response.

    const sent = await sendWatiMessage(lead.phone, FALLBACK_MESSAGE);

    await prisma.lead.update({
      where: { id: leadId },
      data: { waStatus: sent ? "qualifying" : "failed" },
    });

    return { ok: sent };
  }
);
