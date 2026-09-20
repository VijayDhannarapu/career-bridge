'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Prop = {
    query?: string
}
export async function GetJobs({ query }: Prop = {}) {
    if (!query) {
        return await prisma.postJob.findMany()
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
        }
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

        if (!plainText) {
            return {
                success: false,
                message: "Description Required",
                status: 400
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
        console.log("error bro")
        return {
            success: false,
            message: "Something went wrong try again",
            status: 400
        }
    }
}