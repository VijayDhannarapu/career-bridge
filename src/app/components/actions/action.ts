'use server'

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type Prop = {
    query?: string,
    page?: string
}

const PAGE_SIZE = 6;

export async function GetJobs({ query, page }: Prop = {}) {
    const pageNo = Math.max(1, Number(page) || 1);
    if (!query) {
        return await prisma.postJob.findMany({
            where:{isVisible: true},
            skip: (pageNo - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
            orderBy: { postId: "asc" }
        })
    }

    return await prisma.postJob.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: "insensitive"
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive"
                    }
                }
            ]
        },
        skip: ((pageNo) - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        orderBy: {postId: "asc"}
    })

}

export async function PostJob(_: any, formData: FormData) {
    try {
        const recId = formData.get("recId") as string
        const recruiter = await prisma.recruiter.findUnique({
            where: { recId }
        })

        if (!recruiter) {
            return {
                success: false,
                message: "Recruiter Not Found",
                status: 404
            }
        }

        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const plainText = description.replace(/<[^>]*>/g, "").trim()
        const category = formData.get("jobCategory") as string
        const location = formData.get("jobLocation") as string
        const level = formData.get("jobLevel") as string
        const ctc = Number(formData.get("jobSalary") as string)
        const postId = formData.get("postId") as string
        if (!plainText) {
            return {
                success: false,
                message: "Description Required",
                status: 400
            }
        }
        if (postId) {
            await prisma.postJob.update({
                where: { postId },
                data: {
                    title,
                    description,
                    category,
                    location,
                    level,
                    ctc,
                }
            })
            revalidatePath("/recruiter/addJob")
            revalidatePath("/recruiter/manageJob")

            return {
                success: true,
                message: "Job Updated Successfully",
                status: 200
            }
        }
        await prisma.postJob.create({
            data: {
                title,
                description,
                category,
                location,
                level,
                ctc,
                recruiter: {
                    connect: {
                        recId
                    }
                }
            }
        })
        revalidatePath("/recruiter/addJob")
        revalidatePath("/recruiter/manageJob")
        return {
            success: true,
            message: "Job Posted Successfully",
            status: 200
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong try again",
            status: 400
        }
    }
}

export async function ApplyJob(_prev: any, formData: FormData) {
    const authObj = await currentUser();
    console.log(authObj)
    const clerkId = authObj?.raw?.id ?? "NO_ID"
    const postId = formData.get("postId") as string
    console.log("CKECING CLERK ID", clerkId)

    if (!clerkId || !postId) {
        return {
            success: false,
            message: "Something went Wrong :(",
            status: 409
        }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { userId: true }
        })
        if (!user)
            return { success: false, message: "User Not Found", status: 404 }
        const userId = user.userId;
        const post = await prisma.postJob.findUnique({
            where: { postId }
        })

        if (!post)
            return { success: false, message: "Post Not Found", status: 404 }

        const existing = await prisma.application.findUnique({
            where: {
                userId_postId: { userId, postId }
            }
        })

        if (existing)
            return { success: false, message: "You already applied to this job", status: 409 }

        await prisma.application.create({
            data: {
                user: {
                    connect: {
                        userId
                    }
                },
                postJob: {
                    connect: {
                        postId
                    }
                }
            }
        })

        return {
            success: true,
            message: "Applied Successfully",
            status: 200
        }
    } catch (error: any) {
        return {
            success: false,
            message: "Something went Wrong :)",
            status: 500
        }
    }
}