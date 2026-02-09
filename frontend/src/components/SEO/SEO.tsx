import { Helmet } from '@dr.pogodin/react-helmet';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'event';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
  structuredData?: object | object[];
}

const BASE_URL = 'https://edb-mmmut.vercel.app';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/dml0jlwlv/image/upload/v1765559411/The_Editorial_Board_Logo..1.0_cgrovj.png';
const SITE_NAME = 'The Editorial Board - MMMUT';

export default function SEO({
  title = 'The Editorial Board - MMMUT | Premier Literary & Cultural Society',
  description = 'The Editorial Board is the premier literary and cultural society of MMMUT, Gorakhpur. Fostering creativity through publications, events like Arunoday & Abhyudaya, and nurturing literary talent.',
  keywords = 'Editorial Board, MMMUT, Gorakhpur, literary society, cultural society, Arunoday, Abhyudaya, college magazine',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  author = 'The Editorial Board, MMMUT',
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} 
      />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific Open Graph */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) 
          ? structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))
          : <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
      )}
    </Helmet>
  );
}

// Pre-configured SEO for common pages
export const seoConfigs = {
  home: {
    title: 'The Editorial Board - MMMUT | Premier Literary & Cultural Society',
    description: 'The Editorial Board is the premier literary and cultural society of MMMUT, Gorakhpur. Fostering creativity through publications, events like Arunoday & Abhyudaya, and nurturing literary talent since establishment.',
    keywords: 'Editorial Board, MMMUT, Gorakhpur, literary society, cultural society, Arunoday, Abhyudaya, college magazine, Tiresia, Malvika, university publications',
    url: '/',
  },
  team: {
    title: 'Our Team - Meet the Minds Behind the Board',
    description: 'Meet the dedicated team of student editors, writers, designers, and coordinators who bring The Editorial Board to life. From seniors to freshers, discover the creative minds shaping MMMUT\'s literary landscape.',
    keywords: 'Editorial Board team, MMMUT students, student editors, literary club members, editorial team, college magazine team',
    url: '/team',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "The Editorial Board Team",
      "description": "Meet the dedicated team members of The Editorial Board, MMMUT",
      "mainEntity": {
        "@type": "Organization",
        "name": "The Editorial Board - MMMUT"
      }
    }
  },
  events: {
    title: 'Events - Literary & Cultural Celebrations',
    description: 'Explore our exciting lineup of literary and cultural events including Arunoday, Abhyudaya, Vagmita, debates, workshops, and more. Experience the vibrant cultural spirit of MMMUT.',
    keywords: 'Arunoday, Abhyudaya, literary events, cultural fest, poetry slam, Vagmita, MMMUT events, college festivals, workshops, debates',
    url: '/events',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Events - The Editorial Board",
      "description": "Literary and cultural events organized by The Editorial Board, MMMUT"
    }
  },
  publications: {
    title: 'Publications - Tiresia, Malvika & Literary Works',
    description: 'Browse our prestigious publications including Tiresia quarterly magazine, Malvika annual edition, and various literary compilations. Read stories, poems, and articles by talented MMMUT students.',
    keywords: 'Tiresia magazine, Malvika annual, college publications, student magazine, literary journal, MMMUT magazine, poetry collection, story anthology',
    url: '/publications',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Publications - The Editorial Board",
      "description": "Literary publications by The Editorial Board, MMMUT including Tiresia and Malvika"
    }
  },
  alumni: {
    title: 'Alumni Network - Continuing the Legacy',
    description: 'Connect with esteemed alumni of The Editorial Board who have gone on to excel in various fields. Our alumni network spans across industries, carrying forward the literary spirit.',
    keywords: 'Editorial Board alumni, MMMUT alumni, former editors, literary alumni network, alumni achievements',
    url: '/alumni',
  },
  gallery: {
    title: 'Gallery - Capturing Moments & Memories',
    description: 'Explore our visual journey through events, celebrations, photoshoots, and memorable moments captured over the years. A pictorial tribute to The Editorial Board\'s legacy.',
    keywords: 'Editorial Board gallery, event photos, MMMUT photos, college memories, literary event photos, cultural fest images',
    url: '/gallery',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "The Editorial Board Gallery",
      "description": "Photo gallery of events and moments from The Editorial Board, MMMUT"
    }
  },
  canvas: {
    title: 'Canvas - Share Your Creative Stories',
    description: 'Canvas is our platform for student voices. Submit your poems, stories, articles, and creative pieces. Get published and share your literary talent with the MMMUT community.',
    keywords: 'student writing platform, creative writing, submit poetry, share stories, literary submissions, MMMUT canvas, student blog',
    url: '/canvas',
    type: 'article' as const,
  },
  contact: {
    title: 'Contact Us - Get in Touch',
    description: 'Have questions or want to collaborate? Reach out to The Editorial Board. We welcome partnerships, event proposals, content submissions, and general inquiries.',
    keywords: 'contact Editorial Board, MMMUT contact, collaboration, event proposal, content submission, reach us',
    url: '/contact',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact The Editorial Board",
      "description": "Get in touch with The Editorial Board, MMMUT"
    }
  },
  arunodayLive: {
    title: 'Arunoday \'26 - The Literary Extravaganza',
    description: 'Arunoday \'26 is here! Join us for MMMUT\'s premier literary extravaganza featuring workshops, competitions, poetry slams, and cultural celebrations. Register now!',
    keywords: 'Arunoday 2026, literary fest, MMMUT fest, creative writing workshop, poetry slam, literary extravaganza, college festival',
    url: '/arunoday-live',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Arunoday '26",
      "description": "The Literary Extravaganza of MMMUT - A celebration of literature, creativity, and culture",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "MMMUT Campus, MPH",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gorakhpur",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "The Editorial Board - MMMUT",
        "url": "https://edb-mmmut.vercel.app"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    }
  },
  mun: {
    title: 'Model United Nations - MMMUT MUN',
    description: 'Join MMMUT\'s prestigious Model United Nations conference. Debate global issues, develop diplomatic skills, and engage in world-class simulations of UN committees.',
    keywords: 'MMMUT MUN, Model United Nations, college MUN, debate competition, diplomatic simulation, UN conference',
    url: '/mun',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "MMMUT Model United Nations",
      "description": "Model United Nations conference organized by The Editorial Board, MMMUT",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "MMMUT Campus",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gorakhpur",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "The Editorial Board - MMMUT"
      }
    }
  },
  magazine: {
    title: 'Magazine Issues - Browse All Editions',
    description: 'Access all issues of our magazines - Tiresia quarterly editions and Malvika annual editions. Read the best of student writing, photography, and creative works.',
    keywords: 'magazine issues, Tiresia editions, Malvika editions, college magazine archive, student publications',
    url: '/magazine',
  },
  adc: {
    title: 'Annual Debate Competition - ADC 2026',
    description: 'Register for MMMUT\'s Annual Debate Competition (ADC) 2026. Compete in Group Discussion and Debate rounds. Showcase your oratory skills and win exciting prizes!',
    keywords: 'Annual Debate Competition, ADC 2026, MMMUT debate, group discussion, GD round, college debate, public speaking, oratory competition',
    url: '/adc',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Annual Debate Competition 2026",
      "description": "MMMUT's premier debate competition featuring Group Discussion and Debate rounds",
      "startDate": "2026-02-17",
      "endDate": "2026-02-19",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "MMMUT Campus",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gorakhpur",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "The Editorial Board - MMMUT",
        "url": "https://edb-mmmut.vercel.app"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    }
  }
};
