// components/SkeletonCard.tsx

// SkeletonCard is a visual placeholder used while actual product data is loading.
// It mimics the shape and structure of the final content for better perceived performance.

export default function SkeletonCard() {
  return (
    <div className="border rounded shadow p-4 animate-pulse bg-white dark:bg-zinc-800">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300 dark:bg-zinc-700 rounded mb-4"></div>

      {/* Title placeholder */}
      <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-3/4 mb-2"></div>

      {/* Price placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-1/2 mb-2"></div>

      {/* Category or brand placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-1/3"></div>
    </div>
  );
}
