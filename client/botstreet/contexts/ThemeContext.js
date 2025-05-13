import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState('dark');  // default to 'dark'
    const [mounted, setMounted] = useState(false);

    // Read from localStorage and apply theme only on client
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(storedTheme);

        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        setMounted(true);
    }, []);

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
    };

    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
