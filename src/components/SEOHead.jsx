import { useEffect } from 'react';

export function SEOHead() {
  useEffect(() => {
    // Update document title
    document.title = 'Portfolio - Développeur Web Full-Stack';

    // Set meta tags
    const metaTags = [
      { name: 'description', content: 'Portfolio de développeur web full-stack. React, Node.js, et technologies modernes.' },
      { name: 'keywords', content: 'développeur, web, react, portfolio, full-stack' },
      { name: 'author', content: 'Your Name' },
      { name: 'theme-color', content: '#111827' },
      { property: 'og:title', content: 'Portfolio - Développeur Web' },
      { property: 'og:description', content: 'Découvrez mon portfolio de projets web modernes.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Portfolio - Développeur Web' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.setAttribute('name', name);
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });

    // Structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Your Name',
      jobTitle: 'Web Developer',
      url: 'https://yourportfolio.com',
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return null;
}

export default SEOHead;

