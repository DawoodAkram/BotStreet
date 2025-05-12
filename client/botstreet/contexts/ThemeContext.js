import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState("dark")

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }


    const value = {
        theme,
        toggleTheme,
        isDark: theme === "dark",
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext;