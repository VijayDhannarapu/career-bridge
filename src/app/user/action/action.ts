"use server"

import { prisma } from "@/lib/prisma"

export default async function GetAppliedJobs({ clerkId }: { clerkId: string }) {
    try {
        const id = await prisma.user.findUnique({
            where: {
                clerkId
            },
            select: { userId: true }
        })
        const userId = id?.userId
        if(!userId){
            return null
        }
        return await prisma.application.findMany(({
            where: { userId },
            include: {
                postJob: true
            }
        }))
    }catch(error){
        console.log(error)
        return null
    }
}