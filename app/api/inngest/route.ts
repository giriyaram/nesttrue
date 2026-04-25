import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { leadQualify } from "@/inngest/functions/lead-qualify";
import { leadMessage } from "@/inngest/functions/lead-message";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [leadQualify, leadMessage],
});
