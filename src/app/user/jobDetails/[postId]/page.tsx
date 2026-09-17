import { prisma } from "@/lib/prisma"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faLocation, faLocationDot, faMoneyBill, faMoneyBill1, faMoneyCheck, faMoneyCheckDollar, faUser } from "@fortawesome/free-solid-svg-icons"
import { resolve } from "path"

type Porp = {
    params: Promise<{ postId: string }>
}

export default async function detailsDetails({ params }: Porp) {
    const pid = (await params).postId
    const details = await prisma.postJob.findUnique({
        where: {
            postId: pid
        }
    })
    if (!details)
        throw new Error(`Requested job ${pid} Not Found`)

    return <div className="mt-6 w-full h-auto px-6">
        <div className="mx-auto flex w-full h-full min-h-[300px] max-w-7xl border border-violet-500 bg-violet-300/30 m-auto rounded-md p-4 flex items-center justify-evenly">
            <div className="flex gap-5 items-center  flex-wrap">
                <div className="w-[100px] h-[100px] bg-white flex items-center justify-center rounded-md shadow-2xl p-2">
                    {/* <img src="/images/Google.png" alt="" /> */}
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm ring-2 ring-white shadow-sm cursor-pointer">
                        {details.officeName.charAt(0)}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-semibold">{details.title}</h1>
                    <div className="flex gap-5 mt-3 flex-wrap">
                        <p className="text-gray-700"><FontAwesomeIcon icon={faBriefcase} /> {details.officeName}</p>
                        <p className="text-gray-700"><FontAwesomeIcon icon={faLocationDot} /> {details.location}</p>
                        <p className="text-gray-700"><FontAwesomeIcon icon={faUser} /> {details.level}</p>
                        <p className="text-gray-700"><FontAwesomeIcon icon={faMoneyCheckDollar} /> CTC: {details.ctc}K</p>
                    </div>
                </div>
            </div>
            <div>
                <button className="border-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800">Apply Now</button>
            </div>
        </div>


    </div>
}