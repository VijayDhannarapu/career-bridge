import Link from "next/link"
import { GetJobs } from "./actions/action"
import ApplyButton from "./ApplyBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
type Prop = {
    query?: string,
    page?: string
}
export default async function JobListing({ query, page }: Prop) {
    const pageNo = isNaN(Number(page)) ? 0 : Number(page)
    const jobs = await GetJobs({ query, page })
    if (jobs.length === 0) {
        return <div>
            <h1>No Jobs</h1>
            <div className="mt-3 flex gap-5">
                <Link href={`/user?page=${pageNo <= 0 ? 1 : pageNo - 1}`} className="p-2 rounded-md border border-gray-500"> <FontAwesomeIcon icon={faChevronLeft} /></Link>
                <Link href={`/user?page=${pageNo + 1}`} className="p-2 rounded-md border border-gray-500"><FontAwesomeIcon icon={faChevronRight} /></Link>
            </div>
        </div>
    }
    return <div className="mt-6 px-6 flex flex-col items-center">
        <div className="flex flex-wrap max-w-7xl m-auto items-center justify-center  rounded-md p-2 gap-5">
            {
                jobs.map((job) => (
                    <div key={job.postId} className="w-[350px] h-[320px] shadow-xl/20 shadow-gray-500 rounded-md border border-gray-300 p-3">
                        <h1 className="text-3xl font-semibold mt-5">{job.title}</h1>
                        <div className="flex gap-4 mt-5">
                            <p className="p-1 text-center border border-violet-500 bg-violet-300/40 ">{job.location}</p>
                            <p className="text-center p-1 border border-blue-500 bg-blue-300/40">{job.level}</p>
                        </div>

                        <p className="mt-5 text-[15px] text-gray-500">{job.description.replace(/<[^>]*>/g, "").slice(0, 150) + "..."} .</p>
                        <div className="flex gap-5 mt-5">
                            <ApplyButton postId={job.postId} />
                            <Link href={`/user/jobDetails/${job.postId}`} className="border-2 border-gray-400 text-gray-600 p-2 rounded-md hover:bg-gray-100/80">Learn More</Link>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="mt-3 flex gap-5 mb-6">
            <Link href={`/user?page=${pageNo <= 0 ? 1 : pageNo - 1}`} className={`p-2 rounded-md border border-gray-500 ${pageNo < 1 ? "cursor-not-allowed" : ""} `}> <FontAwesomeIcon icon={faChevronLeft} /></Link>
            <Link href={`/user?page=${pageNo? pageNo + 1 : 2}`} className="p-2 rounded-md border border-gray-500"><FontAwesomeIcon icon={faChevronRight} /></Link>
        </div>
    </div>
}