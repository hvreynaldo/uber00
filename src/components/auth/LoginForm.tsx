import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { TruckIcon } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 p-8 glass-effect rounded-xl">
        <div className="flex flex-col items-center">
          <TruckIcon className="w-12 h-12 text-[#276EF1] mb-4" />
          <h2 className="text-center text-3xl font-bold text-gray-100">
            Sign in to Uber Freight
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Lease Tracker Portal
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 text-red-200 p-4 rounded-lg text-sm border border-red-800">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-gray-100 px-4 py-2.5 focus:border-[#276EF1] focus:ring-1 focus:ring-[#276EF1]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-gray-100 px-4 py-2.5 focus:border-[#276EF1] focus:ring-1 focus:ring-[#276EF1]"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-[#276EF1] hover:bg-[#1b4ea3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#276EF1] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}