import { prisma } from "@/lib/prisma"
import EditForm from "./editForm"
import { title } from "process"

type EditProps = {
    searchParams: Promise<{id: string}> 
}
export const metadata = {
    title: "Edit Job"
}
export default async function EditJob({searchParams}: EditProps){
    const postId = (await searchParams).id
    const job = await prisma.postJob.findUnique({
        where: {postId}
    })
    return <EditForm job={job}/>
}