import { useState, useEffect, useContext } from "react"
import Header from "../../components/Header"
import ForumFeed from "../../components/ForumFeed"
import Suggestions from "../../components/Suggestions"
import { useRouter } from "next/router"
import Sidebar from "@/components/Sidebar"
import ThemeContext from "@/contexts/ThemeContext"

export default function Forums() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const router = useRouter()
    const value = useContext(ThemeContext)

    useEffect(() => {
        async function fetchPosts() {
            try {
                const user_id = localStorage.getItem('userId')
                const response = await fetch(`http://localhost:3000/api/post/?user_id=${user_id}`)
                const data = await response.json()

                if (response.ok) {
                    setPosts(data)
                } else {
                    setError('Failed to fetch posts')
                }
            } catch (err) {
                setError('Error connecting to the server')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [refetch])

    const handleNewPost = async (postContent) => {
        try {
            const user_id = localStorage.getItem('userId')

            if (!user_id) {
                router.push('/signin')
            }

            const response = await fetch('http://localhost:3000/api/post/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,
                    post_content: postContent.content,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setRefetch(prev => !prev)
                return true
            } else {
                console.error('Failed to create post:', data.message)
                return false
            }
        } catch (err) {
            console.error('Error creating post:', err)
            return false
        }
    }

    const handleLikePost = async (post_id) => {
        try {
            const user_id = localStorage.getItem('userId')

            if (!user_id) {
                router.push('/signin')
            }

            const response = await fetch(`http://localhost:3000/api/post/likes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, post_id }),
            })

            if (response.ok) {
                setRefetch(prev => !prev)
            } else {
                console.error('Failed to like post')
                return false
            }
        } catch (err) {
            console.error('Error liking post:', err)
            return false
        }
    }

    const handleCommentPost = async (post_id, comment_text) => {
        try {
            const user_id = localStorage.getItem('userId')

            if (!user_id) {
                router.push('/signin')
            }

            const response = await fetch('http://localhost:3000/api/post/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, post_id, comment_text }),
            })

            if (response.ok) {
                setRefetch(prev => !prev)
            } else {
                console.error('Failed to comment on post')
                return false
            }
        } catch (err) {
            console.error('Error commenting post:', err)
            return false
        }
    }


    return (
        <div className={`min-h-screen ${value.theme === "dark" ? "bg-gray-950" : "bg-white"} flex flex-col`}>
            <Header />

            <main className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 px-4 mt-4">
                {/* Sidebar */}
                <div className="md:col-span-2 lg:col-span-2">
                    <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                        <Sidebar />
                    </div>
                </div>

                {/* Forum Feed */}
                <div className="md:col-span-7 lg:col-span-7 border-x border-gray-200 dark:border-gray-800 min-h-screen">
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="p-4 text-red-600 text-center">{error}</div>
                    ) : (
                        <ForumFeed
                            posts={posts}
                            onNewPost={handleNewPost}
                            onLikePost={handleLikePost}
                            onCommentPost={handleCommentPost}
                        />
                    )}
                </div>

                {/* Suggestions */}
                <div className="hidden md:block md:col-span-3 lg:col-span-3">
                    <Suggestions />
                </div>
            </main>
        </div>
    )
}
