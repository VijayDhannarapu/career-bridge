"use client"
import { PostJob } from "@/app/components/actions/action";
import RichTextEditor from "@/app/components/recruiter/RichTextEditor";
import Link from "next/link";
import SubmitButton from "./Button";
import { useActionState, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export type FormProps = {
    success: boolean
    message: string
    status: number
}

export default function AddJob() {
    const JOB_CATEGORIES = [
        "Software Development",
        "Data Science & Analytics",
        "Design & Creative",
        "Marketing & Sales",
        "Cyber security",
        "Other"
    ]
    const JOB_LOCATIONS = [
        "Hyderabad",
        "Warangal",
        "Bengaluru",
        "Mumbai",
        "Visakhapatnam",
        "Chennai"
    ]
    const JOB_LEVEL = [
        "Beginner level",
        "Intermediate level",
        "Senior level"
    ]
    const initalState: FormProps = {
        success: false,
        message: "",
        status: 0
    }
    const [formKey, setFormKey] = useState(0)
    const [state, formAction, isPending] = useActionState(PostJob, initalState)

    useEffect(() => {
        if (!state.message) return
        if (state.success) {
            toast.success(state.message)
            setFormKey((k) => k + 1)
        }
        else {
            toast.error(state.message)
        }
    }, [state])


    return <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-10 mb-8 sm:mb-10 px-3 sm:px-5 lg:px-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Post a New Job
            </h1>

            <p className="text-sm text-gray-500 mb-6 sm:mb-8">
                Fill in the details below to publish your job listing.
            </p>

            <form action={formAction} className="flex flex-col gap-5 sm:gap-6">

                {/* Job Title */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="title"
                        className="text-sm font-medium text-gray-700"
                    >
                        Job Title <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="e.g. Frontend Developer"
                        required
                        className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* Job Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                        Job Description <span className="text-red-500">*</span>
                    </label>

                    <div className="w-full">
                        <RichTextEditor key={formKey} name="description" />
                    </div>
                </div>

                {/* Category / Location / Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

                    {/* Job Category */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="jobCategory"
                            className="text-sm font-medium text-gray-700"
                        >
                            Job Category <span className="text-red-500">*</span>
                        </label>

                        <select
                            name="jobCategory"
                            id="jobCategory"
                            className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            {JOB_CATEGORIES.map((jobCategory, index) => (
                                <option key={index} value={jobCategory}>
                                    {jobCategory}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Job Location */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="jobLocation"
                            className="text-sm font-medium text-gray-700"
                        >
                            Job Location <span className="text-red-500">*</span>
                        </label>

                        <select
                            name="jobLocation"
                            id="jobLocation"
                            className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            {JOB_LOCATIONS.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Job Level */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="jobLevel"
                            className="text-sm font-medium text-gray-700"
                        >
                            Job Level <span className="text-red-500">*</span>
                        </label>

                        <select
                            name="jobLevel"
                            id="jobLevel"
                            className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            {JOB_LEVEL.map((level, index) => (
                                <option key={index} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                {/* Salary */}
                <div className="flex flex-col gap-1.5 w-full sm:w-3/4 lg:w-3/4">
                    <label
                        htmlFor="jobSalary"
                        className="text-sm font-medium text-gray-700"
                    >
                        Job Salary <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="number"
                        name="jobSalary"
                        id="jobSalary"
                        placeholder="12000"
                        required
                        className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* Submit */}
                <div className="pt-1 sm:pt-2">
                    <SubmitButton name="Post" />
                </div>
                <ToastContainer />
            </form>
        </div>
    </div>

} 