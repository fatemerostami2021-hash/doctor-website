const SchemaMarkup = ({ type, data }) => {
  const schemas = {
    physician: {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: data.name || "دکتر فوق تخصص قلب و عروق",
      description: data.description,
      url: data.url,
      image: data.image,
      medicalSpecialty: "Cardiology",
      address: data.address && {
        "@type": "PostalAddress",
        streetAddress: data.address.street,
        addressLocality: data.address.city,
        addressCountry: "IR"
      },
      telephone: data.phone,
      priceRange: "$$"
    },
    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: {
        "@type": "Person",
        name: data.author || "دکتر فوق تخصص قلب و عروق"
      }
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.questions?.map(q => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer
        }
      })) || []
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.items?.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      })) || []
    }
  };

  const schema = schemas[type];
  if (!schema) return null;

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default SchemaMarkup;
