"use server"

import cloudinary from "@/lib/cloudinary"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export default async function GetAppliedJobs({ clerkId }: { clerkId: string }) {
    try {
        const id = await prisma.user.findUnique({
            where: {
                clerkId
            },
            select: { userId: true }
        })
        const userId = id?.userId
        if (!userId) {
            return null
        }
        return await prisma.application.findMany(({
            where: { userId },
            include: {
                postJob: true
            }
        }))
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createUser(formData: FormData) {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
        throw new Error("User Not found")
    }
    const fileData = formData.get("resume") as File
    let resumeUrl: string | undefined;
    if (fileData.size > 0) {
        if (fileData.type !== "application/pdf")
            throw new Error("File Must Be pdf")

        if (fileData.size > 5 * 1024 * 1024)
            throw new Error("Pdf must less then 5 MB")

        const arrayBuffer = await fileData.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise<any>((resolve, rejects) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "resumes",
                    resource_type: "raw",
                    format: "pdf",
                    public_id: `${fileData.name}`,
                },
                (error, result) => {
                    if (error) rejects(error)
                    else resolve(result)
                }
            ).end(buffer)
        })

        resumeUrl = uploadResult.secure_url
    }

    const college = formData.get("college") as string
    const branch = formData.get("branch") as string
    const startYear = Number(formData.get("startYear") as string)
    const passoutYear = Number(formData.get("passoutYear") as string)
    const phone = formData.get("phone") as string
    const skills = formData.get("skills") as string
    try {
        await prisma.user.update({
            where: { clerkId },
            data: {
                college,
                branch,
                startYear,
                passoutYear,
                phone,
                skills,
                resumeUrl
            }
        })
    } catch (error) {
        console.error(error);
        throw new Error("Failed to save profile");
    }
    redirect("/user")
}