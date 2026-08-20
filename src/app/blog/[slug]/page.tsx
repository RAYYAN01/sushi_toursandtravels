import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/blog';
import { getBreadcrumbListSchema, getFAQSchema, getBlogPostingSchema } from '@/lib/schema';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import RelatedLinks from '@/components/RelatedLinks';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  // The root layout's title template auto-appends "| Sushi Travels" to the
  // plain `title`, but NOT to openGraph/twitter titles (those don't inherit
  // the template) — so those need the suffix built explicitly here, same
  // pattern as the vehicle/service/route landing pages.
  const brandedTitle = `${post.title} | Sushi Travels`;
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.publishDate,
      images: [{ url: post.coverImage, width: 800, height: 600, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `/blog/${post.slug}`;
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: url },
  ];

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-cream min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbListSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBlogPostingSchema({
              headline: post.title,
              description: post.metaDescription,
              url,
              image: post.coverImage,
              datePublished: post.publishDate,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(post.faqs)) }}
      />

      {/* Hero — cover photo with title, same flat-wash pattern as the rest of the site's heroes */}
      <div
        className="relative -mt-[72px] md:-mt-[80px] min-h-[70vh] flex items-end bg-cover bg-center px-4 text-white overflow-hidden"
        style={{ backgroundImage: `url('${post.coverImage}')` }}
      >
        <div className="absolute inset-0 bg-navy-dark/60 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto pb-12 space-y-4 text-center">
          <span className="inline-block bg-primary text-white font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
            Travel Diary
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-5 text-xs text-cream-warm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.publishDate}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* GEO-style factual summary */}
        <section className="bg-white rounded-2xl border border-navy-light/10 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-navy leading-relaxed">{post.geoSummary}</p>
        </section>

        {/* Story content */}
        <section className="space-y-5 text-sm sm:text-base text-navy leading-relaxed">
          {post.bodyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>

        {/* Video */}
        {post.video && (
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-xl text-navy">A Look Around Kevadia</h2>
            <div className="relative rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm bg-navy-dark">
              <video
                controls
                preload="metadata"
                poster={post.coverImage}
                className="w-full h-auto max-h-[560px] mx-auto"
              >
                <source src={post.video} type="video/mp4" />
              </video>
            </div>
          </section>
        )}

        {/* Full photo gallery */}
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-navy">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-2xl overflow-hidden border border-navy-light/10 shadow-sm bg-cream-warm/30"
              >
                <Image
                  src={img}
                  alt={`Statue of Unity, Kevadia, Gujarat — photo ${idx + 1} of ${post.images.length}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  loading={idx < 6 ? undefined : 'lazy'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FaqAccordion faqs={post.faqs} />

        {/* CTA back to the business */}
        <CTABand
          heading="Planning Your Own Outstation Trip?"
          subheading="Sushi Travels offers chauffeur-driven outstation and round-trip car rental for the destinations within driving range of Bangalore."
          whatsappMessage="Hello Sushi Tours & Travels, I read your Statue of Unity blog post and would like to enquire about an outstation trip."
        />

        {/* Internal links */}
        <RelatedLinks
          groups={[
            {
              heading: 'Plan Your Trip',
              links: [
                { label: 'Outstation cab service in Bangalore', href: '/services/outstation-cab-bangalore' },
                { label: 'Browse popular outstation route guides', href: '/routes' },
                { label: 'View the full rental fleet', href: '/vehicles' },
              ],
            },
          ]}
        />

        {/* Back to blog index */}
        <div className="text-center">
          <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors duration-150">
            ← Back to all travel stories
          </Link>
        </div>
      </div>
    </div>
  );
}
