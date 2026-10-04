import { prisma } from "@/lib/prisma";
import { createUser } from "../action/action";
import ContinueButton from "@/app/recruiter/onboarding/Button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export default async function OnBoarding() {
    const { userId: clerkId } = await auth()
    if (!clerkId)
        redirect("/")
    const user = await prisma.user.findUnique({ where: { clerkId } });


    return <div className="w-full max-w-md mx-auto mt-12 mb-12 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
            Complete your profile
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            A few details to help recruiters know you better.
        </p>

        <form action={createUser} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <label htmlFor="college" className="text-sm font-medium text-gray-700">
                    College Name
                </label>
                <input
                    type="text"
                    id="college"
                    name="college"
                    placeholder="e.g. GITAM University"
                    defaultValue={user?.college ?? ""}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="branch" className="text-sm font-medium text-gray-700">
                    Branch / Degree
                </label>
                <input
                    type="text"
                    id="branch"
                    name="branch"
                    placeholder="e.g. B.Tech Computer Science"
                    defaultValue={user?.branch ?? ""}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label htmlFor="startYear" className="text-sm font-medium text-gray-700">
                        Start Year
                    </label>
                    <input
                        type="number"
                        id="startYear"
                        name="startYear"
                        placeholder="2021"
                        defaultValue={user?.startYear ?? ""}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <label htmlFor="passoutYear" className="text-sm font-medium text-gray-700">
                        Passing Out Year
                    </label>
                    <input
                        type="number"
                        id="passoutYear"
                        name="passoutYear"
                        placeholder="2025"
                        defaultValue={user?.passoutYear ?? ""}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    defaultValue={user?.phone ?? ""}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="skills" className="text-sm font-medium text-gray-700">
                    Skills
                </label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    placeholder="e.g. React, Node.js, SQL"
                    defaultValue={user?.skills ?? ""}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                <span className="text-xs text-gray-400">Separate skills with commas</span>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="resume" className="text-sm font-medium text-gray-700">
                    Resume (PDF)
                </label>

                {user?.resumeUrl && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                        <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L14 2.586A2 2 0 0012.586 2H4z" />
                        </svg>
                        <a
                            href={user.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline truncate"
                        >
                            View current resume
                        </a>
                    </div>
                )}

                <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept="application/pdf"
                    className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                <span className="text-xs text-gray-400">
                    {user?.resumeUrl ? "Upload a new file only if you want to replace your current resume" : "Upload your resume as a PDF"}
                </span>
            </div>
            <ContinueButton />
        </form>
    </div>
}