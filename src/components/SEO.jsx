import { useEffect } from 'react';

const SEO = ({ 
  title = "Sofiane Derraz - Ingénieur IA & Data Scientist",
  description = "Portfolio professionnel de Sofiane Derraz, Ingénieur IA spécialisé en Machine Learning, Deep Learning et MLOps. Découvrez mes projets d'intelligence artificielle.",
  keywords = "Sofiane Derraz, Ingénieur IA, Data Scientist, Machine Learning, Deep Learning, MLOps, Portfolio, France, Intelligence Artificielle",
  author = "Sofiane Derraz",
  image = "/og-image.png",
  url = "https://sofianederraz.com"
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'author': author,
      'robots': 'index, follow',
      'viewport': 'width=device-width, initial-scale=1.0',
      
      // Open Graph tags
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': 'website',
      'og:locale': 'fr_FR',
      
      // Twitter Card tags
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sofiane Derraz",
      "jobTitle": "Ingénieur IA & Data Scientist",
      "description": description,
      "url": url,
      "sameAs": [
        "https://github.com/DerrazSofiane",
        "https://linkedin.com/in/sofiane-derraz"
      ],
      "skills": [
        "Machine Learning",
        "Deep Learning",
        "Python",
        "TensorFlow",
        "PyTorch",
        "MLOps",
        "Computer Vision",
        "NLP"
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // Reset to default title when component unmounts
      document.title = "Sofiane Derraz - Ingénieur IA & Data Scientist";
    };
  }, [title, description, keywords, author, image, url]);

  return null;
};

export default SEO;