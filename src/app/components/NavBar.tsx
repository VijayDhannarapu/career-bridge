"use client"
import { SignInButton } from "@clerk/nextjs";
import { Show, SignOutButton, UserButton } from "@clerk/react";
import Link from "next/link"
import { useState } from "react";
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return <nav className="flex items-center justify-around px-4 py-2 bg-white border-b border-gray-100 shadow-sm">
        {/* Logo / Branding */}
        <div className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt="" className="w-12 h-12 border rounded-b" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">JobPortal</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <li>
                <Link href={"/"} className="hover:text-blue-600 transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">Home</Link>
            </li>
            <li>
                <Link href={"/user/appliedJobs"} className="hover:text-blue-600  transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">Applied Jobs</Link>
            </li>
            <li>
                <Link href={"/"} className="hover:text-blue-600  transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">Browse Companies</Link>
            </li>
        </ul>
        {/* only for medium devices */}
        <div className="md:hidden flex items-center">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
        </div>
        <div className={`
    md:hidden fixed top-[100px] left-0 w-full bg-white border-b border-gray-200 shadow-lg
    transition-all duration-300 ease-in-out 
    ${isOpen ? 'max-h-64 opacity-100 scale-y-100 visible' : 'max-h-0 opacity-0 scale-y-95 invisible'}
  `}>
            <ul className="flex flex-col px-6 py-4 gap-4 font-medium text-gray-600">
                <li>
                    <a href="/" className="block py-2 hover:text-blue-600 border-b border-gray-50">Home</a>
                </li>
                <li>
                    <Link href="/user/appliedJobs" className="block py-2 hover:text-blue-600 border-b border-gray-50">Applied Jobs</Link>
                </li>
                <li>
                    <a href="/applied-jobs" className="block py-2 hover:text-blue-600 border-b border-gray-50">Browse Companies</a>
                </li>
                <li className="flex items-center gap-3 pt-2">
                    <Show when={"signed-out"} >
                        {/* <SignInButton mode="modal" />      */}
                        <SignInButton mode="modal" forceRedirectUrl={"recruiter/addJob"}>
                            <button>For Recruiters</button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <button className="border border-blue-600 p-1 rounded-md bg-blue-600 text-white">Log In</button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <button className="border border-blue-600 p-1 rounded-md bg-blue-600 text-white">Sign Up</button>
                        </SignInButton>
                    </Show>
                    <Show when={"signed-in"}>
                        <UserButton />
                    </Show>
                </li>
            </ul>
        </div>

        {/* User Profile / Actions Area */}
        <div className="hidden md:flex items-center gap-5">
            <Show when={"signed-out"} >
                {/* <SignInButton mode="modal" />      */}
                <SignInButton mode="modal" forceRedirectUrl={"recruiter/addJob"}>
                    <button>For Recruiters</button>
                </SignInButton>
                <SignInButton mode="modal">
                    <button className="border border-blue-600 p-1 rounded-md bg-blue-600 text-white">Log In</button>
                </SignInButton>
                <SignInButton mode="modal">
                    <button className="border border-blue-600 p-1 rounded-md bg-blue-600 text-white">Sign Up</button>
                </SignInButton>
            </Show>
            <Show when={"signed-in"}>
                <UserButton />
            </Show>
        </div>
    </nav>

}