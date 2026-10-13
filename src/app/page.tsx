import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: {
        default: "Job Portal | Find Jobs & Hire Talent",
        template: "%s | Job Portal",
    },
    description:
        "Find your next career opportunity or hire talented candidates with our job portal. Explore job openings, apply for jobs, and manage recruitment easily.",
    applicationName: "Job Portal",
};

export default async function Home(){
    const {userId} = await auth()
    const client = await clerkClient()
    if(userId){
        const status = client.users.getUser(userId)
        if((await status).publicMetadata.role === "RECRUITER")
            redirect("/recruiter/manageJob")
        else 
            redirect("/user")
    }
    redirect("/user")
}