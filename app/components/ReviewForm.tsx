"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitReview } from '../lib/api';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface ReviewFormProps {
  productId: string;
  category: string;
}

export default function ReviewForm({ productId, category }: ReviewFormProps) {
  const [rating, setRating] = useState(0); // Selected rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
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
    if (rating < 1 || !comment.trim()) return;

    mutation.mutate({
      productId,
      rating,
      comment,
      user: 'Anonymous',
    });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          className="cursor-pointer text-2xl"
        >
          {i <= (hoverRating || rating) ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-yellow-400" />
          )}
        </span>
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Rating:</label>
        {renderStars()}
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