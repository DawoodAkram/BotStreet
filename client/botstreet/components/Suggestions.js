import { suggestedUsers } from "@/data/sampleData"
import Image from "next/image"

export default function Suggestions() {



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
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
                <button className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white font-semibold py-1 px-3 rounded-full border border-gray-300 dark:border-gray-600 text-sm">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
          <p className="mt-2">© 2025 UniCommunity</p>
        </div>
      </div>
    </div>
  )
}
