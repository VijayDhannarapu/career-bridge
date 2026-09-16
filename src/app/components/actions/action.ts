'use server'

import { prisma } from "@/lib/prisma";
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