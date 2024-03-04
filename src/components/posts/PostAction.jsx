import { useState } from "react"
import commentIcon from "../../assets/icons/comment.svg"
import likeFillIcon from "../../assets/icons/likeFill.svg"
import shareIcon from "../../assets/icons/share.svg"
import { useAuth } from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios"

export const PostAction = ({ post, commentCount }) => {
    const { auth } = useAuth()
    const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
    const { api } = useAxios();

    const handleLike = async () => {
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`);
            if (response.status === 200) {
                setLiked(true)
            }
        } catch (error) {
            console.log(error);
            setLiked(false);
        }
    }
    return (
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
            <button
                className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
                onClick={handleLike}
            >
                <img className="w-6" src={liked ? likeFillIcon : likeFillIcon} alt="Like" />
                {!liked && <span>Like</span>}
            </button>
            <button
                className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm"
            >
                <img src={commentIcon} alt="Comment" />
                <span>Comment({commentCount ?? 0})</span>
            </button>
            <button
                className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
            >
                <img src={shareIcon} alt="Share" />
                <span>Share</span>
            </button>
        </div>
    )
}
