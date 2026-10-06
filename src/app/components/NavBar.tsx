"use client"
import { SignInButton } from "@clerk/nextjs";
import { Show, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link"
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function NavBar() {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

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
                            href={"/"}
                            className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${pathName === "/user"
                                    ? 'text-blue-600 bg-blue-50 border-blue-100'
                                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/user/appliedJobs"}
                            className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${pathName.endsWith("/appliedJobs")
                                    ? 'text-blue-600 bg-blue-50 border-blue-100'
                                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            Applied Jobs
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/"}
                            className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${pathName.endsWith("/browsecompanies")
                                    ? 'text-blue-600 bg-blue-50 border-blue-100'
                                    : 'text-gray-600 border-transparent hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            Browse Companies
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/user/onboarding"}
                            className={`px-4 py-2.5 rounded-lg transition-all duration-200 border ${pathName.endsWith("/onboarding")
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
                <div className="hidden md:flex items-center gap-3">

                    <Show when={"signed-out"}>

                        <SignInButton
                            mode="modal"
                            forceRedirectUrl={"/recruiter/onboarding"}
                        >
                            <button className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200">
                                For Recruiters
                            </button>
                        </SignInButton>

                        <SignInButton
                            mode="modal"
                            forceRedirectUrl={"/user/onboarding"}
                        >
                            <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200">
                                Log In
                            </button>
                        </SignInButton>

                        <SignInButton
                            mode="modal"
                            forceRedirectUrl={"/user/onboarding"}
                        >
                            <button className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 bg-white text-sm font-medium hover:bg-blue-50 transition-all duration-200">
                                Sign Up
                            </button>
                        </SignInButton>

                    </Show>

                    <Show when={"signed-in"}>
                        <div className="pl-3 border-l border-gray-200">
                            <UserButton />
                        </div>
                    </Show>
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
                    <a
                        href="/"
                        className="flex items-center px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                        Home
                    </a>
                </li>

                <li>
                    <Link
                        href="/user/appliedJobs"
                        className="flex items-center px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                        Applied Jobs
                    </Link>
                </li>

                <li>
                    <a
                        href="/applied-jobs"
                        className="flex items-center px-4 py-3 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                        Browse Companies
                    </a>
                </li>

                <li>
                    <Link
                        href={"/user/onboarding"}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${pathName === "/user"
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                    >
                        Profile
                    </Link>
                </li>

                <li className="flex flex-wrap items-center gap-3 px-4 py-4 mt-2 border-t border-gray-100">

                    <Show when={"signed-out"}>
                        <SignInButton
                            mode="modal"
                            forceRedirectUrl={"/recruiter/onboarding"}
                        >
                            <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                For Recruiters
                            </button>
                        </SignInButton>
                        <SignInButton
                            mode="modal"
                            forceRedirectUrl={"/user/onboarding"}
                        >
                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                Log In
                            </button>
                        </SignInButton>
                        <SignUpButton
                            mode="modal"
                            forceRedirectUrl={"/user/onboarding"}
                        >
                            <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </Show>
                    <Show when={"signed-in"}>
                        <UserButton />
                    </Show>
                </li>
            </ul>
        </div>
    </nav>
}


