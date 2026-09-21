import { GetJobs } from "@/app/components/actions/action"
import { prisma } from "@/lib/prisma"
import EditForm from "./editForm"

type EditProps = {
    searchParams: Promise<{id: string}> 
}
export default async function EditJob({searchParams}: EditProps){
    const postId = (await searchParams).id
    const job = await prisma.postJob.findUnique({
        where: {postId}
    })
    return <EditForm job={job}/>
}