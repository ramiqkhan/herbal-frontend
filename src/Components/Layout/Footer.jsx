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
import {
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1f2f1f] text-gray-300 pt-18 pb-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* LOGO + CONTACT */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Herbalyze</h2>

          <p className="text-sm">Pechs Block 2, Karachi, Pakistan</p>

          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-5 h-5 text-[#6aa56a]" />
            <p>info.herbalyze@gmail.com</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-5 h-5 text-[#6aa56a]" />
            <p>(+92) 3292608369</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2 text-lg">
            <a
              href="https://www.facebook.com/profile.php?id=61570610496995"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-white cursor-pointer transition duration-300 hover:scale-110" />
            </a>

            <a
              href="https://www.instagram.com/theherbalyze?igsh=ajRjNGpnenF1NTR1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-white cursor-pointer transition duration-300 hover:scale-110" />
            </a>

            <a
              href="https://www.tiktok.com/@theherbalyze" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="hover:text-white cursor-pointer transition duration-300 hover:scale-110" />
            </a>
          </div>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer"> <Link to="/terms-of-service">Terms of Service</Link></li>
            <li className="hover:text-white cursor-pointer"> <Link to="/shipping-policy">Shipping Policy</Link></li>
            <li className="hover:text-white cursor-pointer">  <Link to="/privacy-policy">Privacy Policy</Link></li>
            <li className="hover:text-white cursor-pointer"> <Link to="/refund-policy">Refund Policy</Link></li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer"> <Link to="/track">Track Order</Link></li>
            <li className="hover:text-white cursor-pointer">Testimonials</li>
            <li className="hover:text-white cursor-pointer"> <Link to="/contact">Contact Us</Link></li>
            <li className="hover:text-white cursor-pointer">  <Link to="/about">About Us</Link></li>
            <li className="hover:text-white cursor-pointer"> <Link to="/blogs">Blogs</Link></li>
          </ul>
        </div>

        {/* PRODUCT RANGE */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product Range</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Herbalyze Body Pain Oil </li>
            <li className="hover:text-white cursor-pointer">Herbalyze Senna Powder</li>
            <li className="hover:text-white cursor-pointer">Herbalyze Teeth Whitening Powder</li>
            <li className="hover:text-white cursor-pointer">Herbalyze Sugar And Blood Pressure </li>
            <li className="hover:text-white cursor-pointer">Herbalyze Hair Oil</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Newsletter Signup
          </h3>

          <p className="text-sm mb-4">
            Subscribe to receive tips, offers, and updates.
          </p>

          <div className="flex items-center border border-gray-500 rounded-full overflow-hidden bg-[#162216]/40 focus-within:border-[#6aa56a] transition-colors">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent px-4 py-2.5 w-full outline-none text-sm text-white placeholder-gray-500"
            />

            <button className="bg-[#355e3b] hover:bg-[#2d4d2f] px-5 py-2.5 text-white text-sm font-medium transition-colors cursor-pointer shrink-0">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-800/60 pt-6">
        © 2025 <Link to="/">Herbalyze</Link>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;





