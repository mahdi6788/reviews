import RatingStars from './RatingStars';
import ReviewForm from './ReviewForm';
import { Review } from '@prisma/client';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  reviews: Review[];
}

export default function ProductCard({ id, name, description, reviews }: ProductCardProps) {
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="mt-2">
        <RatingStars rating={averageRating} />
        <span className="ml-2 text-sm">({reviews.length} reviews)</span>
      </div>
      <div className="mt-4">
        <h3 className="font-medium">Reviews:</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-t py-2">
              <RatingStars rating={review.rating} />
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">— {review.user}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4">
        <ReviewForm productId={id} />
      </div>
    </div>
  );
}