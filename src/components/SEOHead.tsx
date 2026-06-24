import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'Balanceo Dinámico Baltec SRL',
  alternateName: 'Baltec',
  description:
    'Especialistas en balanceo dinámico industrial en banco e in situ, reparación de equipos rotativos, alineación láser y análisis de vibraciones en CABA y AMBA. Más de 40 años de experiencia.',
  url: 'https://www.balanceobaltec.com/',
  logo: 'https://www.balanceobaltec.com/baltec.png',
  image: 'https://www.balanceobaltec.com/og-image.png',
  telephone: '+541149199922',
  email: 'info@balanceobaltec.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Del Barco Centenera 3405',
    addressLocality: 'Nueva Pompeya, Buenos Aires',
    addressRegion: 'CABA',
    postalCode: 'C1437',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.6542928,
    longitude: -58.4197444,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '12:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '13:00',
      closes: '17:00',
    },
  ],
  foundingDate: '1985',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -34.6542928,
      longitude: -58.4197444,
    },
    geoRadius: '100000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Balanceo y Reparación Industrial',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Balanceo dinámico industrial en banco' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Balanceo dinámico in situ' },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reparación y balanceo dinámico de extractores e inyectores de aire',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reparación y balanceo dinámico de UTAs (Unidades de Tratamiento de Aire)',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reparación y balanceo dinámico de bombas centrífugas y electrobombas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reparación y balanceo dinámico de molinos industriales',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Alineación láser de ejes y acoplamientos industriales',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Análisis y medición de vibraciones mecánicas',
        },
      },
    ],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Balanceo Dinámico Baltec SRL',
  url: 'https://www.balanceobaltec.com/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.balanceobaltec.com/baltec.png',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+541149199922',
    contactType: 'customer service',
    areaServed: 'AR',
    availableLanguage: 'Spanish',
  },
};

const injectSchema = (id: string, data: object) => {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
};

const setMeta = (selector: string, content: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, attr, value] = selector.match(/\[(.*?)="(.*?)"\]/) || [];
    if (attr && value) {
      el.setAttribute(attr, value);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string): void => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
}: SEOHeadProps = {}) => {
  useEffect(() => {
    // Always inject business + organization schemas (global)
    injectSchema('schema-local-business', localBusinessSchema);
    injectSchema('schema-organization', organizationSchema);

    // If per-route props are provided, override the default meta tags
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[name="twitter:title"]', title);
    }
    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }
    if (keywords) {
      setMeta('meta[name="keywords"]', keywords);
    }
    if (canonical) {
      setLink('canonical', canonical);
      setMeta('meta[property="og:url"]', canonical);
    }
    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage);
      setMeta('meta[name="twitter:image"]', ogImage);
    }

    return () => {
      document.getElementById('schema-local-business')?.remove();
      document.getElementById('schema-organization')?.remove();
    };
  }, [title, description, keywords, canonical, ogImage]);

  return null;
};

export default SEOHead;