import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-950 dark:to-zinc-900">
      <main className="flex flex-col items-center gap-8 p-8 max-w-2xl text-center">
        {/* Logo Icon - Inspired by the sketch */}
        <div className="mb-4">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background square with rounded corners */}
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="16"
              className="fill-cyan-600 dark:fill-cyan-500"
            />
            
            {/* Circle in bottom-left corner */}
            <circle
              cx="30"
              cy="70"
              r="12"
              className="fill-white dark:fill-zinc-900"
            />
            
            {/* Triangle in top-right corner (cursor-like) */}
            <path
              d="M70 20 L88 38 L70 50 Z"
              className="fill-white dark:fill-zinc-900"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
          outcomeview
        </h1>
        
        <p className="text-xl text-zinc-700 dark:text-zinc-400 mb-8">
          Real-time operational collaboration for healthcare teams
        </p>

        <div className="flex flex-col gap-3 w-full max-w-md">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/30"
          >
            Command Center
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/dashboard/tv"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/30"
          >
            TV Display
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/dashboard/feed"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-orange-500/30"
          >
            Activity Feed
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="text-sm text-zinc-600 dark:text-zinc-500 text-center mt-2">
            Choose your view: Command Center, TV Display, or Activity Feed
          </div>
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm text-left w-full">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">✨ Features</h3>
          <ul className="text-sm text-zinc-700 dark:text-zinc-400 space-y-2">
            <li>• Real-time cursors (Figma-style collaboration)</li>
            <li>• User presence with role badges</li>
            <li>• Live activity stream (airport board style)</li>
            <li>• Department progress tracking</li>
            <li>• QR code generation for mobile access</li>
            <li>• Clean, professional UI with light/dark modes</li>
          </ul>
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-600 font-mono mt-4">
          See every outcome as it happens.
        </div>
      </main>
    </div>
  );
}
