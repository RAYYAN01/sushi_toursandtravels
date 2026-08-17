import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '919071660099';
const PHONE_NUMBER = '+919071660099';

interface CTABandProps {
  heading: string;
  subheading: string;
  whatsappMessage: string;
  bookingHref?: string;
}

/**
 * Shared Call / WhatsApp / Get-Quote CTA band for the new landing page
 * families, reusing the same phone number, WhatsApp deep-link pattern and
 * button styling already established in VehicleCard.tsx / PackageCard.tsx
 * rather than rebuilding CTA logic from scratch on every page.
 */
export default function CTABand({ heading, subheading, whatsappMessage, bookingHref = '/booking' }: CTABandProps) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-navy rounded-3xl text-white p-8 sm:p-10 shadow-sm border border-navy-light/20 text-center space-y-6">
      <div className="space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold">{heading}</h2>
        <p className="text-sm text-cream-warm">{subheading}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex items-center justify-center w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold rounded-full px-6 py-3 transition-colors duration-200"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call {PHONE_NUMBER}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold rounded-full px-6 py-3 transition-colors duration-200"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp Enquiry
        </a>
        <Link
          href={bookingHref}
          className="inline-flex items-center justify-center w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-full px-6 py-3 transition-colors duration-200"
        >
          Get a Quote
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </section>
  );
}
