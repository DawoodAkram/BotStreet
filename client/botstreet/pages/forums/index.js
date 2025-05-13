import { useState, useEffect, useContext } from "react"
import ForumFeed from "../../components/ForumFeed"
import Suggestions from "../../components/Suggestions"
import { useRouter } from "next/router"
import ThemeContext from "@/contexts/ThemeContext"
import HomeHeader from "@/components/homeheader"

export default function Forums() {
    const [allPosts, setAllPosts] = useState([])
    const [feedPosts, setFeedPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const router = useRouter()
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    useEffect(() => {
        async function fetchData() {
            try {
                const user_id = localStorage.getItem('userId');

                const [allRes, feedRes] = await Promise.all([
                    fetch(`http://localhost:3000/api/post/?user_id=${user_id}`),
                    fetch(`http://localhost:3000/api/post/feed/${user_id}`)
                ]);

                const allData = await allRes.json();
                const feedData = await feedRes.json();

                if (allRes.ok) setAllPosts(allData);
                else setError('Failed to fetch all posts');

                if (feedRes.ok) setFeedPosts(feedData);
                else setError('Failed to fetch feed posts');

            } catch (err) {
                setError('Error connecting to the server');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [refetch]);


    const handleNewPost = async (postContent) => {
        try {
            const user_id = localStorage.getItem('userId')

            if (!user_id) return router.push('/signin')

            const response = await fetch('http://localhost:3000/api/post/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id,
                    post_content: postContent.content,
                }),
            })

            if (response.ok) {
                setRefetch(prev => !prev)
                return true
            } else {
                const data = await response.json()
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
            if (!user_id) return router.push('/signin')

            const response = await fetch(`http://localhost:3000/api/post/likes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, post_id }),
            })

            if (response.ok) {
                setRefetch(prev => !prev)
            } else {
                console.error('Failed to like post')
            }
        } catch (err) {
            console.error('Error liking post:', err)
        }
    }

    const handleCommentPost = async (post_id, comment_text) => {
        try {
            const user_id = localStorage.getItem('userId')
            if (!user_id) return router.push('/signin')

            const response = await fetch('http://localhost:3000/api/post/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, post_id, comment_text }),
            })

            if (response.ok) {
                setRefetch(prev => !prev)
            } else {
                console.error('Failed to comment on post')
            }
        } catch (err) {
            console.error('Error commenting on post:', err)
        }
    }

    return (
        <div className={`min-h-screen ${isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"} transition-colors duration-200 flex flex-col`}>
            <HomeHeader />
            <main className="flex-1 container mx-auto px-4 mt-4">
                {/* Page Header Section - now full width */}
                <div className={`w-full py-8 rounded-lg shadow-sm ${isDark ? "bg-gray-800 text-gray-100" : "bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-800"} mb-6`}>
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                                BotStreet <span className="text-indigo-500">Forums</span>
                            </h1>
                            <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Connect with the community, share ideas, and get inspired.
                            </p>
                            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
                        </div>
                    </div>
                </div>

                {/* Centered content container */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
                    {/* Main content - ForumFeed */}
                    <div className={`flex-1 border ${isDark ? "border-gray-800 bg-gray-900 text-gray-100" : "border-gray-200 bg-white text-gray-800"} rounded-lg shadow-sm`}>
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? "border-blue-400" : "border-indigo-600"}`}></div>
                            </div>
                        ) : error ? (
                            <div className={`p-4 text-center ${isDark ? "text-red-400" : "text-red-600"}`}>{error}</div>
                        ) : (
                            <ForumFeed
                                allPosts={allPosts}
                                feedPosts={feedPosts}
                                onNewPost={handleNewPost}
                                onLikePost={handleLikePost}
                                onCommentPost={handleCommentPost}
                            />
                        )}
                    </div>

                    {/* Sidebar - Who to Follow and Forums tabs */}
                    <div className="md:w-80 flex-shrink-0">
                        <div className={`rounded-lg shadow-sm p-4 ${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} sticky top-20`}>
                            <Suggestions />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}