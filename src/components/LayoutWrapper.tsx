'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Suppress header, footer and floating icons on admin routes
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <main className="flex-grow">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow pt-[72px] md:pt-[80px]">
        {children}
      </main>
      
      {/* Global Footer */}
      <Footer />
      
      {/* Floating WhatsApp CTA */}
      <WhatsAppFloat />
    </>
  );
}
