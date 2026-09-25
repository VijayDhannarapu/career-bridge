import { Status } from "@/generated/enums"
import { GetApplications, UpdateStatus } from "../actions/actions"
export default async function JobApplications() {
    const status = ["PENDING", "ACCEPTED", "REJECTED"]
    const applications = await GetApplications({ recId: "123recid" })
    return <div className="mt-6 mx-auto w-full max-w-7xl overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-xl">
        <table className="w-full border-collapse text-left text-sm ">
            <thead className=" bg-violet-500/50 text-xl">
                <tr>
                    <th className="px-4 py-3 font-bold">S.No</th>
                    <th className="px-4 py-3 font-bold">User</th>
                    <th className="px-4 py-3 font-bold">Job Title</th>
                    <th className="px-4 py-3 font-bold">Location</th>
                    <th className="px-4 py-3 font-bold">Action</th>
                </tr>
            </thead>
            {
                applications.map((job, index) => (
                    <tbody key={index}>
                        <tr className="border-t border-gray-300 hover:bg-gray-50">
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3">{job.user.name}</td>
                            <td className="px-4 py-3">{job.postJob.title}</td>
                            <td className="px-4 py-3">{job.postJob.location}</td>
                            <td className="px-4 py-3" >
                                <form action={UpdateStatus}>
                                    <input type="hidden" name="postId" value={job.postId} />
                                    <input type="hidden" name="userId" value={job.userId} />

                                    <select name="status" id="status" defaultValue={job.status}
                                        className="border border-gray-400 p-1 rounded-md outline-0"
                                    >
                                        {
                                            status.map((st, index) => (
                                                <option key={index} value={st}>{st.toLocaleLowerCase()}</option>
                                            ))
                                        }
                                    </select>
                                    <button type="submit" className="border-2 p-1 text-white bg-blue-700 rounded-md hover:bg-blue-800">Update</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                ))
            }
        </table>
    </div>
}