"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitReview } from '../lib/api';

interface ReviewFormProps {
  productId: string;
  category: string; // Add category to invalidate correct query
}

export default function ReviewForm({ productId, category }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['products', category] });
    },
    onError: (error) => {
      console.error('Error submitting review:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5 || !comment.trim()) return;

    mutation.mutate({
      productId,
      rating,
      comment,
      user: 'Anonymous',
    });
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
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}