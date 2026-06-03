// import {
//   Mail,
//   Phone,
// } from "lucide-react";

// import {
//   FaFacebook,
//   FaInstagram,
//   FaTiktok,
// } from "react-icons/fa";


// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-[#1f2f1f] text-gray-300 pt-14 pb-8">
//       <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

//         {/* LOGO + CONTACT */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold text-white">Herbalyze</h2>

//           <p className="text-sm">Pechs Block 2, Karachi, Pakistan</p>

//           <div className="flex items-center gap-3 text-sm">
//             <Mail className="w-5 h-5 text-[#6aa56a]" />
//             <p>info.herbalyze@gmail.com</p>
//           </div>

//           <div className="flex items-center gap-3 text-sm">
//             <Phone className="w-5 h-5 text-[#6aa56a]" />
//             <p>(+92) 3292608369</p>
//           </div>


//           {/* Social Icons */}
//           <div className="flex gap-4 pt-2 text-lg">
//             <a
//               href="https://www.facebook.com/profile.php?id=61570610496995"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaFacebook className="hover:text-white cursor-pointer transition duration-300 hover:scale-110" />
//             </a>

//             <a
//               href="https://www.instagram.com/theherbalyze?igsh=ajRjNGpnenF1NTR1"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaInstagram className="hover:text-white cursor-pointer transition duration-300 hover:scale-110" />
//             </a>

//             <a
//               href="https://www.tiktok.com/@theherbalyze" 
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaTiktok className="hover:text-white cursor-pointer transition duration-300 hover:scale-110" />
//             </a>
//           </div>
//         </div>

//         {/* POLICIES */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">Policies</h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-white cursor-pointer"> <Link to="/terms-of-service">Terms of Service</Link></li>
//             <li className="hover:text-white cursor-pointer"> <Link to="/shipping-policy">Shipping Policy</Link></li>
//             <li className="hover:text-white cursor-pointer">  <Link to="/privacy-policy">Privacy Policy</Link></li>
//             <li className="hover:text-white cursor-pointer"> <Link to="/refund-policy">Refund Policy</Link></li>
//             <li className="hover:text-white cursor-pointer">FAQs</li>
//           </ul>
//         </div>

//         {/* QUICK LINKS */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-white cursor-pointer"> <Link to="/track">Track Order</Link></li>
//             <li className="hover:text-white cursor-pointer">Testimonials</li>
//             <li className="hover:text-white cursor-pointer"> <Link to="/contact">Contact Us</Link></li>
//             <li className="hover:text-white cursor-pointer">  <Link to="/about">About Us</Link></li>
//             <li className="hover:text-white cursor-pointer"> <Link to="/blogs">Blogs</Link></li>
//           </ul>
//         </div>

//         {/* PRODUCT RANGE */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">Product Range</h3>
//           <ul className="space-y-2 text-sm">
//             <li className="hover:text-white cursor-pointer">Herbal Oils</li>
//             <li className="hover:text-white cursor-pointer">Wellness Teas</li>
//             <li className="hover:text-white cursor-pointer">Skin Care</li>
//             <li className="hover:text-white cursor-pointer">Hair Care</li>
//             <li className="hover:text-white cursor-pointer">Supplements</li>
//           </ul>
//         </div>

//         {/* NEWSLETTER */}
//         <div>
//           <h3 className="text-white font-semibold mb-4">
//             Newsletter Signup
//           </h3>

//           <p className="text-sm mb-4">
//             Subscribe to receive tips, offers, and updates.
//           </p>

//           <div className="flex items-center border border-gray-500 rounded-full overflow-hidden">
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="bg-transparent px-4 py-2 w-full outline-none text-sm"
//             />

//             <button className="bg-[#355e3b] hover:bg-[#2d4d2f] px-4 py-2 text-white text-sm">
//               Subscribe
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* BOTTOM */}
//       <div className="text-center text-xs text-gray-400 mt-10">
//         © 2025 <Link to="/">Herbalyze</Link>. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { useState, useEffect } from "react";
import { Mail, Phone, Loader2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import navPic from "../../assets/logore.png";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Your exact active live herbal backend URL
  const BASE_URL = "https://herbal-backend-chi.vercel.app/api/products";

  // Helper to handle dynamic fallback if seoUrl is missing
  const getProductSlug = (product) => {
    if (product.seoUrl) return product.seoUrl;
    if (!product.name) return product._id || "";
    return product.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Fetch top products for the footer item catalog list
  useEffect(() => {
    const fetchFooterProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 5)); // Taking the first 5 products
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 5));
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data.slice(0, 5));
        }
      } catch (err) {
        console.error("Footer Products Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterProducts();
  }, []);

  const handleProductClick = (product) => {
    const productSlug = getProductSlug(product);
    navigate(`/product/${productSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top on dynamic navigation
  };

  return (
    <footer className="w-full bg-[#1f2f1f] text-gray-300 pt-12 pb-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* TOP SECTION - Flex layout setup properly for desktop layout flow */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-start justify-between">

          {/* CONTACT SECTION (LEFT BLOCK) */}
          <div className="w-full md:w-[28%] space-y-5 text-center md:text-left">
            {/* LOGO */}
<div className="flex justify-center md:justify-start">
  <img
    src={navPic}
    alt="Herbalyze Logo"
    // Sets a precise aspect ratio calculation based on your 2850x694 dimensions
    // Scaled fluidly across mobile, tablets, small laptops, and ultrawide screens
    className="w-[180px] xs:w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[200px] h-auto object-contain max-w-full"
    loading="lazy"
    width="2850"
    height="694"
  />
</div>
            {/* ADDRESS */}
            <p className="text-sm leading-relaxed text-gray-400">
              Pechs Block 2, Karachi, Pakistan
            </p>

            {/* EMAIL */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400">
              <Mail className="w-5 h-5 text-[#6aa56a] shrink-0" />
              <a
                href="mailto:info.herbalyze@gmail.com"
                className="break-all hover:text-white transition-colors"
              >
                info.herbalyze@gmail.com
              </a>
            </div>

            {/* PHONE */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400">
              <Phone className="w-5 h-5 text-[#6aa56a] shrink-0" />
              <a
                href="https://api.whatsapp.com/send/?phone=923292608369&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <p>(+92) 3292608369</p>
              </a>
            </div>

            {/* SOCIAL */}
         {/* SOCIAL ICONS CONTAINER */}
<div className="flex justify-center md:justify-start gap-6 pt-2 text-2xl">
  <a 
    href="https://www.facebook.com/profile.php?id=61570610496995"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white cursor-pointer transition duration-300 hover:scale-110"
  >
    <FaFacebook />
  </a>

  <a
    href="https://www.instagram.com/theherbalyze?igsh=ajRjNGpnenF1NTR1"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white cursor-pointer transition duration-300 hover:scale-110"
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.tiktok.com/@theherbalyze" 
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white cursor-pointer transition duration-300 hover:scale-110"
  >
    <FaTiktok />
  </a>
</div>
          </div>

          {/* LINKS GRID (RIGHT BLOCK) - FIXED: Separated from the contact section container */}
          <div className="w-full md:w-[68%] grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-6 text-center md:text-left">

            {/* POLICIES */}
            <div>
  <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
    Policies
  </h3>
  <ul className="space-y-2.5 text-sm text-gray-400">
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/terms-of-service">Terms of Service</Link>
    </li>
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/shipping-policy">Shipping Policy</Link>
    </li>
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/privacy-policy">Privacy Policy</Link>
    </li>
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/refund-policy">Refund Policy</Link>
    </li>
  </ul>
</div>

{/* QUICK LINKS */}
<div>
  <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
    Quick Links
  </h3>
  <ul className="space-y-2.5 text-sm text-gray-400">
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/track">Track Order</Link>
    </li>
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/contact">Contact Us</Link>
    </li>
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to Shopify-style */}
      <Link to="/pages/about">About Us</Link>
    </li>
    <li className="hover:text-white transition cursor-pointer">
      {/* ✅ Path updated to match /blogs/news */}
      <Link to="/blogs/news">Blogs</Link>
    </li>
  </ul>
</div>

            {/* PRODUCT RANGE - NOW FETCHING DYNAMICALLY */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4 tracking-wide">
                Product Range
              </h3>
              {loading ? (
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 py-2">
                  <Loader2 className="animate-spin text-[#6aa56a]" size={14} />
                  <span className="text-xs uppercase tracking-wider text-gray-400">Loading catalog...</span>
                </div>
              ) : (
                <ul className="space-y-2.5 text-sm text-gray-400">
                  {products.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      className="hover:text-white transition cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </li>
                  ))}
                  
                  {!loading && products.length === 0 && (
                    <li className="text-xs text-gray-500 italic">No products available</li>
                  )}
                </ul>
              )}
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="text-center text-xs text-gray-500 mt-12 border-t border-gray-800/60 pt-6">
          © {new Date().getFullYear()} <Link to="/" className="hover:text-white transition">Herbalyze</Link>. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;



