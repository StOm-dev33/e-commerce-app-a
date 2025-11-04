import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/lib/hooks/use-cart';
import { ToastProvider } from '@/components/ui/toast';

export const metadata = {
  title: 'Audiophile | Premium Audio Gear',
  description: 'Premium audio gear for audiophiles. Shop headphones, speakers, and earphones.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <body>
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}