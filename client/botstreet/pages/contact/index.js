'use client';

import HomeHeader from '@/components/homeheader';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <HomeHeader />
      <main className="container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-lg text-gray-300 max-w-3xl mb-8">
          We'd love to hear from you! Whether it's a question, suggestion, or feedback — drop us a message.
        </p>
        <form className="grid grid-cols-1 gap-6 max-w-2xl">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-gray-800 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-gray-800 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="bg-gray-800 border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition duration-300 px-6 py-3 rounded-md text-white font-semibold"
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
