// app/not-found.tsx

'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Product Not Found</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Sorry, the product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Product Dashboard
      </Link>
    </div>
  );
}
