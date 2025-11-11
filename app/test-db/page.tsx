'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, XCircle, AlertCircle, Database } from 'lucide-react';

export default function TestDBPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    testConnection();
  }, []);

  async function testConnection() {
    setStatus('loading');
    setMessage('Testing connection...');

    try {
      // Test 1: Check if we can connect
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('count');

      if (profilesError) throw new Error(`Profiles table: ${profilesError.message}`);

      // Test 2: Check other tables
      const tablesToCheck = ['facilities', 'departments', 'tasks', 'activity_log'];
      const results = [];

      for (const table of tablesToCheck) {
        try {
          const { error } = await supabase.from(table).select('count').limit(1);
          if (error) {
            results.push(`❌ ${table}: ${error.message}`);
          } else {
            results.push(`✅ ${table}`);
          }
        } catch (err) {
          results.push(`❌ ${table}: ${err}`);
        }
      }

      setTables(results);
      setStatus('success');
      setMessage('Supabase connection successful!');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Connection failed');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-950 dark:to-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Database Connection Test
            </h1>
          </div>

          {/* Status Card */}
          <div className={`
            p-4 rounded-lg border-2 mb-6
            ${status === 'loading' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'}
            ${status === 'success' && 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'}
            ${status === 'error' && 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'}
            ${status === 'idle' && 'bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'}
          `}>
            <div className="flex items-center gap-3">
              {status === 'loading' && (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
              {status === 'success' && <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />}
              {status === 'error' && <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />}
              {status === 'idle' && <AlertCircle className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />}
              
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {message}
              </p>
            </div>
          </div>

          {/* Tables List */}
          {tables.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                Database Tables:
              </h2>
              {tables.map((table, index) => (
                <div
                  key={index}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm font-mono text-zinc-900 dark:text-zinc-100"
                >
                  {table}
                </div>
              ))}
            </div>
          )}

          {/* Environment Check */}
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Environment Variables:
            </h3>
            <div className="space-y-1 text-xs font-mono">
              <p className="text-zinc-600 dark:text-zinc-400">
                SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                LIVEBLOCKS_KEY: {process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ? '✅ Set' : '❌ Missing'}
              </p>
            </div>
          </div>

          {/* Retry Button */}
          <button
            onClick={testConnection}
            disabled={status === 'loading'}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Testing...' : 'Test Again'}
          </button>

          {/* Next Steps */}
          {status === 'error' && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                Next Steps:
              </h4>
              <ol className="text-xs text-yellow-800 dark:text-yellow-200 space-y-1 list-decimal list-inside">
                <li>Make sure .env.local exists with your Supabase credentials</li>
                <li>Run the database-schema.sql file in your Supabase SQL Editor</li>
                <li>Check that your Supabase project is active</li>
                <li>Restart the Next.js dev server after adding env vars</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

