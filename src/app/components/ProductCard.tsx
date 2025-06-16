'use client'; // Marks this component as a client-side component in Next.js 13+

import Link from 'next/link'; // Link component for client-side navigation between pages
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';// Importing star icons for full and empty stars and Import half star icon

// Defining the Product type structure for type safety
type Product = {
  id: number; // Unique identifier for the product
  title: string; // Name of the product
  price: number; // Price of the product
  rating: number; // Rating out of 5
  category: string; // Category to which the product belongs
  thumbnail: string; // URL to the product thumbnail image
};

// Function to render the star rating for each product
function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating); // Calculate number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if the rating includes a half star

  // Render full stars based on the rating
 for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-500 text-xl" />);
  }

  // Render half star if applicable
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-xl"/>); // Half yellow star
  }

  // Render empty stars to complete the 5-star scale
  while (stars.length < 5) {
    stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-500 text-xl" />);
  }

  // Return the stars as a JSX element
  return <div className="flex items-center">{stars}</div>;
}

// ProductCard Component to display individual product information
export default function ProductCard({ product }: { product: Product }) {
  return (
    // Link to navigate to the product detail page when clicked
    <Link href={`/products/${product.id}`} passHref>
      <div className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition">
        {/* Product Thumbnail */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-58 object-cover rounded mb-3" // Responsive image with fixed aspect ratio
        />

        {/* Product Details */}
        <div className="w-full h-30 m-[2px] bg-gray-200 dark:bg-gray-800 p-3 rounded-b-md">
          {/* Product Title */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.title}
          </h2>

          {/* Product Price */}
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            ${product.price}
          </p>

          {/* Render Stars */}
          <div className="mt-1">{renderStars(product.rating)}</div>
        </div>
      </div>
    </Link>
  );
}
