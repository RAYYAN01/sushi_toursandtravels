import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Route as RouteIcon } from 'lucide-react';
import { routePages } from '@/lib/routes';
import { getBreadcrumbListSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';

export const metadata: Metadata = {
  title: 'Bangalore Outstation Cab Routes | Sushi Travels',
  description:
    'Distance, travel time and vehicle guidance for popular Bangalore outstation cab routes — Mysore, Coorg, Ooty, Hampi, Tirupati, Pondicherry and more.',
  alternates: { canonical: '/routes' },
  openGraph: {
    title: 'Bangalore Outstation Cab Routes | Sushi Travels',
    description:
      'Distance, travel time and vehicle guidance for popular Bangalore outstation cab routes — Mysore, Coorg, Ooty, Hampi, Tirupati, Pondicherry and more.',
    url: '/routes',
    images: [{ url: '/coorg.webp', width: 800, height: 600, alt: 'Bangalore outstation cab routes served by Sushi Travels' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangalore Outstation Cab Routes | Sushi Travels',
    description:
      'Distance, travel time and vehicle guidance for popular Bangalore outstation cab routes — Mysore, Coorg, Ooty, Hampi, Tirupati, Pondicherry and more.',
    images: ['/coorg.webp'],
  },
};

export default function RoutesHubPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Routes', item: '/routes' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />

      <LandingHero
        h1="Popular Bangalore Outstation Cab Routes"
        subtitle="Distance, travel time and vehicle guidance for the South India routes we drive most often."
        image="/coorg.webp"
        crumbs={[{ name: 'Routes', href: '/routes' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {routePages.map((page) => (
            <Link
              key={page.slug}
              href={`/routes/${page.slug}`}
              className="group bg-white rounded-2xl border border-navy-light/10 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-cream-warm/30">
                <Image
                  src={page.heroImage}
                  alt={page.h1}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-primary-dark font-semibold uppercase tracking-wider mb-2">
                  <RouteIcon className="w-3.5 h-3.5" />
                  <span>{page.distance}</span>
                </div>
                <h2 className="font-serif font-bold text-lg text-navy group-hover:text-primary transition-colors mb-2">
                  {page.h1}
                </h2>
                <p className="text-xs text-navy-light mb-4 flex-1">{page.duration}</p>
                <span className="inline-flex items-center text-sm font-bold text-primary">
                  View route details
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
