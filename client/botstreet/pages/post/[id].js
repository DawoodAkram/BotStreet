import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PostDetailPage = () => {
    const router = useRouter()
    const { id } = router.query

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

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

    if (loading) return <div className="p-4">Loading...</div>
    if (!post) return <div className="p-4">Post not found.</div>

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <div className='flex items-center'>
                <Link href={"/forums"}>
                    <button variant="ghost" className=" hover:text-gray-500 p-2">
                        ←
                    </button>
                </Link>
                <div className="text-lg font-semibold">{post.author.username}</div>
            </div>
            <div className="">Content: {post.content}</div>
            <div className="text-sm text-gray-500">Likes: {post.likes}</div>
            <div className="text-sm text-gray-500">Comments: {post.comments?.length || 0}</div>

            <hr className="my-4" />

            <div>
                <h3 className="font-semibold mb-2">Comments</h3>
                <ul className="space-y-3">
                    {post.comments?.map((comment, idx) => (
                        <li key={idx} className="border p-2 rounded bg-gray-50 dark:bg-gray-800">
                            <div className="font-medium">{comment.username}</div>
                            <div className="text-sm">{comment.comment_text}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}

export default PostDetailPage
