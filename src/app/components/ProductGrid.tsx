'use client';

import ProductCard from './ProductCard';

// Define the structure of the Product type
type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

// Main ProductGrid component that accepts a list of products
export default function ProductGrid({ products }: { products: Product[] }) {
  // Handle the case where no products are available
  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  // Return a grid layout of product cards
  return (
    <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Loop through the products array and render a ProductCard for each product */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
