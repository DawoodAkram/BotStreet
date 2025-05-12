"use client"

import { Moon, Sun } from "lucide-react"
import ThemeContext from "@/contexts/ThemeContext"
import { useContext } from 'react'

export default function ThemeToggler() {

    const value = useContext(ThemeContext)

    return (
        <button
            onClick={() => value.toggleTheme()}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label={value.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {value.theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    )
}
