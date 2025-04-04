"use client";

import { Review } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../lib/api";

interface Product {
  id: string;
  name: string;
  description: string;
  reviews: Review[];
}

export default function Cars() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "Cars"],
    queryFn: () => fetchProducts("Cars"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error loading products: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cars</h1>
      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              reviews={product.reviews}
              category="Cars"
            />
          ))}
        </div>
      )}
    </div>
  );
}
