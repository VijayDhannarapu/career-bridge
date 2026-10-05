"use client"

import { useActionState, useEffect } from "react"
import { initialState } from "./utility"
import { ApplyJob } from "./actions/action"
import { toast, ToastContainer } from "react-toastify"
import { RedirectToSignIn, SignInButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"
type ButtonProps = {
    postId: string
}

export default function ApplyButton({ postId }: ButtonProps) {
    const [state, formAction] = useActionState(ApplyJob, initialState)
    useEffect(() => {
        if (!state.message) return
        if (state.success)
            toast.success(state.message)
        else
            toast.error(state.message)

    }, [state])
    if(state.message === "Uploade Resume")
        redirect("/user/onboarding")
    return <form action={formAction}>
        <input type="hidden" name="postId" value={postId} />
        <button type="submit" className="border-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 ">Apply Now</button>
        <ToastContainer />
        {
            state.message === "User Not Found" && <RedirectToSignIn />
        }
    </form>
}