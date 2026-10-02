"use server"

import { prisma } from "@/lib/prisma"

import { currentUser } from "@clerk/nextjs/server"

export default async function PostedJobs() {
    const authObj = await currentUser()
    const clerkId = authObj?.raw?.id
    const recruiter = await prisma.recruiter.findUnique({
        where: {
            clerkId
        },
    })
    const recruiterId = recruiter?.recId
    return await prisma.postJob.findMany({
        where: {
            recruiterId
        },
        orderBy: {
            posted: "asc"
        }
        ,
        include:{
            _count: {
                select: {applications: true}
            }
        }
    })
}