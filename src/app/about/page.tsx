import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, Target, ShieldCheck } from 'lucide-react';
import { getBreadcrumbListSchema } from '@/lib/schema';

export const metadata = {
  title: 'About Sushi Travels | Chauffeur Car Rental India',
  description: 'Learn about Sushi Travels, a premium car rental agency based in Bangalore. 15+ years experience, 50+ vehicles, and verified professional drivers.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Sushi Travels | Chauffeur Car Rental India',
    description: 'Learn about Sushi Travels, a premium car rental agency based in Bangalore. 15+ years experience, 50+ vehicles, and verified professional drivers.',
    url: '/about',
    images: [{ url: '/videos/about-scene-13-poster.webp', width: 800, height: 600, alt: 'About Sushi Travels — chauffeur car rental agency in Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sushi Travels | Chauffeur Car Rental India',
    description: 'Learn about Sushi Travels, a premium car rental agency based in Bangalore. 15+ years experience, 50+ vehicles, and verified professional drivers.',
    images: ['/videos/about-scene-13-poster.webp'],
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'About Us', item: '/about' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />

      {/* About Hero Banner — pulled up under the fixed transparent header, same pattern as the Fleet/Home pages */}
      <div className="relative -mt-[72px] md:-mt-[80px] min-h-screen flex items-center justify-center px-4 text-center text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src="/videos/about-scene-13.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/about-scene-13-poster.webp"
        />
        <div className="absolute inset-0 bg-navy-dark/75 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            About Sushi Travels — Our Story & Values
          </h1>
          <p className="text-sm md:text-base text-cream-warm max-w-2xl mx-auto">
            Providing premium, transparent road rental hospitality across the Indian subcontinent since 2011.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Story Section with Image Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-navy">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-dark">Every Road, A New Story</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Pioneering Safe Mountain & Highway Trips in South India
            </h2>
            <p className="text-sm text-navy leading-relaxed">
              Founded in Bangalore, <strong>Sushi Travels</strong> started with a vision of bridging the gap between professional, verified hospitality and regional road trips in India. Over fifteen years, we have grown into one of the region&apos;s most trusted travel partners, specializing exclusively in high-capacity, premium group vehicles — see our fleet and chauffeur details below.
            </p>
            <p className="text-sm text-navy leading-relaxed">
              Our service model is built around <strong>outstation round-trips</strong>. We believe the best parts of travel happen when you&apos;re not rushed — stopping at roadside viewpoints, exploring local heritage sites, and dining at hidden gems. By focusing on dedicated round-trip services, we give groups the freedom to set their own itinerary and travel together at a relaxed pace, with a private vehicle and chauffeur that stay with you throughout the holiday.
            </p>
            <p className="text-sm text-navy leading-relaxed">
              We specialize in mountain ghat route navigation (the hairpin bends of Ooty, Coorg, Wayanad, and Munnar), outstation sightseeing tours, and long-distance pilgrimage routes such as Bangalore to Tirupati. Our fleet undergoes rigorous safety checks and multi-point mechanical inspections before every journey.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-navy-light/10 bg-cream-warm">
            <Image
              src="/mysuru.webp"
              alt="Mysore Palace — one of the popular South India destinations Sushi Travels serves"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Milestone Stats Banner */}
        <section className="bg-navy rounded-3xl text-white p-8 sm:p-12 shadow-xl border border-navy-light/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* Stat 1 */}
            <div className="pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-sans font-bold text-primary-light">50+</div>
              <div className="text-xs sm:text-sm uppercase tracking-wider text-cream-warm font-semibold mt-2">
                GPS Monitored Cars
              </div>
            </div>

            {/* Stat 2 */}
            <div className="pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-sans font-bold text-primary-light">10k+</div>
              <div className="text-xs sm:text-sm uppercase tracking-wider text-cream-warm font-semibold mt-2">
                Delighted Travelers
              </div>
            </div>

            {/* Stat 3 */}
            <div className="pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-sans font-bold text-primary-light">15+</div>
              <div className="text-xs sm:text-sm uppercase tracking-wider text-cream-warm font-semibold mt-2">
                Years Travel Experience
              </div>
            </div>

          </div>
        </section>

        {/* Fleet & Chauffeur Philosophy Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-navy">
          <div className="lg:col-span-5 order-last lg:order-first relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-navy-light/10 bg-cream-warm">
            <Image
              src="/coorg.webp"
              alt="Coorg — one of the popular South India destinations Sushi Travels serves"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-dark">Our Fleet & Driver Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Crafting Premium Group Travel Experiences
            </h2>
            <div className="text-sm text-navy leading-relaxed space-y-4 font-sans">
              <p>
                At Sushi Travels, we have tailored our operations around three primary vehicle categories to ensure we offer the absolute best in class for large groups. First, our <strong>Tempo Travellers (9 to 17 seats)</strong> are the classic choice for family holidays and pilgrimage trips, featuring deep pushback seats, individual air vents, and visual entertainment systems. Second, the <strong>Force Urbania (10 to 17 seats)</strong> represents the new age of premium group mobility, offering a sleek aerodynamic profile, high headroom, ergonomic seating, and passenger car-like cabin noise levels. Third, our large <strong>Tourist Buses and Luxury Coaches (22 to 50 seats)</strong> offer spacious layouts, heavy-duty air conditioning, and extensive luggage capacity for large company outings and wedding groups.
              </p>
              <p>
                However, a premium vehicle is only half of the journey. What truly distinguishes Sushi Travels is our team of dedicated professional chauffeurs. Every chauffeur on our roster undergoes strict police verification, background checks, and driving capability audits on both high-speed highways and steep mountain ghat sections. More than just drivers, they serve as courteous assistants, helping with baggage, recommending quality dining spots along the routes, and navigating checkposts and tolls with ease. By combining top-tier vehicles with verified, guest-focused drivers, we deliver a reliable round-trip experience you can trust every single time.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl border border-navy-light/10 p-8 space-y-4 shadow-sm hover:shadow transition">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-navy">Our Mission</h3>
            <p className="text-xs text-navy leading-relaxed">
              To provide safe, secure, and fully transparent vehicle hire with drivers across India. We aim to keep pricing fair and routes optimized.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl border border-navy-light/10 p-8 space-y-4 shadow-sm hover:shadow transition">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-navy">Our Vision</h3>
            <p className="text-xs text-navy leading-relaxed">
              To become the leading chauffeur-driven car rental brand in South India, known for pristine vehicle quality and warm hospitality.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl border border-navy-light/10 p-8 space-y-4 shadow-sm hover:shadow transition">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-navy">Core Hospitality</h3>
            <p className="text-xs text-navy leading-relaxed">
              We treat customers with warmth, respect, and honesty. Our drivers act as helpful tour guides and route assistants.
            </p>
          </div>
        </section>

        {/* Internal links to the new service/vehicle/route page network */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-8 text-center space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy">Learn More About What We Offer</h2>
          <p className="text-sm text-navy-light max-w-2xl mx-auto">
            Explore our{' '}
            <Link href="/vehicles" className="text-primary font-semibold hover:text-primary-dark">
              vehicle rental pages
            </Link>{' '}
            for real pricing by category,{' '}
            <Link href="/services" className="text-primary font-semibold hover:text-primary-dark">
              our services
            </Link>{' '}
            for airport, outstation, corporate and wedding travel, or our{' '}
            <Link href="/routes" className="text-primary font-semibold hover:text-primary-dark">
              popular outstation route guides
            </Link>{' '}
            for distance and travel-time details.
          </p>
        </section>


      </div>
    </div>
  );
}
