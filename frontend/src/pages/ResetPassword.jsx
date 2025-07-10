import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'https://cureconnect-vvex.onrender.com'}/api/user/reset-password/${token}`,
        { password }
      );
      if (data.success) {
        toast.success('Password reset successful! Please log in.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleReset} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Reset Password</p>
        <p>Enter your new password below.</p>
        <input
          className="border border-zinc-300 rounded w-full p-2 mt-1"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="New password"
        />
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;