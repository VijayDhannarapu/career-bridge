"use server"

import { Status } from "@/generated/enums"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function GetApplications({ recId }: { recId: string }) {
    return await prisma.application.findMany({
        where: {
            postJob: {
                recruiterId: recId
            }
        },
        include: {
            user: true,
            postJob: true
        }, orderBy: {
            appliedAt: "asc"
        }
    })
}

export async function UpdateStatus(formData: FormData) {
    const postId = formData.get("postId") as string
    const userId = formData.get("userId") as string
    const status = formData.get("status") as Status
    console.log(userId, postId, status)
    try {
        if (!postId || !userId) {
            throw new Error("Something wert Wrong")
        }

        await prisma.application.update({
            where: {
                userId_postId: { userId, postId }
            },
            data: {
                status: status
            }
        })

        revalidatePath("/applications")
    } catch (error: any) {
        throw new Error(error)
    }
    redirect("/recruiter/applications")
}