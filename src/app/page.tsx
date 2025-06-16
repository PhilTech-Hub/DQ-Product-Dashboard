'use client'; // Ensures this file runs in the browser (Next.js App Router-specific directive)

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import SkeletonCard from './components/SkeletonCard';
import Spinner from './components/Spinner';

// Define the Product type for strong typing and IntelliSense support
type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

export default function Home() {
  // 🔧 State for user interaction and UI control
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSkeletons, setShowSkeletons] = useState(false); // UX enhancement for perceived performance

  const PRODUCTS_PER_PAGE = 10;

  /**
   * ✅ Fetch products using React Query for caching, loading, and error management.
   * Fetching 200 products and memoizing under the key 'products'.
   */
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products?limit=200');
      const json = await res.json();
      return json.products;
    },
  });

  /**
   * 🕓 Delay showing skeletons until 300ms to avoid flicker on fast connections.
   * This ensures skeletons are only shown when data loading actually feels "slow".
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => setShowSkeletons(true), 300);
    } else {
      setShowSkeletons(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  /**
   * 📦 Apply filtering, search, and sorting when dependencies change.
   * This includes search term, selected category, or sort order.
   * Resets pagination to page 1 to avoid being stranded on an empty page.
   */
  useEffect(() => {
    if (!products) return;

    // Extract unique categories for the filter dropdown
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
    setCategories(uniqueCategories);

    // Begin with the full product list
    let updated = [...products];

    // 🔍 Filter by search term (case-insensitive match on title)
    if (searchTerm.trim()) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🏷️ Filter by selected category
    if (selectedCategory) {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    // ↕️ Apply sorting
    if (sortOrder === 'priceLowHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'priceHighLow') {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'ratingHighLow') {
      updated.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updated);
    setCurrentPage(1); // Reset to first page on new filter/sort
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // 📄 Calculate pagination boundaries
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <main className="min-h-screen w-full bg-blue-600/20 text-black">
      {/* 📌 App Header */}
      <header className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 px-6 shadow border-b-2 border-white z-50">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
      </header>

      {/* 🚀 Main Container */}
      <div className="p-4 max-w-6xl mx-auto mt-[7vh]">

        {/* 🎛️ Search, Filter, and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-10 mb-8">
          <div className='bg-white border border-gray-300 rounded px-2 py-1 w-full sm:w-68'>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className='bg-white border border-gray-300 rounded px-2 py-2 w-full sm:w-68'>
            <FilterDropdown
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='bg-white border border-gray-200 rounded px-2 py-2 w-full sm:w-68 h-full sm:h-14'
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="ratingHighLow">Rating: High to Low</option>
          </select>
        </div>

        {/* ⏳ Loading States with graceful degradation */}
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
          // ❌ Error state with graceful fallback
          <div className="text-center text-red-500 mt-6">
            <p className="font-semibold text-lg">Oops! Something went wrong.</p>
            <p className="text-sm">{(error as Error).message || 'Unable to fetch products from the server.'}</p>
          </div>  
        ) : (
          <>
            {/* 🛍️ Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* 📘 Pagination Controls */}
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

      {/* 📎 Footer */}
      <footer className="w-full bg-gray-700 text-white py-6 px-6 mt-12 shadow-inner border-t border-gray-700">
        <div className="max-w-6xl mx-auto flex justify-center items-center text-center">
          <p className="text-sm text-gray-200">
            Product Dashboard | &copy; {new Date().getFullYear()} Philemon Victor. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
