"use client";

import { useState } from 'react';

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5 || !comment.trim()) {
      console.log('Validation failed:', { rating, comment });
      return;
    }

    console.log('Form submitted, sending request:', { productId, rating, comment });

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment, user: 'Anonymous' }),
      });

      console.log('Fetch response status:', res.status);
      const data = await res.json();
      console.log('Fetch response data:', data);

      if (res.ok) {
        setRating(0);
        setComment('');
        window.location.reload();
      } else {
        console.error('Submission failed:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block">Review:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
          rows={4}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  );
}