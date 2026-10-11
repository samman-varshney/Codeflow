import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Loader2, Lock, Mail, User } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      toast.success('Account created successfully!');
      navigate('/prompt');
    } catch (error) {
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#111] text-gray-200 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(138,43,226,0.15),transparent_65%)] blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors bg-[#161616]/80 hover:bg-[#1D1D1D] rounded-lg border border-gray-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md bg-[#161616]/90 border border-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Join CodeFlow to design, manage, and export workflows
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 focus:ring-0 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 placeholder-gray-500 text-sm transition-all duration-300 focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 focus:ring-0 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 placeholder-gray-500 text-sm transition-all duration-300 focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 focus:ring-0 rounded-lg pl-10 pr-4 py-2.5 text-gray-200 placeholder-gray-500 text-sm transition-all duration-300 focus:shadow-[0_0_15px_rgba(138,43,226,0.3)] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_3px_12px_rgba(138,43,226,0.4)] transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:scale-[1.01] hover:shadow-[0_6px_20px_rgba(138,43,226,0.6)]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <footer className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </footer>
      </div>
    </div>
  );
}

