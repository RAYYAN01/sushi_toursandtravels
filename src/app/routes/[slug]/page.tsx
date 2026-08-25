import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Route as RouteIcon, Clock, ArrowUpRight } from 'lucide-react';
import { routePages, getRoutePage } from '@/lib/routes';
import { vehiclePages } from '@/lib/vehiclePages';
import { packages } from '@/lib/packages';
import { getBreadcrumbListSchema, getFAQSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';

export function generateStaticParams() {
  return routePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getRoutePage(slug);
  if (!page) return {};
  const url = `/routes/${page.slug}`;
  // The root layout's title template auto-appends "| Sushi Travels" to the
  // plain `title`, but NOT to openGraph/twitter titles (those don't inherit
  // the template) — so those need the suffix built explicitly here.
  const brandedTitle = `${page.title} | Sushi Travels`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: page.metaDescription,
      url,
      images: [{ url: page.heroImage, width: 800, height: 600, alt: page.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: page.metaDescription,
      images: [page.heroImage],
    },
  };
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getRoutePage(slug);
  if (!page) notFound();

  const url = `/routes/${page.slug}`;
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Routes', item: '/routes' },
    { name: page.h1, item: url },
  ];

  const relatedVehicles = page.relatedVehicleSlugs
    .map((s) => vehiclePages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const matchingPackage = page.packageSlug ? packages.find((p) => p.slug === page.packageSlug) : undefined;

  const whatsappMessage = `Hello Sushi Tours & Travels, I would like a fare quote for a Bangalore to ${page.destination} cab. Please share vehicle options and pricing.`;

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(page.faqs)) }}
      />

      <LandingHero
        h1={page.h1}
        subtitle={page.heroSubtitle}
        crumbs={[
          { name: 'Routes', href: '/routes' },
          { name: page.h1, href: url },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{page.geoSummary}</p>
        </section>

        {/* Distance / duration stat row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-navy-light/10 p-6 flex items-center gap-4">
            <RouteIcon className="w-8 h-8 text-primary shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-navy-light font-bold">Distance</div>
              <div className="text-lg font-serif font-bold text-navy">{page.distance}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-navy-light/10 p-6 flex items-center gap-4">
            <Clock className="w-8 h-8 text-primary shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-navy-light font-bold">Travel Time</div>
              <div className="text-lg font-serif font-bold text-navy">{page.duration}</div>
            </div>
          </div>
        </section>

        <section className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm">
          <Image src={page.heroImage} alt={`Bangalore to ${page.destination} cab route`} fill sizes="100vw" className="object-cover" />
        </section>

        <section className="space-y-4 text-sm sm:text-base text-navy-light leading-relaxed">
          {page.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>

        {/* Vehicle suggestion + pricing enquiry note (no invented fare) */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8 space-y-3">
          <h2 className="font-serif font-bold text-xl text-navy">Vehicle &amp; Fare Guidance</h2>
          <p className="text-sm text-navy-light leading-relaxed">
            <strong className="text-navy">Suggested vehicle:</strong> {page.vehicleSuggestion}
          </p>
          <p className="text-sm text-navy-light leading-relaxed">
            Exact route fares depend on the vehicle selected, one-way vs. round-trip requirement, trip duration and
            applicable tolls/permits, so we don&apos;t publish a fixed fare for this route. Call or WhatsApp us with your
            travel dates and group size and our team will confirm an accurate quote.
          </p>
          {matchingPackage && (
            <p className="text-sm text-navy-light leading-relaxed pt-2 border-t border-navy-light/10">
              Prefer a ready-made itinerary?{' '}
              <Link href="/tours-and-packages" className="text-primary font-semibold hover:text-primary-dark inline-flex items-center">
                See our {matchingPackage.title} package on Tours &amp; Packages
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
              .
            </p>
          )}
        </section>

        <FaqAccordion faqs={page.faqs} />

        <CTABand
          heading={`Get a Bangalore to ${page.destination} Fare Quote`}
          subheading="Call, WhatsApp, or submit a quick enquiry — our dispatch team will confirm vehicle options and pricing."
          whatsappMessage={whatsappMessage}
        />

        <RelatedLinks
          groups={[
            {
              heading: 'Recommended Vehicles',
              links: relatedVehicles.map((p) => ({ label: p.h1, href: `/vehicles/${p.slug}` })),
            },
            {
              heading: 'Related Services',
              links: [
                { label: 'Outstation Cab Service from Bangalore', href: '/services/outstation-cab-bangalore' },
                { label: 'Bangalore Sightseeing Cab', href: '/services/bangalore-sightseeing-cab' },
              ],
            },
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Browse Tours & Packages', href: '/tours-and-packages' },
                { label: 'Book online', href: '/booking' },
                { label: 'Contact Sushi Travels', href: '/contact' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
