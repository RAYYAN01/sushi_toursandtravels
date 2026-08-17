import { Vehicle } from './vehicles';

const SITE_URL = 'https://sushitravels.com'; // Change to actual domain if needed

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TravelAgency'],
    '@id': `${SITE_URL}/#agency`,
    name: 'Sushi Travels',
    image: `${SITE_URL}/fleet/force-urbania-front-01.webp`,
    description: 'Sushi Travels is a premier Indian travel agency renting out vehicles with drivers for local, airport transfer, and outstation trips in India.',
    url: SITE_URL,
    telephone: '+919071660099',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No 272 , corner shop ,G/F , 8th cross, Opposite to BBMP office Bhuvaneshwari Nagara Dodda Basti Main Road, post, Nagadevana Halli',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560056',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9425148,
      longitude: 77.489068,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '₹₹',
    sameAs: [
      'https://www.instagram.com/sushi_travels_official?utm_source=qr&igsh=bXphYXc1d2p5cnRm',
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Karnataka',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'South India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'India',
      },
    ],
  };
}

export function getFleetItemListSchema(vehicleList: Vehicle[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sushi Travels Vehicle Rental Fleet',
    description: 'Browse our diverse fleet of AC sedans, luxury SUVs, and spacious tempo travellers available with drivers for rent.',
    url: `${SITE_URL}/fleet`,
    numberOfItems: vehicleList.length,
    itemListElement: vehicleList.map((vehicle, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: vehicle.name,
        image: vehicle.image,
        description: vehicle.description,
        brand: {
          '@type': 'Brand',
          name: vehicle.name.split(' ')[0],
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/fleet`,
          priceCurrency: 'INR',
          price: vehicle.ratePerKm,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: vehicle.ratePerKm,
            priceCurrency: 'INR',
            unitText: 'KM',
          },
        },
      },
    })),
  };
}

export function getBreadcrumbListSchema(
  items: { name: string; item: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.item}`,
    })),
  };
}

export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Car Rental with Driver / Chauffeur Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'Sushi Travels',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'IN',
    },
    description: 'Chauffeur-driven car rentals for outstation round trips, local city travel, and airport pickups/drops across India.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      description: 'Starting from ₹12 per km. Plus GST applicable.',
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Parameterized Service schema for individual /services/[slug] landing pages
 * (distinct from the generic getServiceSchema() above, which is used
 * site-wide). Nothing here invents a price — services don't have a
 * per-service confirmed rate, so no `offers.price` is set.
 */
export function getServiceLandingSchema(params: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    serviceType: params.name,
    provider: {
      '@type': 'TravelAgency',
      name: 'Sushi Travels',
      url: SITE_URL,
      telephone: '+919071660099',
    },
    areaServed: (params.areaServed ?? ['Bengaluru', 'Karnataka', 'South India']).map((name) => ({
      '@type': 'City',
      name,
    })),
    description: params.description,
    url: `${SITE_URL}${params.url}`,
  };
}

/**
 * Product/Offer schema for a single vehicle on its dedicated
 * /vehicles/[slug] landing page. Only includes `offers.price` when the
 * vehicle has a real confirmed ratePerKm — vehicles priced "Price on
 * Request" (ratePerKm === 0 or priceDisplay set) omit the offers block
 * entirely rather than inventing a number, matching the project's existing
 * no-fabricated-pricing rule (see NOTES.md).
 */
export function getVehicleProductSchema(vehicle: Vehicle, url: string) {
  const hasConfirmedRate = !vehicle.priceDisplay && !!vehicle.ratePerKm;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    image: `${SITE_URL}${vehicle.image}`,
    description: vehicle.description,
    brand: {
      '@type': 'Brand',
      name: vehicle.name.split(' ')[0],
    },
    url: `${SITE_URL}${url}`,
    ...(hasConfirmedRate
      ? {
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}${url}`,
            priceCurrency: 'INR',
            price: vehicle.ratePerKm,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: vehicle.ratePerKm,
              priceCurrency: 'INR',
              unitText: 'KM',
            },
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'TravelAgency',
              name: 'Sushi Travels',
            },
          },
        }
      : {}),
  };
}
