'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Suggestions() {
  const [suggestedUsers, setSuggestedUsers] = useState([])

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) return

    fetch(`http://localhost:3000/api/users/suggestion?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        const usersWithFollowState = data.map(user => ({ ...user, isFollowing: false }))
        setSuggestedUsers(usersWithFollowState)
      })
      .catch(err => {
        console.error("Error fetching suggested users:", err)
      })
  }, [])

  const handleFollow = (following_id) => {
    const follower_id = localStorage.getItem("userId")
    if (!follower_id) return

    fetch(`http://localhost:3000/api/users/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ follower_id, following_id })
    })
      .then(res => {
        if (res.ok) {
          setSuggestedUsers(prev =>
            prev.map(user =>
              user.id === following_id ? { ...user, isFollowing: true } : user
            )
          )
        } else {
          console.error("Failed to follow user")
        }
      })
      .catch(err => {
        console.error("Error following user:", err)
      })
  }

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mt-4">
          <h2 className="font-bold text-lg mb-3">Who to Follow</h2>
          <div className="space-y-4">
            {suggestedUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 relative rounded-full overflow-hidden">
                    <Image
                      src={`https://api.dicebear.com/7.x/adventurer/png?seed=${user.username}`}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(user.id)}
                  disabled={user.isFollowing}
                  className={`font-semibold py-1 px-3 rounded-full border text-sm ${
                    user.isFollowing
                      ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300 cursor-default"
                      : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <p className="mt-2">© 2025 UniCommunity</p>
        </div>
      </div>
    </div>
  )
}
