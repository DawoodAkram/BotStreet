import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  UserCircle,
  LogOut,
  Settings,
  MessageCircle,
  Menu,
  X,
  BarChart,
  FolderKanban
} from 'lucide-react';

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
      { name: 'Forums', path: '/forums', icon: <MessageCircle size={18} className="mr-2" /> },
      { name: 'Polls', path: '/polls', icon: <BarChart size={18} className="mr-2" /> },
      { name: 'Projects', path: '/projects', icon: <FolderKanban size={18} className="mr-2" /> },
      { name: 'Profile', path: `/profile/${username}`, icon: <UserCircle size={18} className="mr-2" /> },
      { name: 'Settings', path: `/settings?username=${username}`, icon: <Settings size={18} className="mr-2" /> },
      { name: 'Logout', path: '/logout', icon: <LogOut size={18} className="mr-2" /> },
    ];
  }, [username]);

  return (
    <>
      <button
        className="p-2 md:hidden fixed top-4 left-4 z-[60] bg-gray-800 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-14 h-[calc(100vh-3.5rem)] left-0 w-64 bg-gray-900 text-gray-100 shadow-lg z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6 text-center text-white">
            {username ? `Welcome, ${username}` : 'Please Sign In'}
          </h2>
          <nav className="space-y-1">
            {links.map((link) =>
              link.name === 'Logout' ? (
                <button
                  key={link.name}
                  onClick={handleLogout}
                  className="flex items-center py-2 px-4 w-full text-left rounded hover:bg-gray-700 transition-colors"
                >
                  {link.icon}
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center py-2 px-4 rounded transition-colors ${router.asPath === link.path
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'hover:bg-gray-700 text-gray-300'
                    }`}
                >
                  {link.icon}
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
