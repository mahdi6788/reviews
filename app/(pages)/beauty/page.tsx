"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../lib/api";
import { Review } from "@prisma/client";
interface Product {
  id: string;
  name: string;
  description: string;
  reviews: Review[];
}

export default function Beauty() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "Beauty"],
    queryFn: () => fetchProducts("Beauty"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error loading products: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Beauty Products</h1>
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
              category="Beauty"
            />
          ))}
        </div>
      )}
    </div>
  );
}
