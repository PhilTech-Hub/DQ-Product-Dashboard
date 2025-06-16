'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import SkeletonCard from './components/SkeletonCard';
import Spinner from './components/Spinner';

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSkeletons, setShowSkeletons] = useState(false);

  const PRODUCTS_PER_PAGE = 10;

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products?limit=200');
      const json = await res.json();
      return json.products;
    },
  });

  // Show skeletons only after slight delay
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      timeout = setTimeout(() => setShowSkeletons(true), 300);
    } else {
      setShowSkeletons(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Filtering, sorting
  useEffect(() => {
    if (!products) return;

    const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
    setCategories(uniqueCategories);

    let updated = [...products];

    if (searchTerm.trim()) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === 'priceLowHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceHighLow') {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'ratingHighLow') {
      updated.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterDropdown
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
        </select>
      </div>

      {/* Loading States */}
      {isLoading ? (
        !showSkeletons ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )
      ) : error ? (
        <p className="text-center text-red-500 mt-6">Failed to load products.</p>
      ) : (
        <>
          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
