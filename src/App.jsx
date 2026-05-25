import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "../src/Pages/Cart"; 

import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Home from './Pages/Home';
import AnnouncementBar from './Components/Home/AnnouncementBar';
import AboutUs from './Pages/AboutUs';
import Whatsapp from './Components/Common/Whatsapp';
import ContactUs from './Pages/ContactUs';  
import Track from './Pages/Track';  
import Blogs from './Pages/Blogs';
import Services from './Pages/Services';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import ShippingPolicy from './Pages/ShippingPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import Checkout from "./Pages/Checkout";
import ProductPage from "./Pages/ProductPage";

// =========================================================
// 🚀 INLINE SCROLL TO TOP COMPONENT (Yahan direct embed kar diya)
// =========================================================
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Har page change par scroll ko top par le jayega
  }, [pathname]);

  return null;
};

// =========================================================
// MAIN APP COMPONENT
// =========================================================
const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        
        {/* ✅ ScrollToTop ab bina kisi external file ke chalega */}
        <ScrollToTop /> 
        
        <AnnouncementBar />
        <Header />
        <Whatsapp />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/track" element={<Track />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        <Footer />

      </CartProvider>
    </BrowserRouter>
  );
};

export default App;