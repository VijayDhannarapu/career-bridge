"use server"

import { Status } from "@/generated/enums"
import cloudinary from "@/lib/cloudinary"
import { prisma } from "@/lib/prisma"
import { currentUser, auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Role } from "@/generated/enums"
export async function GetApplications() {
    const authObj = await currentUser()
    const clerkId = authObj?.raw?.id
    const recruiter = await prisma.recruiter.findUnique({
        where: {
            clerkId
        },
    })
    const recruiterId = recruiter?.recId
    return await prisma.application.findMany({
        where: {
            postJob: {
                recruiterId
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

export async function JobVisibility({ visibility, postId }: {
    visibility: boolean,
    postId: string
}) {
    try {
        await prisma.postJob.update({
            where: {
                postId
            },
            data: {
                isVisible: visibility
            }
        })
    } catch (error: any) {
        console.log(error)
    }
}

export async function createRecruiter(formData: FormData) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId)
            redirect("/");

        const existing = await prisma.recruiter.findUnique({
            where: { clerkId }
        })

        if (existing) {
            redirect("/recruiter/addJob")
        }

        const fileData = formData.get("uploaded_image") as File
        let imgUrl: string | undefined

        if (fileData.size > 0) {
            const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
            if (!allowedTypes.includes(fileData.type)) {
                throw new Error(`File Type ${fileData.type} not allowed use .png .jpeg .webp`)
            }
            if (fileData.size > 2 * 1024 * 1024) {
                throw new Error("Image must be under 2MB.");
            }
            
            const arrayBuffer = await fileData.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const uploadResult = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "recruiter-logos" },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                ).end(buffer)
            })
            imgUrl = uploadResult.secure_url
        }

        const recruiter = await currentUser()
        const name = `${recruiter?.firstName ?? ""} ${recruiter?.lastName ?? ""}`.trim()
        const email = recruiter?.emailAddresses[0]?.emailAddress ?? ""
        const officeName = formData.get("officeName") as string

        await prisma.recruiter.create({
            data: {
                clerkId,
                name,
                email,
                imgUrl,
                officeName,
                role: "RECRUITER"
            }
        })
        const client = await clerkClient()
        const role: Role = "RECRUITER"
        await client.users.updateUser(clerkId, {
            publicMetadata: {
                role
            }
        })

    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
    redirect("/recruiter/addJob")
}