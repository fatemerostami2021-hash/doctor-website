import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, ogImage, type = 'website' }) => {
  const siteTitle = 'دکتر فوق تخصص قلب و عروق';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDesc = 'فوق تخصص قلب و عروق - فلوشیپ اینترونشنال کاردیولوژی - آنژیوگرافی، آنژیوپلاستی، اکوکاردیوگرافی';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content={type} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
