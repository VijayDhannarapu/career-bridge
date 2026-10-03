import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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