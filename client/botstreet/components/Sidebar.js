import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    router.push('/signin');
  };

  const links = useMemo(() => {
    if (!username) return [];
    return [
      { name: 'Forums', path: '/forums' },
      { name: 'Profile', path: `/profile/${username}` },   // ✅ dynamic route
      { name: 'Settings', path: `/settings?username=${username}` }, // ✅ dynamic route
      { name: 'Logout', path: '/logout' },
    ];
  }, [username]);

  return (
    <>
      <button
        className="p-2 md:hidden fixed top-4 left-4 z-[60] bg-gray-800 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={`fixed top-14 h-[calc(100vh-3.5rem)] left-0 w-64 bg-gray-900 text-gray-100 shadow-md z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {username ? `Welcome, ${username}` : 'Loading...'}
          </h2>
          <nav>
            {links.map((link) =>
              link.name === 'Logout' ? (
                <button
                  key={link.name}
                  onClick={handleLogout}
                  className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                    router.asPath === link.path ? 'bg-blue-600' : ''
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
