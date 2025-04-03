import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Product Reviews',
  description: 'A site for product reviews and ratings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}