import { useState } from "react";
import { actions } from "../../actions/Index";
import threeDots from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import timeIcon from "../../assets/icons/time.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { getDateDifference } from "../../utils";

export const PostHeader = ({ post }) => {
    const avatarUrl = useAvatar(post);
    const [showAction, setShowAction] = useState(false)
    const { auth } = useAuth();
    const { api } = useAxios();
    const { dispatch } = usePost();
    const toggleAction = () => {
        setShowAction(!showAction)
    }
    const handleDeletePost = async () => {
        dispatch({ type: actions.post.DATA_FETCHING })
        try {
            const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`);
            if (response.status === 200) {
                dispatch({
                    type: actions.post.POST_DELETED,
                    data: post.id
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: actions.post.DATA_FETCH_ERROR, error: response.error })
        }
    }
    const isMe = post?.author?.id == auth?.user?.id
    return (
        <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={avatarUrl}
                    alt="avatar"
                />
                <div>
                    <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
                    <div className="flex items-center gap-1.5">
                        <img src={timeIcon} alt="time" />
                        <span className="text-sm text-gray-400 lg:text-base"
                        >{`${getDateDifference(post?.createAt)}`} ago</span
                        >
                    </div>
                </div>
            </div>

            <div className="relative">
                {isMe && <button onClick={toggleAction}>
                    <img src={threeDots} alt="3dots of Action" />
                </button>}


                {showAction && (
                    <div className="action-modal-container">
                        <button className="action-menu-item hover:text-lwsGreen">
                            <img src={editIcon} alt="Edit" />
                            Edit
                        </button>
                        <button className="action-menu-item hover:text-red-500"
                            onClick={handleDeletePost}
                        >
                            <img src={deleteIcon} alt="Delete" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
