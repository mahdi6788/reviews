import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Product Reviews</h1>
      <p className="mb-6">Explore reviews and ratings for your favorite products.</p>
      <div className="space-x-4">
        <Link href="/beauty" className="text-blue-500 underline">Beauty</Link>
        <Link href="/cars" className="text-blue-500 underline">Cars</Link>
      </div>
    </div>
  );
}