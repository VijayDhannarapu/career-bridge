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
       if(state.success){
        toast.success(state.message)
        setFormKey((k) => k+1)
       }
       else{
        toast.error(state.message)
       }
    }, [state])
    
    return <div>
        <form action={formAction} className="mt-6 w-full p-4 flex flex-col gap-5 items-start">
            <input type="hidden" value="123recid" name="recId" />
            <label htmlFor="title"> Job Title <span className="text-red-500">*</span></label>
            <input type="text" id="title" name="title" placeholder="Type here" required />

            <p>Job Description <span className="text-red-500">*</span></p>
            <RichTextEditor key={formKey} name="description" />
            <div className="flex gap-5">
                <div className="selectOption">
                    <label htmlFor="jobCategory">Job Category <span className="text-red-500">*</span></label>
                    <select name="jobCategory" id="jobCategory" >
                        {
                            JOB_CATEGORIES.map((jobCategory, index) => (
                                <option key={index} value={jobCategory}>{jobCategory}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="selectOption">
                    <label htmlFor="jobLocation">Job Location <span className="text-red-500">*</span></label>
                    <select name="jobLocation" id="jobLocation">
                        {
                            JOB_LOCATIONS.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="selectOption">
                    <label htmlFor="jobLevel">Job Location <span className="text-red-500">*</span></label>
                    <select name="jobLevel" id="jobLevel">
                        {
                            JOB_LEVEL.map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <label htmlFor="jobSalary">Job Salary <span className="text-red-500">*</span></label>
            <input type="number" name="jobSalary" id="jobSalary" placeholder="12000" required />
            <SubmitButton />
            <ToastContainer />
        </form>
    </div>
} 