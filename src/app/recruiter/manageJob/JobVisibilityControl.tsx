"use client"

import { useState } from "react"
import { JobVisibility } from "../actions/actions";

type JobVisibilityControlProps = {
    isVisible: boolean,
    postId: string
}
export default function JobVisibilityControl({isVisible, postId}: JobVisibilityControlProps) {
    const [visible, setVisible] = useState<boolean>(isVisible);
    const handleCheckBox = () =>{
        const visibility = !visible
        setVisible((prev) => !prev)
        JobVisibility({visibility,postId})
    }
    return <div>
        <input type="checkBox" checked={visible} onChange={handleCheckBox} className="h-4 w-4 cursor-pointer accent-green-600"/>
    </div>
}