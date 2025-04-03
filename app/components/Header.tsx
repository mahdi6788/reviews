import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="max-w-4xl mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">Product Reviews</Link>
        <div className="space-x-4">
          <Link href="/beauty">Beauty</Link>
          <Link href="/cars">Cars</Link>
        </div>
      </nav>
    </header>
  );
}