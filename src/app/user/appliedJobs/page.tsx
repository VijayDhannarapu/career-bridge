import { currentUser } from "@clerk/nextjs/server"
import GetAppliedJobs from "../action/action"
import Link from "next/link"
import WithdrawButton from "./Withdraw"
export default async function AppliedJobs() {
    const authObj = await currentUser()

    if (!authObj)
        return <h1>No User Found</h1>
    const applications = await GetAppliedJobs({ clerkId: authObj.id })

    if (!applications || applications.length <= 0)
        return (
            <div className="flex flex-col items-center justify-center mt-16 text-center">
                <h1 className="text-lg font-semibold text-gray-700">
                    No Applied Jobs
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Jobs you apply to will show up here.
                </p>
            </div>
        )

    return (
        <div className="mt-6 mx-auto w-full max-w-7xl overflow-x-auto rounded-xl border border-gray-300 shadow-md">
            <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-blue-700 border-b-2 border-[#1049e5]">
                    <tr>
                        <th className="px-4 py-4 font-semibold text-white text-[18px]">
                            S.No
                        </th>
                        <th className="px-4 py-4 font-semibold text-white text-[18px]">
                            Job Title
                        </th>
                        <th className="px-4 py-4 font-semibold text-white text-[18px]">
                            Location
                        </th>
                        <th className="px-4 py-4 font-semibold text-white text-[18px]">
                            Applied At
                        </th>
                        <th className="px-4 py-4 font-semibold text-white text-[18px]">
                            Status
                        </th>
                        <th className="px-4 py-4 font-semibold text-white text-[18px]">
                            Withdraw
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-300">
                    {applications.map((job, index) => (
                        <tr
                            key={index}
                            className="transition-colors duration-200 hover:bg-blue-50/40"
                        >
                            <td className="px-4 py-4 text-gray-500">
                                {index + 1}
                            </td>

                            <td className="px-4 py-4">
                                <Link
                                    href={`/user/jobDetails/${job.postId}`}
                                    className="font-medium text-gray-800 transition-colors hover:text-[#1049e5] hover:underline"
                                >
                                    {job.postJob.title}
                                </Link>
                            </td>

                            <td className="px-4 py-4 text-gray-600">
                                {job.postJob.location}
                            </td>

                            <td className="px-4 py-4 text-gray-600">
                                {job.postJob.posted.toDateString()}
                            </td>

                            <td className="px-4 py-4">
                                <span
                                    className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${job.status === "ACCEPTED"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : job.status === "REJECTED"
                                            ? "bg-red-50 text-red-600 border-red-200"
                                            : "bg-orange-50 text-[#d2842c] border-orange-200"
                                        }`}
                                >
                                    {job.status}
                                </span>
                            </td>
                            <td>
                                <WithdrawButton postId={job.postId}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}