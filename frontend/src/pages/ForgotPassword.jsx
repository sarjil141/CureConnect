import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/user/forgot-password`,{ email });
      if (data.success) {
        toast.success('Password reset link sent to your email!');
      } else {
        toast.error(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <form onSubmit={handleForgot} className="w-full flex justify-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl text-zinc-700 text-sm shadow-2xl">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 mb-2">Forgot Password</p>
          <p className="mb-2">Enter your email to receive a password reset link.</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white w-full py-2 rounded-md text-base font-semibold shadow-md hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;