// app/not-found.tsx

'use client'; // Ensures this error boundary component runs on the client side (required for dynamic routing fallback)

import Link from 'next/link'; // Built-in Next.js navigation component for client-side transitions

/**
 * ❌ Custom 404 Page Component
 * This is the UI fallback rendered by Next.js when a route is not found,
 * such as a missing product or an invalid page path.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center p-6">
      {/* 🔴 Error Code & Message */}
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Product Not Found</h1>

      {/* 📣 Explanation Message */}
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Sorry, the product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>

      {/* 🔙 Navigation Button to Return Home */}
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Product Dashboard
      </Link>
    </div>
  );
}
