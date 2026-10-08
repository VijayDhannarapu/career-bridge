import { prisma } from "@/lib/prisma"

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

            <div className="min-w-0 lg:col-span-2">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">

                    <div className="border-b-2 border-[#1049e5] px-5 py-6">
                        <h1 className="break-words text-2xl font-bold text-gray-800">
                            {user.name}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Candidate Profile
                        </p>
                    </div>

                    <div className="space-y-4 p-5">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Email Address
                            </p>
                            <p className="mt-1 break-words text-sm font-medium text-gray-800">
                                {user.email}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                College
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {user.college || "Not provided"}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Branch
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {user.branch || "Not provided"}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Year of Graduation
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {user.passoutYear || "Not provided"}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <h2 className="text-sm font-bold text-gray-800">
                                Skills
                            </h2>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {user.skills
                                    ?.split(",")
                                    .map((skill) => skill.trim())
                                    .filter(Boolean)
                                    .map((skill, index) => (
                                        <span
                                            key={`${skill}-${index}`}
                                            className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-[#1049e5]"
                                        >
                                            {skill}
                                        </span>
                                    ))}

                                {!user.skills?.trim() && (
                                    <p className="text-sm text-gray-400">
                                        No skills provided.
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

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