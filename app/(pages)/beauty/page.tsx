import { Review } from '@prisma/client';
import ProductCard from '../../components/ProductCard';
import { prisma } from '@/app/lib/prisma';

interface Product {
  id: string;
  name: string;
  description: string;
  reviews: Review[]; 
}

export const revalidate = 0; // Force fresh data

export default async function Beauty() {
  const products = await prisma.product.findMany({
    where: { category: 'Beauty' },
    include: { reviews: true },
  });

  // Seed some initial data
  if (products.length === 0) {
    await prisma.product.createMany({
      data: [
        { name: 'Moisturizer X', description: 'A hydrating cream for all skin types.', category: 'Beauty' },
        { name: 'Lipstick Y', description: 'Long-lasting color with a matte finish.', category: 'Beauty' },
      ],
    });
    const newProducts = await prisma.product.findMany({
      where: { category: 'Beauty' },
      include: { reviews: true },
    });
    return <BeautyPage products={newProducts} />;
  }

  return <BeautyPage products={products} />;
}

function BeautyPage({ products }: { products: Product[] }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Beauty Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            reviews={product.reviews}
          />
        ))}
      </div>
    </div>
  );
}