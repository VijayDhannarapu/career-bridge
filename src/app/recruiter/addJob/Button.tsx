"use client"

import { useFormStatus } from "react-dom"

export default function SubmitButton(){
    const {pending} = useFormStatus()
    return <button 
        type="submit"
        className="border-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:bg-blue-900 disabled:cursor-not-allowed"
        disabled={pending}>
        {pending?  "Posting..." : "Post Job"} 
    </button>
}