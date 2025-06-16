import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';

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

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=100');
  const data = await res.json();

  return data.products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  if (!res.ok) {
    return {
      title: 'Product Not Found',
      description: 'No product found for this ID.',
    };
  }

  const product: Product = await res.json();

  return {
    title: product.title,
    description: product.description,
  };
}

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<AiFillStar key={`full-${i}`} className="text-yellow-500 text-xl" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-500 text-xl" />);
  }

  while (stars.length < 5) {
    stars.push(<AiOutlineStar key={`empty-${stars.length}`} className="text-yellow-500 text-xl" />);
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!res.ok) {
    notFound(); // Proper use (not return)
  }

  const product: Product = await res.json();

  return (
    <main className="min-h-screen w-full bg-blue-600/20 text-black">
      <header className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 px-6 shadow border-b-2 border-white z-50">
        <Link href="/" className="bg-gray-400 rounded p-3 m-[0] py-1 text-white hover:none mb-4 inline-block font-bold">
        ← Back to Products
      </Link>
      </header>
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg mt-[9vh]">
      
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {product.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[5vh]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover rounded"
        />
        <div className="flex flex-col gap-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            💰 ${product.price}
          </p>
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
