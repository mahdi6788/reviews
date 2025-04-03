// import { create } from 'zustand';

// type Review = {
//   id: string;
//   productId: string;
//   rating: number;
//   comment: string;
//   user: string;
// };

// type Store = {
//   reviews: Review[];
//   addReview: (review: Omit<Review, 'id'>) => void;
// };

// export const useStore = create<Store>((set) => ({
//   reviews: [],
//   addReview: (review) =>
//     set((state) => ({
//       reviews: [...state.reviews, { ...review, id: Math.random().toString(36).substring(2) }],
//     })),
// }));