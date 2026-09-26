import { verifyWebhook } from "@clerk/backend/webhooks";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const evt = await verifyWebhook(request);

    if (evt.type === "user.created") {
      const user = evt.data;

      await prisma.user.create({
        data: {
          clerkId: user.id,
          name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
          email: user.email_addresses[0]?.email_address,
          role: "USER"
        },
      });
    }

    return new Response("Webhook received", {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Webhook failed", {
      status: 400,
    });
  }
}