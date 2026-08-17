import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// Global SEO Metadata configurations
export const metadata: Metadata = {
  metadataBase: new URL('https://sushitravels.com'),
  title: {
    default: 'Sushi Travels | Car & Tempo Traveller Rental Bangalore',
    template: '%s | Sushi Travels'
  },
  description: 'Sushi Tours & Travels offers chauffeur-driven car & Tempo Traveller rentals in Bangalore: 9/12/17-seater vans, outstation cabs, airport transfers & local drops.',
  keywords: [
    'Sushi Tours & Travels',
    'Sushi Tours and Travels Bangalore',
    'Sushi Travels Bangalore',
    '9 seater tempo traveller Bangalore',
    '12 seater tempo traveller Bangalore',
    '17 seater tempo traveller Bangalore',
    'tempo traveller rental Bangalore',
    'tempo traveller hire Bangalore',
    'outstation cab service Bangalore',
    'outstation taxi Bangalore',
    'Car hire with driver Bangalore',
    'Airport taxi Bangalore',
    'Rent vehicle with driver'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Sushi Travels | Car Rental & Chauffeur Services India',
    description: 'Rent premium vehicles with professional drivers for outstation road trips and local travel in India. Transparent rates, GPS enabled fleet, and warm hospitality.',
    url: 'https://sushitravels.com',
    siteName: 'Sushi Travels',
    images: [
      {
        url: 'https://sushitravels.com/fleet/force-urbania-front-01.webp',
        width: 800,
        height: 600,
        alt: 'Sushi Travels Chauffeur Services India'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sushi Travels | Car Rental with Driver India',
    description: 'Book verified drivers and premium vehicles across South India. Safe, transparent pricing, and 24/7 service.',
    images: ['https://sushitravels.com/fleet/force-urbania-front-01.webp']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-cream font-sans text-navy">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-51P2C6Y9D7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-51P2C6Y9D7');
          `}
        </Script>

        {/* Premium Loading Screen Overlay */}
        <LoadingScreen />
        
        {/* Route dependent header/footer wrapper */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
