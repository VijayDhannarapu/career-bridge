import UserProfile from "@/app/components/userProfile"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
export default async function Profile() {
    const { userId: clerkId } = await auth()
    if (!clerkId)
        redirect("/")
    const user = await prisma.user.findUnique({ where: { clerkId } })
    return <div className="mx-auto mt-6 mb-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    My Profile
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your personal information and account details.
                </p>
            </div>

            <Link href={"/user/onboarding"}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5
                 text-sm font-semibold text-white shadow-sm transition
                 hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-offset-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 2.651 2.651M4 20l4.5-1 11.01-11.01a1.875 1.875 0 0 0-2.65-2.65L5.85 16.35 4 20Z"
                    />
                </svg>
                Edit Profile
            </Link>
        </div>
        <div>
            <UserProfile user={user!} />
        </div>
        <div className="mt-5">
            {
            user?.resumeUrl &&
            <a
                href={user.resumeUrl}
                target="_blank"
                className="rounded-lg bg-[#1049e5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >Open Resume</a>
        }
        </div>
    </div>
}