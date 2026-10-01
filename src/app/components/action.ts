"use server"

import { prisma } from "@/lib/prisma"

export default async function PostedJobs({recId}: {recId: string}) {
    return await prisma.postJob.findMany({
        where: {
            recruiterId: recId
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