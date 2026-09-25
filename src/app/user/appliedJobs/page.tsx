import GetAppliedJobs from "../action/action"
import Link from "next/link"
export default async function AppliedJobs(){
    const applications = await GetAppliedJobs({userId: "123userId"})
    return <div className=" mt-6 mx-auto w-full max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-xl">
        <table className="w-full border-collapse text-left text-sm ">
            <thead className=" bg-violet-500/50 text-xl">
                <tr>
                    <th className="px-4 py-3 font-bold">S.No</th>
                    <th className="px-4 py-3 font-bold">Job Title</th>
                    <th className="px-4 py-3 font-bold">Location</th>
                    <th className="px-4 py-3 font-bold">Applied At</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                </tr>
            </thead>
            {
                applications.map((job, index) => (
                    <tbody key={index}>
                        <tr className="border-t border-gray-300 hover:bg-gray-50">
                            <td className="px-4 py-3">{index+1}</td>
                            <td className="px-4 py-3"><Link href={`/user/jobDetails/${job.postId}`}>{job.postJob.title} </Link></td>
                            <td className="px-4 py-3">{job.postJob.location}</td>
                            <td className="px-4 py-3">{job.postJob.posted.toDateString()}</td>
                            <td className={`px-4 py-3 font-semibold ${job.status === "ACCEPTED"?"text-green-600": job.status === "REJECTED" ? "text-red-500"  : "text-orange-400"}`}>{job.status}</td>
                        </tr>
                    </tbody>
                ))
            }
        </table>
    </div>
}