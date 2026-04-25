import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

const WATI_ENDPOINT = process.env.WATI_API_ENDPOINT ?? "";
const WATI_TOKEN = process.env.WATI_ACCESS_TOKEN ?? "";

export const leadQualify = inngest.createFunction(
  {
    id: "lead-qualify",
    triggers: [{ event: "lead/created" }],
  },
  async ({ event }) => {
    const { leadId, phone, city, area } = event.data as {
      leadId: string;
      phone: string;
      city: string;
      area?: string;
    };

    const location = area ? `${area}, ${city}` : city;
    const introMessage =
      `Hi! I'm the NestTrue assistant. You asked about ${location} — I can give you an honest, unbiased breakdown: ` +
      `prices, red flags, and whether it fits your situation.\n\n` +
      `To give you a useful answer, I need two things:\n` +
      `1. Your budget (e.g. ₹80L, ₹1.2Cr)\n` +
      `2. Any specific project you've seen, or the area you're considering\n\n` +
      `What are you working with?`;

    try {
      const res = await fetch(`${WATI_ENDPOINT}/api/v1/sendSessionMessage/${phone}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WATI_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageText: introMessage }),
      });

      if (!res.ok) {
        console.error(`WATI intro send failed for lead ${leadId}:`, res.status, await res.text());
        await prisma.lead.update({
          where: { id: leadId },
          data: { waStatus: "failed" },
        });
        return { ok: false };
      }

      await prisma.lead.update({
        where: { id: leadId },
        data: { waStatus: "qualifying" },
      });

      return { ok: true };
    } catch (err) {
      console.error(`lead-qualify error for lead ${leadId}:`, err);
      await prisma.lead.update({
        where: { id: leadId },
        data: { waStatus: "failed" },
      });
      return { ok: false };
    }
  }
);
