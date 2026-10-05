import { prisma } from "@/lib/prisma"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faLocation, faLocationDot, faMoneyBill, faMoneyBill1, faMoneyCheck, faMoneyCheckDollar, faUser } from "@fortawesome/free-solid-svg-icons"

import DOMPurify from "isomorphic-dompurify"
import ApplyButton from "@/app/components/ApplyBtn"
type Porp = {
    params: Promise<{ postId: string }>
}

export default async function detailsDetails({ params }: Porp) {
    const pid = (await params).postId
    const details = await prisma.postJob.findUnique({
        where: {
            postId: pid
        },
        include: {
            recruiter: true
        }
    })
    if (!details)
        throw new Error(`Requested job ${pid} Not Found`)

    return <div className="mt-6 w-full px-4 sm:px-6">
        <div className="mx-auto w-full max-w-7xl min-h-[250px] rounded-2xl border border-[#DCEBFA] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(37,99,235,0.04)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 h-full">

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 min-w-0">
                    <div className="w-[90px] h-[90px] shrink-0 bg-[#F0F7FF] border border-[#DCEBFA] flex items-center justify-center rounded-xl p-2">
                        {details.recruiter.imgUrl
                            ? <img src={details.recruiter.imgUrl} alt="logo" className="w-full h-full object-contain rounded-lg" />
                            : <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-lg ring-2 ring-white shadow-sm cursor-pointer">
                                {details.recruiter.officeName.charAt(0)}
                            </div>
                        }
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#102A43] leading-tight">
                            {details.title}
                        </h1>

                        <div className="flex flex-wrap gap-x-5 gap-y-3 mt-4">
                            <p className="text-sm text-[#627D98] flex items-center gap-2">
                                <FontAwesomeIcon icon={faBriefcase} className="text-blue-600" />
                                {details.recruiter.officeName}
                            </p>

                            <p className="text-sm text-[#627D98] flex items-center gap-2">
                                <FontAwesomeIcon icon={faLocationDot} className="text-blue-600" />
                                {details.location}
                            </p>

                            <p className="text-sm text-[#627D98] flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                                {details.level}
                            </p>

                            <p className="text-sm text-[#627D98] flex items-center gap-2">
                                <FontAwesomeIcon icon={faMoneyCheckDollar} className="text-blue-600" />
                                CTC: {details.ctc}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="shrink-0">
                    <ApplyButton postId={pid} />
                </div>
            </div>
        </div>

        <div className="mt-6 mx-auto w-full max-w-7xl rounded-2xl border border-[#DCEBFA] bg-white p-5 sm:p-8 shadow-[0_2px_12px_rgba(37,99,235,0.04)]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] mb-5">
                Job Description
            </h2>

            <div
                className="rich-content text-[#486581] leading-7"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details.description) }}
            />
        </div>
    </div>


}