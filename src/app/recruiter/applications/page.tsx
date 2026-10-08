import { Status } from "@/generated/enums"
import { GetApplications, UpdateStatus } from "../actions/actions"
import Link from "next/link"
import JobStatus from "./JobStatus"

export const status = ["PENDING", "ACCEPTED", "REJECTED"]
export default async function JobApplications() {
    const applications = await GetApplications()
    return <div className="mt-6 mx-auto w-full max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-xl">
        <table className="w-full border-collapse text-left text-sm ">
            <thead className=" bg-blue-700 text-xl text-white">
                <tr>
                    <th className="px-4 py-3 font-bold">S.No</th>
                    <th className="px-4 py-3 font-bold">User</th>
                    <th className="px-4 py-3 font-bold">Job Title</th>
                    <th className="px-4 py-3 font-bold">Location</th>
                    <th className="px-4 py-3 font-bold">Resume</th>
                    <th className="px-4 py-3 font-bold">Action</th>
                </tr>
            </thead>
            {
                applications.map((job, index) => (
                    <tbody key={index}>
                        <tr className="border-t border-gray-300 hover:bg-gray-50">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">
                                <Link href={`/recruiter/applications/${job.userId}`}
                                    className="hover:text-blue-700 hover:underline">{job.user.name}
                                </Link>
                            </td>
                            <td className="px-4 py-3">{job.postJob.title}</td>
                            <td className="px-4 py-3">{job.postJob.location}</td>
                            <td className="px-4 py-3">
                                <a
                                    href={job.user.resumeUrl ?? ""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {job.user.resumeUrl?.split("/").slice(job.user.resumeUrl?.split("/").length - 1)}
                                </a>
                            </td>
                            <td className="px-4 py-3" >
                                <JobStatus postId={job.postId} userId={job.userId} defaultStatus={job.status} />
                            </td>
                        </tr>
                    </tbody>
                ))
            }
            {
                applications.length == 0 &&
                <tbody>
                    <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-500">
                            Yet No Applications
                        </td>
                    </tr>
                </tbody>
            }
        </table>
    </div>
}