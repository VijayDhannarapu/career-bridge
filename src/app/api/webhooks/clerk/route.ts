import { verifyWebhook } from "@clerk/backend/webhooks";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/enums";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const evt = await verifyWebhook(request);

    if (evt.type === "user.created") {
      const user = evt.data;
      const requestedRole = user.unsafe_metadata?.role;
      const role: Role = requestedRole === "RECRUITER" ? "RECRUITER" : "USER";
      console.log("role: ", role)
      if (role === "USER") {
        await prisma.user.create({
          data: {
            clerkId: user.id,
            name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
            email: user.email_addresses[0]?.email_address,
            role: "USER"
          },
        });
      }
      if (role === "RECRUITER") {
        await prisma.recruiter.create({
          data: {
            clerkId: user.id,
            name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
            email: user.email_addresses[0]?.email_address,
            role: "RECRUITER",
            officeName: ""
          },
        });
        const client = await clerkClient();
        await client.users.updateUser(user.id, {
          publicMetadata: {
            role: "RECRUITER"
          }
        })
      }
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