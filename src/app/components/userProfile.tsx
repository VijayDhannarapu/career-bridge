import { Role } from "@/generated/enums";
import { redirect } from "next/navigation";
export type UserProp = {
    email: string;
    name: string;
    userId: string;
    clerkId: string;
    role: Role;
    college: string | null;
    branch: string | null;
    startYear: number | null;
    passoutYear: number | null;
    phone: string | null;
    skills: string | null;
    resumeUrl: string | null;
} ;


export default function UserProfile({ user}: { user: UserProp}) {
    if(!user?.name)
        redirect("/user/onboarding");

    return <div className="min-w-0 lg:col-span-2">
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
                        Phone
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                        {user.phone}
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
}