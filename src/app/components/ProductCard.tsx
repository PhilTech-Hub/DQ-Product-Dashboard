'use client';

import Link from 'next/link';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<AiFillStar key={`full-${i}`} className="text-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
  }

  while (stars.length < 5) {
    stars.push(<AiOutlineStar key={`empty-${stars.length}`} className="text-yellow-500" />);
  }

  return <div className="flex items-center">{stars}</div>;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-58 object-cover rounded mb-3"
        />

        <div className="w-full h-30 m-[2px] bg-gray-200 dark:bg-gray-800 p-3 rounded-b-md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            ${product.price}
          </p>
          <div className="mt-1">{renderStars(product.rating)}</div>
        </div>
      </div>
    </Link>
  );
}
