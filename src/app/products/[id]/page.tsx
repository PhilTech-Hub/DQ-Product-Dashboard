'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import Spinner from '@/app/components/Spinner';
import SkeletonCard from '@/app/components/SkeletonCard';

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

// ✅ Fetch Function (defined before useQuery)
const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export default function ProductDetails() {
  const [showSkeletons, setShowSkeletons] = useState(false);
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeletons(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    retry: false, // prevent retries for 404
  });

  if (isLoading) {
    return (
      <>
        {!showSkeletons ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
      </>
    );
  }

  if (isError || !product) {
    notFound(); // ✅ Send to custom 404
  }

  function renderStars(rating: number) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500 text-xl" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-xl" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-500 text-xl" />);
    }


    return <div className="flex items-center gap-1">{stars}</div>;
  }

  return (
    <main className="min-h-screen w-full bg-blue-600/20 text-black">
      <header className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 px-6 shadow border-b-2 border-white z-50">
        <Link
          href="/"
          className="bg-gray-400 rounded p-3 py-1 text-white font-bold inline-block"
        >
          ← Back to Products
        </Link>
      </header>

      <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-[10vh]">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {product.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={300}
            className="w-full h-64 object-cover rounded"
          />

          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400">💰 ${product.price}</p>

            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-gray-600 dark:text-gray-300 text-sm">{product.rating}/5</span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Category: <span className="font-medium">{product.category}</span>
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
