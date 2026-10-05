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
    return <div className="mt-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-7xl mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Latest jobs
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Get your desired job from top companies
            </p>
            <div className="w-16 h-1 bg-blue-600 rounded-full mt-4"></div>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
                <div
                    key={job.postId}
                    className="group flex flex-col bg-white min-h-[320px] rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                >
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                            {job.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mt-4">
                            <p className="px-3 py-1.5 text-xs sm:text-sm font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full">
                                {job.location}
                            </p>
                            <p className="px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                                {job.level}
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-gray-500 flex-grow">
                        {job.description.replace(/<[^>]*>/g, "").slice(0, 150) + "..."} .
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                        <ApplyButton postId={job.postId} />
                        <Link
                            href={`/user/jobDetails/${job.postId}`}
                            className="flex-1 text-center border border-gray-300 text-gray-700 font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-10 mb-8 flex items-center gap-3">
            <Link
                href={`/user?page=${pageNo <= 0 ? 1 : pageNo - 1}`}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200 ${pageNo < 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </Link>

            <Link
                href={`/user?page=${pageNo ? pageNo + 1 : 2}`}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </Link>
        </div>
    </div>


}