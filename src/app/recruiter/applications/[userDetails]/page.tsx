import { prisma } from "@/lib/prisma"
import UserProfile from "../../../components/userProfile"

type UserDetailsProps = {
    params: Promise<{ userDetails: string }>
}

export default async function UserDetails({ params }: UserDetailsProps) {
    const userId = (await params).userDetails
    const user = await prisma.user.findUnique({
        where: { userId }
    })

    if (!user)
        return <h1>No User Found</h1>

    return <div className="mx-auto mt-6 mb-8 w-full max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
            <UserProfile user={user}/>
            <div className="min-w-0 lg:col-span-3">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
                        <h2 className="text-lg font-bold text-gray-800">
                            Candidate Resume
                        </h2>

                        {user.resumeUrl && (
                            <a
                                href={user.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-[#1049e5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                            >
                                Open in New Tab
                            </a>
                        )}
                    </div>

                    {user.resumeUrl ? (
                        <iframe
                            src={user.resumeUrl}
                            title={`${user.name}'s Resume`}
                            className="h-[600px] w-full sm:h-[750px] lg:h-[850px]"
                        />
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
                            <p className="font-semibold text-gray-700">
                                No Resume Available
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                                This candidate has not uploaded a resume.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    </div>
}