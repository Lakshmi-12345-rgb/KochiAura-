import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "Kochi Aura • Luxury Real Estate",
  description = "Premium black-and-gold themed luxury property portal in Kochi. Explore interactive property showcases, 3D virtual tours, and AI-powered boutique real-estate concierge.",
  keywords = "Kochi luxury real estate, premium villas Kerala, waterfront properties Kochi, high-end apartments Kochi, luxury homes Kochi Aura",
  image = "/og-image.jpg", // Assuming an image exists or will be added
  url = "https://kochi-aura.com",
  type = "website"
}: SEOProps) {
  const siteTitle = title.includes("Kochi Aura") ? title : `${title} | Kochi Aura`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Kochi Aura" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Kochi Aura",
          "description": description,
          "url": url,
          "logo": "https://kochi-aura.com/logo.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kochi",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          },
          "areaServed": "Kochi",
          "priceRange": "$$$$"
        })}
      </script>
    </Helmet>
  );
}
