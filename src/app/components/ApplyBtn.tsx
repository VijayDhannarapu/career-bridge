"use client"

import { useActionState, useEffect } from "react"
import { initialState } from "./utility"
import { ApplyJob } from "./actions/action"
import { toast, ToastContainer } from "react-toastify"
type ButtonProps = {
    postId: string
    userId: string
}

export default function ApplyButton({ postId, userId }: ButtonProps) {
    const [state, formAction] = useActionState(ApplyJob, initialState)
    useEffect(() => {
        if (!state.message) return
        if (state.success)
            toast.success(state.message)
        else
            toast.error(state.message)

    }, [state])

    return <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="postId" value={postId} />
        <button type="submit" className="border-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800">Apply Now</button>
        <ToastContainer />
    </form>
}