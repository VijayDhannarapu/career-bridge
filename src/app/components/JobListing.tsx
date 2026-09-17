import Link from "next/link"
import { GetJobs } from "./actions/action"
type Prop = {
    query?: string
}
export default async function JobListing({ query }: Prop) {
    const jobs = await GetJobs({ query })
    if (jobs.length === 0) {
        return <h1>No Jobs</h1>
    }
    return <div className="mt-6 px-6">

        <div className="flex flex-wrap max-w-7xl m-auto items-center justify-center  rounded-md p-2 gap-5">
            {
                jobs.map((job) => (
                    <div key={job.postId} className="w-[350px] h-[350px] shadow-xl/20 shadow-gray-500 rounded-md border border-gray-300 p-3">
                        <h1 className="text-3xl font-semibold mt-5">{job.title}</h1>
                        <div className="flex gap-4 mt-5">
                            <p className="p-1 text-center border border-violet-500 bg-violet-300/40 ">{job.location}</p>
                            <p className="text-center p-1 border border-blue-500 bg-blue-300/40">{job.level}</p>
                        </div>
                        <p className="mt-5 text-[15px] text-gray-500">{job.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nobis commodi praesentium consectetur sit placeat vitae ullam expedita, quasi omnis.</p>
                        <div className="flex gap-5 mt-5">
                            <button className="border-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800">Apply Now</button>
                            <Link href={`/user/jobDetails/${job.postId}`} className="border-2 border-gray-400 text-gray-600 p-2 rounded-md hover:bg-gray-100/80">Learn More</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>

}