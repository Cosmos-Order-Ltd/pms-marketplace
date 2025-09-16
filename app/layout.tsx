import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PMS Marketplace - Property Listings & Vendor Services',
  description: 'Discover and list properties, connect with verified vendors, and grow your hospitality business through our comprehensive marketplace platform.',
  keywords: ['property marketplace', 'hotel listings', 'vacation rentals', 'vendor services', 'hospitality marketplace', 'cyprus properties'],
  authors: [{ name: 'Cosmos Order Ltd' }],
  creator: 'Cosmos Order Ltd',
  publisher: 'Cosmos Order Ltd',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marketplace.pms.cosmos',
    siteName: 'PMS Marketplace',
    title: 'PMS Marketplace - Property Listings & Vendor Services',
    description: 'Discover and list properties, connect with verified vendors, and grow your hospitality business through our comprehensive marketplace platform.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PMS Marketplace'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PMS Marketplace - Property Listings & Vendor Services',
    description: 'Discover and list properties, connect with verified vendors, and grow your hospitality business through our comprehensive marketplace platform.',
    images: ['/og-image.jpg']
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              fontSize: '14px',
              borderRadius: '8px',
            },
            success: {
              style: {
                background: '#10b981',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#ef4444',
              },
            },
            loading: {
              style: {
                background: '#3b82f6',
              },
            },
          }}
        />
      </body>
    </html>
  );
}