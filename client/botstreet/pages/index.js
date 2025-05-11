'use client';

import { useState } from 'react';
import HomeHeader from '@/components/homeheader';
import Link from 'next/link';  // Import Link component

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <HomeHeader />

      <main>
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col flex-1 sm:items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Join the <span className="text-indigo-400">BotStreet</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Community</span>
              </h1>
              <p className="mt-6 text-gray-300 text-lg max-w-lg">
                BotStreet is more than a platform—it's a thriving community of developers, innovators, and tech enthusiasts dedicated to building the future together. Connect, create, and grow with us.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/forums">  {/* Use Link for routing */}
                  <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-500 px-6 py-4 text-lg font-medium text-white transition-all duration-300 ease-out hover:bg-indigo-600"
                  >
                    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                    <span className="flex items-center">
                      Get Started
                      <svg className="ml-2 h-5 w-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full h-80 md:h-96 lg:h-96">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-indigo-500 rounded-lg opacity-10 transform -rotate-6"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-purple-600 rounded-lg opacity-10 transform rotate-6"></div>
                <div className="absolute inset-0 m-auto w-full h-full flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-md shadow-lg border border-gray-700 flex items-center justify-center overflow-hidden">
                    <img
                      src="\community.png"
                      alt="Community Illustration"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section Preview */}
        <section className="w-full py-16 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Join BotStreet?</h2>
              <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-750 bg-gradient-to-br from-gray-750 to-gray-700 p-8 rounded-md border border-gray-600 shadow-md transition-all duration-300 hover:shadow-lg hover:border-indigo-500">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Connect with Experts</h3>
                <p className="text-gray-300">Engage with industry professionals and like-minded enthusiasts in our vibrant community forums.</p>
              </div>


              {/* Feature 2 */}
              <div className="bg-gray-750 bg-gradient-to-br from-gray-750 to-gray-700 p-8 rounded-md border border-gray-600 shadow-md transition-all duration-300 hover:shadow-lg hover:border-indigo-500">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Share Knowledge</h3>
                <p className="text-gray-300">Contribute to projects, share your insights, and help others grow in their technical journey.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-750 bg-gradient-to-br from-gray-750 to-gray-700 p-8 rounded-md border border-gray-600 shadow-md transition-all duration-300 hover:shadow-lg hover:border-indigo-500">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Accelerate Growth</h3>
                <p className="text-gray-300">Access resources, mentorship, and collaborative opportunities to fast-track your development skills.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;