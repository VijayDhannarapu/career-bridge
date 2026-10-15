"use server"

import { prisma } from "@/lib/prisma"

import { currentUser } from "@clerk/nextjs/server"

export default async function PostedJobs({ categories, locations }: { categories?: string, locations?: string }) {
    const authObj = await currentUser()
    const clerkId = authObj?.raw?.id
    const recruiter = await prisma.recruiter.findUnique({
        where: {
            clerkId
        },
    })
    const recruiterId = recruiter?.recId

    const cat = categories?.split(",").map((category) => category.trim()).filter(Boolean) ?? []
    const loc = locations?.split(",").map((location) => location.trim()).filter(Boolean) ?? []
    if (cat.length > 0 || loc.length > 0) {
        return await prisma.postJob.findMany({
            where: {
                recruiterId,
                ...(cat.length > 0 && {
                    category: { in: cat },
                }),
                ...(loc.length > 0 && {
                    location: { in: loc },
                }),
            },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
            orderBy: {
                posted: "asc",
            },
        });
    }
    return await prisma.postJob.findMany({
        where: {
            recruiterId
        },
        orderBy: {
            posted: "asc"
        }
        ,
        include: {
            _count: {
                select: { applications: true }
            }
        }
    })
}