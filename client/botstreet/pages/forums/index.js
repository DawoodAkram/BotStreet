import { useState, useEffect } from "react"
import Header from "../../components/Header"
import ForumFeed from "../../components/ForumFeed"
import { samplePosts } from "@/data/sampleData"
import Suggestions from "../../components/Suggestions"

export default function Forums() {

    const [posts, setPosts] = useState(samplePosts)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    console.log(posts);

    // To fetch Posts from the DB (backend)
    // useEffect(() => {
    //     async function fetchPosts() {
    //         try {
    //             const response = await fetch()
    //             const data = await response.json()

    //             if (response.ok) {
    //                 setPosts(data.posts)
    //             } else {
    //                 setError(data.message || 'Failed to fetch posts')
    //             }
    //         } catch (err) {
    //             setError('Error connecting to the server')
    //             console.error(err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchPosts()
    // }, [])

    const handleNewPost = async (postContent) => {
        try {
            const user_id = "current_user_id"  // We'll be getting this after the db ig

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // post_id  --> (will be created at backend)
                    user_id,
                    post_content: postContent,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setPosts([data.post, ...posts])
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

    const handleLikePost = async (postId) => {
        try {
            const user_id = "current_user_id"

            const response = await fetch(`/api/posts/${postId}/likes`, {  // api/posts/likes
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id }),      // user_id, post_id
            })

            if (response.ok) {
                setPosts(posts.map(post => {
                    if (post.post_id === postId) {
                        return { ...post, like_count: post.like_count + 1 }
                    }
                    return post
                }))
                return true
            } else {
                console.error('Failed to like post')
                return false
            }
        } catch (err) {
            console.error('Error liking post:', err)
            return false
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="container mx-auto grid grid-cols-4 md:grid-cols-12 gap-0">
                <div className="md:col-span-8 lg:col-span-9 border-x border-gray-200 dark:border-gray-800 min-h-screen">
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
                        />
                    )}
                </div>
                <div className="md:col-span-3 lg:col-span-3 hidden lg:block">
                    <Suggestions />
                </div>
            </main>
        </div>
    )
}

