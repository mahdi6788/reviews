import { PrismaClient } from '@prisma/client';
import ProductCard from '../../components/ProductCard';

const prisma = new PrismaClient();

export default async function Cars() {
  const products = await prisma.product.findMany({
    where: { category: 'Cars' },
    include: { reviews: true },
  });

  if (products.length === 0) {
    await prisma.product.createMany({
      data: [
        { name: 'Sedan Z', description: 'A reliable family car with great mileage.', category: 'Cars' },
        { name: 'SUV W', description: 'Spacious and perfect for adventures.', category: 'Cars' },
      ],
    });
    const newProducts = await prisma.product.findMany({
      where: { category: 'Cars' },
      include: { reviews: true },
    });
    return <CarsPage products={newProducts} />;
  }

  return <CarsPage products={products} />;
}

function CarsPage({ products }: { products: any[] }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cars</h1>
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