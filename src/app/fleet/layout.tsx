import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '9, 12 & 17 Seater Tempo Traveller Rental Bangalore | Sushi Travels',
  description:
    'Book 9 seater, 12 seater & 17 seater Tempo Traveller rental in Bangalore with Sushi Tours & Travels. Plus sedans, SUVs, and mini coach hire with verified drivers for outstation, corporate & group travel.',
  alternates: {
    canonical: '/fleet',
  },
  openGraph: {
    title: '9, 12 & 17 Seater Tempo Traveller Rental Bangalore | Sushi Travels',
    description:
      'Browse the full Sushi Tours & Travels fleet: 9/12/17 seater Tempo Travellers, sedans, SUVs, and a mini coach — all with verified drivers.',
    url: '/fleet',
  },
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
