"use client"
import { UserButton } from "@clerk/nextjs";
import { Show } from "@clerk/react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function RecruiterNavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    
return <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

            {/* Logo / Branding */}
            <div className="flex items-center gap-3">
                <img
                    src="/images/logo.jpg"
                    alt=""
                    className="w-11 h-11 rounded-lg object-cover border border-gray-200 shadow-sm"
                />
                <span className="font-bold text-xl text-gray-900 tracking-tight">
                    JobPortal
                </span>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-2 font-medium text-gray-600">
                <li>
                    <Link
                        href={"/recruiter/addJob"}
                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${
                            pathName.endsWith("/recruiter/addJob")
                                ? 'text-blue-600 bg-blue-50 border-blue-100'
                                : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                        Add Job
                    </Link>
                </li>

                <li>
                    <Link
                        href={"/recruiter/manageJob"}
                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${
                            pathName.endsWith("/recruiter/manageJob")
                                ? 'text-blue-600 bg-blue-50 border-blue-100'
                                : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                        Manage Jobs
                    </Link>
                </li>

                <li>
                    <Link
                        href={"/recruiter/applications"}
                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${
                            pathName.endsWith("/recruiter/applications")
                                ? 'text-blue-600 bg-blue-50 border-blue-100'
                                : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                        View Applications
                    </Link>
                </li>

                <li>
                    <Link
                        href={"/recruiter/onboarding"}
                        className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${
                            pathName.endsWith("/recruiter/onboarding")
                                ? 'text-blue-600 bg-blue-50 border-blue-100'
                                : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                        Profile
                    </Link>
                </li>
            </ul>

            {/* only for medium devices */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* User Profile / Actions Area */}
            <div className="hidden md:flex items-center gap-5">
                <div className="flex items-center gap-3 pl-5 border-l border-gray-200">
                    <Show when={"signed-in"}>
                        <UserButton />
                    </Show>
                </div>
            </div>
        </div>
    </div>

    {/* Mobile Navigation */}
    <div className={`
        md:hidden fixed top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg
        transition-all duration-300 ease-in-out origin-top
        ${isOpen
            ? 'max-h-96 opacity-100 scale-y-100 visible'
            : 'max-h-0 opacity-0 scale-y-95 invisible'
        }
    `}>
        <ul className="flex flex-col px-5 py-5 gap-2 font-medium text-gray-600">

            <li>
                <Link
                    href={"/recruiter/addJob"}
                    className="flex items-center px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                    Add Job
                </Link>
            </li>

            <li>
                <Link
                    href={"/recruiter/manageJob"}
                    className="flex items-center px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                    Manage Jobs
                </Link>
            </li>

            <li>
                <Link
                    href={"/recruiter/applications"}
                    className="flex items-center px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                    View Applications
                </Link>
            </li>

            <li className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-gray-100">
                <Show when={"signed-in"}>
                    <UserButton />
                </Show>
            </li>

        </ul>
    </div>
</nav>


}