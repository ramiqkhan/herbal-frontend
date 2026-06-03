// import { Helmet } from "react-helmet-async";

// const SEO = ({
//   title,
//   description,
//   keywords,
//   image,
//   url,
// }) => {
//   return (
//     <Helmet>
//       <title>{title}</title>

//       <meta name="description" content={description} />
//       <meta name="keywords" content={keywords} />

//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:image" content={image} />
//       <meta property="og:url" content={url} />
//       <meta property="og:type" content="website" />

//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={image} />
//     </Helmet>
//   );
// };

// // export default SEO;
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  tags, // 👈 Bina kisi badlao ke yahan naya prop add kiya hai
}) => {
  const formattedTags = Array.isArray(tags) 
    ? tags.join(", ") 
    : (typeof tags === 'string' ? tags : "");
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* 👈 Dashboard ke Product Tags ko string bana kar yahan inject kar diya */}
{/* Dynamic injection stream from your backend dashboard settings */}
      <meta name="product:tags" content={formattedTags} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;