// Loading component that displays a skeleton loading screen
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Use of Tailwind CSS to create a skeleton loader */}
      <div className="animate-pulse space-y-4">
        {/* Placeholder for a header or title */}
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>

        {/* Grid layout for the skeleton of a product or content card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placeholder for an image, typically the product or content thumbnail */}
          <div className="h-64 bg-gray-300 rounded"></div>
          <div className="space-y-2">
            {/* Placeholder for text elements like title, description, etc. */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
