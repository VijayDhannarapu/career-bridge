import RichTextEditor from "@/app/components/recruiter/RichTextEditor";
import Link from "next/link";
export default function AddJob() {
    return <div>
        <form action="">
            <RichTextEditor />
            <button type="submit" className="border-2 p-2 text-white bg-blue-700 rounded-md hover:bg-blue-800">Post Job</button>
        </form>
    </div>
} 