import { prisma } from "./app/lib/prisma";

async function seed() {
  await prisma.product.createMany({
    data: [
      { name: 'Moisturizer X', description: 'A hydrating cream for all skin types.', category: 'Beauty' },
      { name: 'Lipstick Y', description: 'Long-lasting color with a matte finish.', category: 'Beauty' },
      { name: 'Sedan Z', description: 'A reliable family car with great mileage.', category: 'Cars' },
      { name: 'SUV W', description: 'Spacious and perfect for adventures.', category: 'Cars' },
    ],
  });
  console.log('Seeded products');
}

seed().then(() => prisma.$disconnect());