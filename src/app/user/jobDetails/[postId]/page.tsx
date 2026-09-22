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

    return <div className="mt-6 w-full h-auto px-6">
        <div className="mx-auto w-full h-full min-h-[300px] max-w-7xl border border-violet-500 bg-violet-300/30 m-auto rounded-md p-4 flex items-center justify-evenly">
            <div className="flex gap-5 items-center  flex-wrap">
                <div className="w-[100px] h-[100px] bg-white flex items-center justify-center rounded-md shadow-2xl p-2">
                    {/* <img src="/images/Google.png" alt="" /> */}
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm ring-2 ring-white shadow-sm cursor-pointer">
                        {details.recruiter.officeName.charAt(0)}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-semibold">{details.title}</h1>
                    <div className="flex gap-5 mt-3 flex-wrap">
                        {/* <p className="text-gray-700"><FontAwesomeIcon icon={faBriefcase} /> {details.officeName}</p> */}
                        <p className="text-gray-700"><FontAwesomeIcon icon={faLocationDot} /> {details.location}</p>
                        <p className="text-gray-700"><FontAwesomeIcon icon={faUser} /> {details.level}</p>
                        <p className="text-gray-700"><FontAwesomeIcon icon={faMoneyCheckDollar} /> CTC: {details.ctc}</p>
                    </div>
                </div>
            </div>
            <div>
                <ApplyButton postId={pid} userId="123userId" />
            </div>

        </div>

        <div className="mt-6 mx-auto w-full  h-full max-w-7xl p-4 rounded-md">
            <div
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details.description) }}
            />

        </div>
    </div>
}