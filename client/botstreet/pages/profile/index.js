import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (username) {
      console.log("Username from query string:", username);
      const storedUserId = localStorage.getItem('userId');
      const storedEmail = localStorage.getItem('email');
      setEmail(storedEmail || 'Unknown');
      setUserId(storedUserId || 'Unknown');
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="md:col-span-2 lg:col-span-2 border-r border-gray-200 dark:border-gray-800">
          <Sidebar />
        </div>

        {/* Profile content */}
        <div className="md:col-span-10 lg:col-span-10 p-4 pt-12">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Profile</h1>
          {username && (
            <div className="mt-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-white">Username:</span>
                <p className="text-gray-500 dark:text-gray-400">{username}</p>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-white">UserID:</span>
                <p className="text-gray-500 dark:text-gray-400">{userId}</p>
              </div>
              <div>
                <span className="font-semibold text-lg text-gray-700 dark:text-white">Email:</span>
                <p className="text-gray-500 dark:text-gray-400">{email}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
