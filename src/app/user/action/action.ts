"use server"

import { prisma } from "@/lib/prisma"

export default async function GetAppliedJobs({userId}: {userId: string}) {
    return await prisma.application.findMany(({
        where: {userId},
        include : {
            postJob: true
        }
    }))
}