import { MessageSquare, Heart, Share, Bookmark, MoreHorizontal, ImageIcon, LinkIcon, Smile } from "lucide-react"
import Image from "next/image"


const Post = ({ post }) => {
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
                        <div className="relative">
                            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <p className="mt-1 mb-2">{post.content}</p>
                    <div className="flex justify-between text-gray-500">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-red-600">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600">
                            <Share className="h-4 w-4" />
                            <span>{post.shares}</span>
                        </button>
                        <button className="hover:text-blue-600">
                            <Bookmark className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post