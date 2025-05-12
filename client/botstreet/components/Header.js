"use client"

import { useState, useContext } from "react"
import { Menu, Search, Bell, Mail, User } from "lucide-react"
import ThemeToggler from "./ThemeToggler"
import ThemeContext from "@/contexts/ThemeContext"
import Link from "next/link"

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const value = useContext(ThemeContext)


    return (
        <header className={`sticky top-0 z-50 ${value.theme === "dark" ? "dark:bg-gray-950" : "bg-white"} border-b border-gray-200 dark:border-gray-800`}>
            <div className="container mx-auto flex items-center justify-between h-14 px-4">
                <div className="flex items-center md:w-64">
                    <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="h-5 w-5" />
                    </button>

                    <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-500 ml-2">
                        UniCommunity
                    </Link>
                </div>

                <div className="hidden md:flex relative max-w-md w-full mx-4">
                    <div className="absolute left-2 top-2.5">
                        <Search className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search forums..."
                        className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-1">
                    <button className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 hidden md:block`}>
                        <Bell className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 hidden md:block">
                        <Mail className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 md:hidden">
                        <Search className="h-5 w-5" />
                    </button>
                    <ThemeToggler />
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                        <User className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                    <nav className="px-4 py-2">
                        <Link href="/" className="block py-2 hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/forums" className="block py-2 hover:text-blue-600">
                            Forums
                        </Link>
                        <Link href="/notifications" className="block py-2 hover:text-blue-600">
                            Notifications
                        </Link>
                        <Link href="/messages" className="block py-2 hover:text-blue-600">
                            Messages
                        </Link>
                        <Link href="/profile" className="block py-2 hover:text-blue-600">
                            Profile
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
