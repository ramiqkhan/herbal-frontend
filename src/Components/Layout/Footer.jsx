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
import navPic from "../../assets/logotext.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full bg-[#1f2f1f] text-gray-300 pt-12 pb-8 mt-auto">

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* LOGO */}
          <div className="w-full md:w-[25%] flex justify-center md:justify-start">
            <img
              src={navPic}
              alt="Herbalyze Logo"
              className="
                w-[160px]
                sm:w-[200px]
                md:w-[240px]
                lg:w-[280px]
                h-auto
                object-contain
              "
            />
          </div>

          {/* CONTACT SECTION */}
          <div className="w-full md:w-[25%] space-y-4 text-center md:text-left">
            <h2 className="text-xl font-bold text-white">Herbalyze</h2>

            <p className="text-sm">
              Pechs Block 2, Karachi, Pakistan
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
              <Mail className="w-5 h-5 text-[#6aa56a]" />
              <p>info.herbalyze@gmail.com</p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
              <Phone className="w-5 h-5 text-[#6aa56a]" />
              <p>(+92) 3292608369</p>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 pt-2 text-lg justify-center md:justify-start">
              <FaFacebook className="hover:text-white cursor-pointer transition hover:scale-110" />
              <FaInstagram className="hover:text-white cursor-pointer transition hover:scale-110" />
              <FaTiktok className="hover:text-white cursor-pointer transition hover:scale-110" />
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">

            <div>
              <h3 className="text-white font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/refund-policy">Refund Policy</Link></li>
                <li>FAQs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/track">Track Order</Link></li>
                <li>Testimonials</li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product Range</h3>
              <ul className="space-y-2 text-sm">
                <li>Body Pain Oil</li>
                <li>Senna Powder</li>
                <li>Teeth Whitening Powder</li>
                <li>Hair Oil</li>
                <li>BP Support</li>
              </ul>
            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="text-center text-xs text-gray-400 mt-10 border-t border-gray-800 pt-6">
          © 2025 <Link to="/">Herbalyze</Link>. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;





