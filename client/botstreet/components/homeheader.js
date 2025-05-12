'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleReload = () => {
        window.location.href = '/';
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-900 shadow-lg py-3">
            <div className="container mx-auto">
                <nav className="flex items-center justify-between px-6 mx-auto">
                    {/* Logo */}
                    <div className="cursor-pointer flex items-center" onClick={handleReload}>
                        <Image
                            src="/logo.png"
                            alt="BotStreet Logo"
                            width={40}
                            height={40}
                            className="h-10 w-auto"
                        />
                        <span className="ml-2 text-xl font-bold text-indigo-400">BotStreet</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-gray-300">
                        <Link href="/" className="text-base font-medium hover:text-indigo-400 transition-colors duration-300 relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="text-base font-medium hover:text-indigo-400 transition-colors duration-300 relative group">
                            About Us
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/forums" className="text-base font-medium hover:text-indigo-400 transition-colors duration-300 relative group">
                            Forums
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/contact" className="text-base font-medium hover:text-indigo-400 transition-colors duration-300 relative group">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Sign Up and Sign In Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/signin">
                            <button className="px-5 py-2 rounded-lg text-indigo-400 font-medium hover:text-indigo-300 transition-colors duration-300">
                                Sign In
                            </button>
                        </Link>

                        <Link href="/signup">
                            <button className="relative px-5 py-2 rounded-lg bg-indigo-600 text-gray-100 font-medium overflow-hidden group">
                                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative flex items-center">
                                    Sign Up
                                    <svg className="ml-1 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
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
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg border-t border-gray-700">
                    <div className="flex flex-col py-4 px-6 space-y-4">
                        <Link href="/" className="text-base font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-300 py-2">
                            Home
                        </Link>
                        <Link href="/about" className="text-base font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-300 py-2">
                            About Us
                        </Link>
                        <Link href="/forums" className="text-base font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-300 py-2">
                            Forums
                        </Link>
                        <Link href="/contact" className="text-base font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-300 py-2">
                            Contact
                        </Link>
                        <div className="flex flex-col pt-4 space-y-3 border-t border-gray-700">
                            <Link href="/signin">
                                <button className="w-full py-2 rounded-lg border border-indigo-500 text-indigo-400 font-medium hover:bg-gray-700 transition-colors duration-300">
                                    Sign In
                                </button>
                            </Link>

                            <Link href="/signup">
                                <button className="w-full py-2 rounded-lg bg-indigo-600 text-gray-100 font-medium hover:bg-indigo-700 transition-colors duration-300">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HomeHeader;