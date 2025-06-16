// Import necessary modules
import { notFound } from 'next/navigation'; // Handles 404 errors in Next.js routes
import type { Metadata } from 'next'; // TypeScript type for metadata generation
import Link from 'next/link'; // Next.js Link component for navigation
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // React icons for filled and empty stars
import { FaStarHalfAlt } from 'react-icons/fa'; // React icon for half-filled star

// Define the Product type structure for type safety
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  brand: string;
  thumbnail: string;
};

// Function to generate static paths for products (static generation for dynamic routes)
export async function generateStaticParams() {
  // Fetch all products (limit of 100 for demonstration)
  const res = await fetch('https://dummyjson.com/products?limit=100');
  const data = await res.json();

  // Return an array of product IDs as params
  return data.products.map((product: Product) => ({
    id: product.id.toString(), // Return the product ID as a string for URL purposes
  }));
}

// Function to generate dynamic metadata for SEO optimization
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Fetch the specific product details based on the provided product ID
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  
  // If the product is not found, return fallback metadata
  if (!res.ok) {
    return {
      title: 'Product Not Found', // Fallback title
      description: 'No product found for this ID.', // Fallback description
    };
  }

  // Parse the product data if found
  const product: Product = await res.json();

  // Return dynamic metadata based on the product details
  return {
    title: product.title, // Use the product title as the page title
    description: product.description, // Use the product description for SEO
  };
}

// Function to render star ratings for products
function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there is a half star

  // Add full stars to the array
  for (let i = 0; i < fullStars; i++) {
    stars.push(<AiFillStar key={`full-${i}`} className="text-yellow-500 text-xl" />);
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-xl" />);
  }

  // Add empty stars to make sure there are always 5 stars
  while (stars.length < 5) {
    stars.push(<AiOutlineStar key={`empty-${stars.length}`} className="text-yellow-500 text-xl" />);
  }

  // Return the JSX for rendering the stars
  return <div className="flex items-center gap-1">{stars}</div>;
}

// ProductDetail Component - the main page for rendering a product's details
export default async function ProductDetail({ params }: { params: { id: string } }) {
  // Fetch product data based on the product ID provided in the URL parameters
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  // If the product is not found, trigger the notFound function to show a 404 page
  if (!res.ok) {
    notFound(); // This method is a Next.js built-in function for handling 404 errors
  }

  // Parse the product data
  const product: Product = await res.json();

  return (
    <main className="min-h-screen w-full bg-blue-600/20 text-black">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 px-6 shadow border-b-2 border-white z-50">
        <Link href="/" className="bg-gray-400 rounded p-3 m-[0] py-1 text-white hover:none mb-4 inline-block font-bold">
          ← Back to Products
        </Link>
      </header>

      {/* Product Details Section */}
      <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-[9vh]">
        {/* Product Title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {product.title}
        </h1>

        {/* Product Image and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[5vh]">
          {/* Product Image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-64 object-cover rounded"
          />
          
          {/* Product Information */}
          <div className="flex flex-col gap-4">
            {/* Product Description */}
            <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>

            {/* Product Price */}
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">
              💰 ${product.price}
            </p>

            {/* Product Rating */}
            <div className="flex items-center gap-2">
              {renderStars(product.rating)} {/* Display star ratings */}
              <span className="text-gray-600 dark:text-gray-300 text-sm">{product.rating}/5</span>
            </div>

            {/* Product Category */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Category: <span className="font-medium">{product.category}</span>
            </p>

            {/* Product Brand */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
