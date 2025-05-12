import { useState, useEffect } from "react"
import Image from "next/image"
import Post from "./Post"

export default function ForumFeed({ allPosts, feedPosts, onNewPost, onLikePost, onCommentPost }) {
  const [activeTab, setActiveTab] = useState("all")
  const [newPostContent, setNewPostContent] = useState("")
  const [currentUser, setCurrentUser] = useState({ username: "", name: "" })

  useEffect(() => {
    const username = localStorage.getItem("username") || "anonymous"
    const name = localStorage.getItem("name") || "Anonymous User"
    setCurrentUser({ username, name })
  }, [])

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return

    const newPost = {
      content: newPostContent,
    }

    onNewPost(newPost)
    setNewPostContent("")
  }

  const renderPosts = (posts) =>
    posts.map((post) => (
      <Post key={post.id} post={post} onLikePost={onLikePost} onComment={onCommentPost} />
    ))

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <h1 className="text-xl font-bold">Forums</h1>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-3 font-medium ${activeTab === "all" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 dark:text-gray-400"}`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`px-4 py-3 font-medium ${activeTab === "following" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 dark:text-gray-400"}`}
          >
            Following
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-4">
          <div className="h-10 w-10 relative rounded-full overflow-hidden">
            <Image
              src={`https://api.dicebear.com/7.x/adventurer/png?seed=${currentUser.username}`}
              alt={currentUser.name}
              width={40}
              height={40}
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="What's happening on campus?"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm mb-2"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <button
              onClick={handlePostSubmit}
              disabled={!newPostContent.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {activeTab === "all" ? renderPosts(allPosts) : renderPosts(feedPosts)}
    </div>
  )
}
