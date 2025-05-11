import { useState } from 'react';
// import {logo} from '../logo.svg'
import Link from 'next/link';
import Image from 'next/image';
const HomeHeader = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleReload = () => {
        window.location.reload()
    }
    return (
        <header className= "sticky w-full top-0 bg-white bg-opacity-85 shadow-md z-50 mb-16">
            <nav className="w-full flex items-center justify-between px-8 py-6 bg-transparent">
            <div className="cursor-pointer" onClick={handleReload}>
                {/* <div className="group flex justify-between items-center">
                    <Image
                    src ="/vite.svg"
                     alt="A description of the image"
                    width={10}  // Width of the image
                    height={10} 
                     className="w-16 h-16 group-hover:-rotate-180 transition-rotate duration-500" />
                    
                </div> */}
            </div>

            <div className="hidden md:flex space-x-8 text-gray-700">
                <a href="#pricing" className="hover:text-gray-800 underlined-nav">BotStreet Home</a>
                <a href="#about" className="hover:text-gray-800 underlined-nav">About Us</a>
                <a href="#contacts" className="hover:text-gray-800 underlined-nav">Contacts</a>
            </div>
            
            <div className="hidden md:flex space-x-4">
                
                <button className="group relative inline-block overflow-hidden rounded-lg border-2 border-blue-600 px-4 py-2 text-blue-600">
                    <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative group-hover:text-white">Sign Up</span>
                </button>
                
                
                <button className="group relative inline-block overflow-hidden rounded-lg bg-blue-600 px-4 py-2 text-white">
                    <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-blue-700 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative group-hover:text-white">Sign In</span>
                </button>

            </div>



                
        </nav>
        </header>
        
    );
};

export default HomeHeader;