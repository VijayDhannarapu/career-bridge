import { UpdateStatus } from "../actions/actions"
import { status } from "./page"
export default function JobStatus({postId,userId,defaultStatus}: {postId: string, userId: string, defaultStatus: string}) {
    return <div>
        <form action={UpdateStatus}>
            <input type="hidden" name="postId" value={postId} />
            <input type="hidden" name="userId" value={userId} />
            <select name="status" id="status" defaultValue={defaultStatus}
                className="border border-gray-400 p-1 rounded-md outline-0"
            >
                {
                    status.map((st, index) => (
                        <option key={index} value={st}>{st.toLocaleLowerCase()}</option>
                    ))
                }
            </select>
            <button type="submit" className="border-2 p-1 text-white bg-blue-700 rounded-md hover:bg-blue-800">Update</button>
        </form>
    </div>
}