'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export interface Testimonial {
  id?: string;
  _id?: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-navy-light/10 p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative h-full">
      {/* Quote Icon Overlay */}
      <div className="absolute top-6 right-6 text-cream-warm opacity-40">
        <Quote className="w-10 h-10 fill-current rotate-180" />
      </div>

      {/* Star Ratings */}
      <div className="flex items-center space-x-1 mb-5 relative z-10">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className={`w-4 h-4 ${
              idx < testimonial.rating
                ? 'text-primary fill-primary'
                : 'text-navy-light/20'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-sm text-navy italic leading-relaxed mb-6 flex-1 relative z-10">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Reviewer Details */}
      <div className="pt-4 border-t border-navy-light/10 flex items-center space-x-3 mt-auto relative z-10">
        {/* Profile Avatar Placeholder (Initials) */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white text-sm font-bold shadow-inner">
          {testimonial.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy leading-none">{testimonial.name}</h3>
          <span className="text-[11px] text-navy-light font-semibold uppercase tracking-wider block mt-1">
            {testimonial.location}
          </span>
        </div>
      </div>
    </div>
  );
}
