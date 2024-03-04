import { PostCard } from "./PostCard"


export const PostList = ({ posts }) => {
    return (
        !!posts && posts.map(post => (
            <PostCard key={post.id} post={post} />
        ))
    )
}
