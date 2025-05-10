import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      console.log('Success:', response.data);
      router.push('/signin');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Create your account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition p-3 rounded-xl font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <Link href="/signin" className="text-indigo-400 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
