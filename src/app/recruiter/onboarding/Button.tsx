"use client"

import { useFormStatus } from "react-dom"

export default function ContinueButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
            {pending ? "Saving..." : "Continue"}
        </button>
    )
}