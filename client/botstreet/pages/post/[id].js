import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import HomeHeader from '@/components/homeheader'
import ThemeContext from '@/contexts/ThemeContext'

const PostDetailPage = () => {
    const router = useRouter()
    const { id } = router.query
    const value = useContext(ThemeContext)

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (!id) return

        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/post/${id}`)
                const data = await res.json()
                setPost(data)
            } catch (err) {
                console.error('Error fetching post detail:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    if (loading) return (
        <div className={`min-h-screen ${value.theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} flex items-center justify-center`}>
            <div className={`text-xl ${value.theme === "dark" ? "text-indigo-400" : "text-indigo-600"} font-medium`}>Loading...</div>
        </div>
    )
    
    if (!post) return (
        <div className={`min-h-screen ${value === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} flex items-center justify-center`}>
            <div className={`text-xl ${value === "dark" ? "text-indigo-400" : "text-indigo-600"} font-medium`}>Post not found.</div>
        </div>
    )

    return (
        <div className={`min-h-screen ${value.theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
            <HomeHeader />
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Back button and author section */}
                    <div className="flex items-center space-x-4 mb-8">
                        <Link href="/forums">
                            <button
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`group relative flex items-center justify-center overflow-hidden rounded-full ${
                                    value.theme === "dark" ? "bg-gray-800 hover:bg-indigo-600 border-gray-700" : "bg-gray-200 hover:bg-indigo-500 border-gray-300"
                                } p-3 ${value.theme === "dark" ? "text-white" : "text-gray-700"} transition-all duration-300 ease-out border`}
                            >
                                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        </Link>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 ${value.theme === "dark" ? "bg-indigo-500" : "bg-indigo-600"} rounded-full flex items-center justify-center`}>
                                <span className="text-white font-bold">{post.author.username.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="ml-3">
                                <div className={`text-xl font-semibold ${value.theme === "dark" ? "text-white" : "text-gray-800"}`}>{post.author.username}</div>
                                <div className={`text-xs ${value.theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Community Member</div>
                            </div>
                        </div>
                    </div>

                    {/* Post content */}
                    <div className={`${
                        value.theme === "dark" 
                            ? "bg-gray-800 bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700" 
                            : "bg-white bg-gradient-to-br from-white to-gray-50 border-gray-200"
                        } rounded-lg border shadow-lg p-6 mb-8`}>
                        <div className="prose max-w-none">
                            <p className={`${value.theme === "dark" ? "text-gray-200" : "text-gray-700"} text-lg leading-relaxed`}>{post.content}</p>
                        </div>
                        
                        <div className={`flex items-center mt-6 pt-6 border-t ${value.theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                            <div className="flex items-center mr-6">
                                <svg className={`w-5 h-5 ${value.theme === "dark" ? "text-indigo-400" : "text-indigo-500"} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                <span className={`${value.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                                <svg className={`w-5 h-5 ${value.theme === "dark" ? "text-indigo-400" : "text-indigo-500"} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                </svg>
                                <span className={`${value.theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{post.comments?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Comments section */}
                    <div className="mt-8">
                        <div className="flex items-center mb-6">
                            <h3 className={`text-2xl font-bold ${value.theme === "dark" ? "text-white" : "text-gray-800"}`}>Comments</h3>
                            <div className="w-16 h-1 bg-indigo-500 ml-4"></div>
                        </div>
                        
                        {post.comments && post.comments.length > 0 ? (
                            <ul className="space-y-4">
                                {post.comments.map((comment, idx) => (
                                    <li key={idx} className={`${
                                        value.theme === "dark" 
                                            ? "bg-gray-750 bg-gradient-to-br from-gray-750 to-gray-700 border-gray-600" 
                                            : "bg-gray-50 bg-gradient-to-br from-gray-50 to-white border-gray-200"
                                        } p-4 rounded-md border shadow-md transition-all duration-300 hover:shadow-lg ${
                                            value.theme === "dark" ? "hover:border-indigo-500" : "hover:border-indigo-400"
                                        }`}>
                                        <div className="flex items-center mb-2">
                                            <div className={`w-8 h-8 ${value.theme === "dark" ? "bg-gray-600" : "bg-indigo-100"} rounded-full flex items-center justify-center`}>
                                                <span className={`${value.theme === "dark" ? "text-white" : "text-indigo-600"} text-sm font-bold`}>{comment.username.charAt(0).toUpperCase()}</span>
                                            </div>
                                            <div className={`ml-3 font-medium ${value.theme === "dark" ? "text-white" : "text-gray-800"}`}>{comment.username}</div>
                                        </div>
                                        <div className={`${value.theme === "dark" ? "text-gray-300" : "text-gray-600"} pl-11`}>{comment.comment_text}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className={`${
                                value.theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                                } p-6 rounded-md border text-center`}>
                                <p className={`${value.theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PostDetailPage