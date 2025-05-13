import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar'; // Ensure correct path
import axios from 'axios';
import HomeHeader from '@/components/homeheader';

const Settings = () => {
  const router = useRouter();
  const { username } = router.query; // Get username from the query string
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      console.log("Username from query string:", username);
      const storedUserId = localStorage.getItem('userId');
      const storedEmail = localStorage.getItem('email');
      setUserId(storedUserId || 'Unknown');
      setEmail(storedEmail || 'Unknown');
      setUpdatedUsername(username); // Initialize with the current username
      setUpdatedEmail(storedEmail); // Initialize with the current email
    }
  }, [username]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError('');

    // Ensure at least one field is updated
    if (!updatedUsername && !updatedEmail && !newPassword) {
      return setError('Please provide at least one field to update.');
    }

    const updatedData = {
      userId,
      username: updatedUsername,
      email: updatedEmail,
      password: newPassword ? newPassword : undefined, // Only send password if updated
    };

    try {
      const response = await axios.put('http://localhost:3000/api/auth/update', updatedData);
      localStorage.setItem('username', updatedUsername);
      localStorage.setItem('email', updatedEmail);
      if (newPassword) localStorage.setItem('password', newPassword);
      alert('Details updated successfully');
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">


      <div className="flex-1">
        <HomeHeader />

        <div className="container mx-auto p-4 pt-12"> {/* Added padding top to ensure content is visible */}
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Settings</h1>

          {/* Settings Form */}
          <div className="mt-8 p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Update Your Details</h2>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Show error message */}

            <form onSubmit={handleSaveChanges} className="mt-4">
              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 dark:text-white font-semibold">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md"
                  placeholder="Enter new username"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 dark:text-white font-semibold">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md"
                  placeholder="Enter new email"
                />
              </div>

              {/* Current Password */}
              <div className="mb-4">
                <label htmlFor="current-password" className="block text-gray-700 dark:text-white font-semibold">Current Password:</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label htmlFor="new-password" className="block text-gray-700 dark:text-white font-semibold">New Password:</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md"
                  placeholder="Enter new password"
                />
              </div>

              {/* Save Changes Button */}
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
