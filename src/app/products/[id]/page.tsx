import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

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

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!res.ok) {
    notFound(); // Proper use (not return)
  }

  const product: Product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover rounded"
        />
        <div className="flex flex-col gap-4">
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold">💰 ${product.price}</p>
          <p className="text-yellow-500 font-medium">⭐ {product.rating}</p>
          <p className="text-gray-500 text-sm">Category: {product.category}</p>
          <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
        </div>
      </div>
    </div>
  );
}
