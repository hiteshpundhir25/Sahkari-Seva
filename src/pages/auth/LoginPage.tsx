import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Building2, ShieldCheck, Mail, Lock, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = login(email);
    if (success) {
      if (from) {
        navigate(from, { replace: true });
      } else {
        const profile = dataServiceGetRole(email);
        if (profile === 'admin') navigate('/admin/dashboard');
        else if (profile === 'worker') navigate('/worker/dashboard');
        else navigate('/customer/dashboard');
      }
    } else {
      setError('Email not found in registry. Please check or use 1-Click Fast Login below.');
    }
    setLoading(false);
  };

  const dataServiceGetRole = (e: string) => {
    if (e.includes('admin')) return 'admin';
    if (e.includes('worker')) return 'worker';
    return 'customer';
  };

  const handleQuickLogin = (role: 'customer' | 'worker' | 'admin', targetEmail: string) => {
    login(targetEmail);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'worker') navigate('/worker/dashboard');
    else navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6 px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-coop-600 items-center justify-center text-white shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            Sign In to Sahakari Seva
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access your Customer, Worker, or Cooperative Admin account
          </p>
        </div>

        {/* Demo Fast Login Helper */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-lg border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-saffron-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron-400" /> Fast Demo Logins (1-Click)
            </span>
            <span className="text-[10px] text-slate-400">SIH Hackathon Ready</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer', 'priya.singh@customer.in')}
              className="p-2 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 border border-blue-600/40 text-center transition-colors"
            >
              <p className="text-[10px] font-bold text-blue-200 uppercase">Customer</p>
              <p className="text-xs font-semibold text-white truncate">Priya Singh</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('worker', 'rahul.sharma@worker.in')}
              className="p-2 rounded-xl bg-coop-900/60 hover:bg-coop-800/80 border border-coop-600/40 text-center transition-colors"
            >
              <p className="text-[10px] font-bold text-coop-200 uppercase">Worker</p>
              <p className="text-xs font-semibold text-white truncate">Rahul (Electrician)</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin', 'admin@delhicoop.in')}
              className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-600/40 text-center transition-colors"
            >
              <p className="text-[10px] font-bold text-emerald-200 uppercase">Admin</p>
              <p className="text-xs font-semibold text-white truncate">Co-op Officer</p>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.singh@customer.in"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password || '••••••••'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            <Button type="submit" size="md" className="w-full" isLoading={loading}>
              Sign In
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-coop-600 dark:text-coop-400 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
