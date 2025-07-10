import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, backendUrl } = useContext(AppContext);

  // Get email from localStorage (set after signup)
  const email = localStorage.getItem('pendingEmail');

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verify-email`,
        { code: otp }
      );

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Email verified! You are now logged in.');
        localStorage.removeItem('pendingEmail');
        navigate('/');
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="p-8 border rounded-xl shadow-lg bg-white/80">
          <p>No email found for verification. Please sign up first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <form onSubmit={handleVerify} className="w-full flex justify-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl text-zinc-700 text-sm shadow-2xl">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 mb-2">
            Verify Email
          </p>
          <p className="mb-2">
            Enter the OTP sent to <span className="font-medium">{email}</span>
          </p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 bg-white/80"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white w-full py-2 rounded-md text-base font-semibold shadow-md hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;