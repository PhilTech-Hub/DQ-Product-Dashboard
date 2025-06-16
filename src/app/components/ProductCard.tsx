import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded shadow hover:shadow-md transition p-4 bg-white dark:bg-zinc-800 cursor-pointer">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">${product.price}</p>
        <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
      </div>
    </Link>
  );
}
