export async function fetchProducts(category: string) {
  const res = await fetch(`/api/products?category=${category}`, {
    cache: "no-store", // Ensure fresh data
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function submitReview(review: {
  productId: string;
  rating: number;
  comment: string;
  user?: string;
}) {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
}
