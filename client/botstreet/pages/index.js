
'use client';

import Image from 'next/image';
import logo from './logo.svg'; // adjust the path as needed
import HomeHeader from '@/components/homeheader'; 
const Home = () => {
  return (
    <>
    <HomeHeader />
    
    <section className="w-full py-16 mb-28">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between ml-32">
        <div className="flex flex-col flex-1 sm:items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Join the <span className="text-blue-600">BotStreet Community</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg max-w-md">
            BotStreet is more than a platform—it's a thriving community of developers, innovators, and tech enthusiasts dedicated to building the future together. Whether you're into open-source development, AI research, full-stack projects, or just learning the ropes, BotStreet is your space to grow, connect, and create.
          </p>
          <button className="group relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold transition duration-300 ease-out">
            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-blue-600 text-white duration-300 group-hover:translate-x-0">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">Get Started</span>
            <span className="invisible relative">Get Started</span>
          </button>
        </div>
        <div className="flex-1">
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;

