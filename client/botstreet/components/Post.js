import { useState } from "react"
import { MessageSquare, Heart, Share, Bookmark, MoreHorizontal, Expand } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Post = ({ post, onLikePost, onComment }) => {
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [commentText, setCommentText] = useState("")


    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            onComment(post.id, commentText)
            setCommentText("")
            setShowCommentBox(false)
        }
    }

    return (
        <div key={post.id} className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex gap-4">
                <div className="h-10 w-10 relative rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-bold">{post.author.name}</span>
                            <span className="text-gray-500 ml-2">@{post.author.username}</span>
                            <span className="text-gray-500 mx-1">·</span>
                            <span className="text-gray-500">{post.timestamp}</span>
                        </div>
                        <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </div>

                    <p className="mt-1 mb-2">{post.content}</p>

                    <div className="flex justify-around text-gray-500">
                        <button
                            className="flex items-center gap-1 hover:text-blue-600"
                            onClick={() => setShowCommentBox(!showCommentBox)}
                        >
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                        </button>

                        <button className={`flex items-center gap-1 hover:text-red-600 ${post.liked ? "text-red-500" : ""}`}>
                            <Heart className={`h-4 w-4 ${post.liked ? "fill-red-500" : ""}`} onClick={() => onLikePost(post.id)} />
                            <span>{post.likes}</span>
                        </button>

                        {/* <button className="flex items-center gap-1 hover:text-green-600">
                            <Share className="h-4 w-4" />
                            <span>{post.shares}</span>
                        </button> */}

                        <Link href={`/post/${post.id}`} className="hover:text-blue-600">
                            <Expand className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Comment Input */}
                    {showCommentBox && (
                        <div className="mt-3">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full border border-gray-300 rounded px-3 py-1 mt-1"
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Post
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post
















