"use client"
import { useTransition } from "react";
import { WithdrawApplication } from "../action/action";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft} from "@fortawesome/free-solid-svg-icons";
export default function WithdrawButton({ postId }: { postId: string }) {
    const [isPending, startTransition] = useTransition();
    const handleWithdrawBtn = () => {
        if (!confirm("Do you want to withdraw.."))
            return
        startTransition(async() =>{
            const result = await WithdrawApplication({postId});
            if(result.success) toast.success(result.message)
            else toast.error(result.message)
        })
    }
    return <div>
        <button onClick={handleWithdrawBtn} disabled={isPending} className="text-red-500"><FontAwesomeIcon icon={faArrowRotateLeft}/></button>
        <ToastContainer />
    </div>
}