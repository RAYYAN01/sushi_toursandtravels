import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import { getBreadcrumbListSchema } from '@/lib/schema';
import LandingHero from '@/components/LandingHero';

export const metadata: Metadata = {
  title: 'Travel Stories & Destination Guides',
  description:
    'Travel diaries and destination guides from Sushi Travels — honest notes on places worth visiting, written for travellers planning their own trip.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Travel Stories & Destination Guides | Sushi Travels',
    description:
      'Travel diaries and destination guides from Sushi Travels — honest notes on places worth visiting, written for travellers planning their own trip.',
    url: '/blog',
    images: [{ url: blogPosts[0]?.coverImage ?? '/logo-light-v3.png', width: 800, height: 600, alt: 'Sushi Travels blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Stories & Destination Guides | Sushi Travels',
    description:
      'Travel diaries and destination guides from Sushi Travels — honest notes on places worth visiting, written for travellers planning their own trip.',
    images: [blogPosts[0]?.coverImage ?? '/logo-light-v3.png'],
  },
};

export default function BlogIndexPage() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
  ];

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />

      <LandingHero
        h1="Travel Stories from Sushi Travels"
        subtitle="Honest travel diaries and destination notes — written for people planning their own trip, not just a highlight reel."
        image={blogPosts[0]?.coverImage ?? '/logo-light-v3.png'}
        crumbs={[{ name: 'Blog', href: '/blog' }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {blogPosts.length === 0 ? (
          <p className="text-center text-navy-light">More stories are on the way — check back soon.</p>
        ) : (
          <div className="space-y-10">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-navy-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Cover image "holding" the story — the full gallery lives on the detail page */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-warm/30">
                  <Image
                    src={post.coverImage}
                    alt={`Sushi Travels blog — ${post.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-center"
                    priority
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                    Travel Diary
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-1.5 text-xs text-navy-light mb-3">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <h2 className="font-serif font-bold text-2xl text-navy group-hover:text-primary transition-colors duration-200 mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-navy leading-relaxed mb-5">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm font-bold text-primary">
                    Read the full story
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
