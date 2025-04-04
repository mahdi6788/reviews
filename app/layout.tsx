import './globals.css';
import Header from './components/Header';
import { QueryProvider } from './lib/query-client';

export const metadata = {
  title: 'Product Reviews',
  description: 'A site for product reviews and ratings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <QueryProvider>
        <Header />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}