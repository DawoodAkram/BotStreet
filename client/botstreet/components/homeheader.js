'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggler from './ThemeToggler';

const HomeHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        // Set active link based on current path
        setActiveLink(window.location.pathname);

        // Add scroll listener
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleReload = () => {
        window.location.href = '/';
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUsername(null);
        window.location.href = '/';
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled 
                ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' 
                : 'bg-gray-900 shadow-md py-3'
        }`}>
            <div className="container mx-auto">
                <nav className="flex items-center justify-between px-4 sm:px-6 mx-auto">
                    {/* Logo */}
                    <div 
                        className="cursor-pointer flex items-center group" 
                        onClick={handleReload}
                    >
                        <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="BotStreet Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </div>
                        <span className="ml-2 text-xl font-bold text-indigo-400 transition-all duration-300 group-hover:text-indigo-300">
                            BotStreet
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-gray-300">
                        {[
                            { path: '/forums', label: 'Forums' },
                            { path: '/projects', label: 'Projects' },
                            { path: '/polls', label: 'Polls' },
                            { path: '/contact', label: 'Contact' },
                            { path: '/about', label: 'About Us' },
                        ].map((link) => (
                            <Link 
                                key={link.path}
                                href={link.path} 
                                className={`text-base font-medium hover:text-indigo-400 relative group py-2 ${
                                    activeLink === link.path ? 'text-indigo-400' : ''
                                }`}
                            >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 ${
                                    activeLink === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Theme Toggler */}
                    <div className="flex items-center">
                        <ThemeToggler />
                    </div>

                    {/* Auth Buttons or Welcome */}
                    <div className="hidden md:flex items-center space-x-4">
                        {username ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center bg-gray-800/60 px-3 py-1.5 rounded-lg">
                                    <svg className="w-5 h-5 text-indigo-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-gray-300">
                                        <span className="text-indigo-400 font-semibold">{username}</span>
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <button className="px-5 py-2 text-indigo-400 font-medium hover:text-indigo-300 transition-all duration-300 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="relative px-5 py-2 rounded-lg bg-indigo-600 text-gray-100 font-medium overflow-hidden group transition-all duration-300 transform hover:scale-105">
                                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                            Sign Up
                                            <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden fixed top-[57px] left-0 right-0 bg-gray-800 shadow-lg border-t border-gray-700 transition-all duration-300 transform ${
                    isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                } ${scrolled ? 'top-[49px]' : 'top-[57px]'}`}
            >
                <div className="flex flex-col py-4 px-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <Link 
                        href="/" 
                        className={`text-base font-medium hover:text-indigo-400 ${activeLink === '/' ? 'text-indigo-400' : 'text-gray-300'}`}
                        onClick={closeMenu}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about" 
                        className={`text-base font-medium hover:text-indigo-400 ${activeLink === '/about' ? 'text-indigo-400' : 'text-gray-300'}`}
                        onClick={closeMenu}
                    >
                        About Us
                    </Link>
                    <Link 
                        href="/forums" 
                        className={`text-base font-medium hover:text-indigo-400 ${activeLink === '/forums' ? 'text-indigo-400' : 'text-gray-300'}`}
                        onClick={closeMenu}
                    >
                        Forums
                    </Link>
                    <Link
                        href="/projects" 
                        className={`text-base font-medium hover:text-indigo-400 ${activeLink === '/projects' ? 'text-indigo-400' : 'text-gray-300'}`}
                        onClick={closeMenu}
                    >
                        Projects
                    </Link>
                    <Link 
                        href="/polls" 
                        className={`text-base font-medium hover:text-indigo-400 ${activeLink === '/polls' ? 'text-indigo-400' : 'text-gray-300'}`}
                        onClick={closeMenu}
                    >
                        Polls
                    </Link>
                    <Link 
                        href="/contact" 
                        className={`text-base font-medium hover:text-indigo-400 ${activeLink === '/contact' ? 'text-indigo-400' : 'text-gray-300'}`}
                        onClick={closeMenu}
                    >
                        Contact
                    </Link>
                    
                    <div className="flex flex-col pt-4 space-y-3 border-t border-gray-700">
                        {username ? (
                            <>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-gray-300">
                                        <span className="text-indigo-400 font-semibold">{username}</span>
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/signin" onClick={closeMenu}>
                                    <button className="w-full py-2 rounded-lg border border-indigo-500 text-indigo-400 hover:bg-gray-700 flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup" onClick={closeMenu}>
                                    <button className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HomeHeader;