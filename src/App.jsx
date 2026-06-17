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
import { HelmetProvider } from "react-helmet-async";
import AllProducts from "./Pages/allproduct";
import DealPage from "./Pages/deal";
import DetailDealPage from "./Pages/detaildeal";
import BlogDetail from "./Pages/BlogDetail";

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
    <HelmetProvider>
    <BrowserRouter>
      <CartProvider>
        
        {/* ✅ ScrollToTop ab bina kisi external file ke chalega */}
        <ScrollToTop /> 
        
        <AnnouncementBar />
        <Header />
      
        
      <Routes>
  {/* Main Root Pages */}
  <Route path="/" element={<Home />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/product/:seoUrl" element={<ProductPage />} />

  {/* 📰 Blogs (News) Link */}
  <Route path="/blogs/news" element={<Blogs />} />
  <Route path="/blogs/:slug" element={<BlogDetail />} />

  {/* 📄 Pages (Shopify-Style Paths) */}
  <Route path="/pages/about" element={<AboutUs />} />
  <Route path="/pages/contact" element={<ContactUs />} />
  <Route path="/pages/track" element={<Track />} />
              <Route path="/pages/deals" element={<DealPage />} />
              <Route path="/pages/deals/:slug" element={<DetailDealPage />} />

  {/* Agar future me services chalana ho to ye path hoga */}
  {/* <Route path="/pages/services" element={<Services />} /> */}
  
  {/* Policies Paths */}
  <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/pages/terms-of-service" element={<TermsOfService />} />
  <Route path="/pages/shipping-policy" element={<ShippingPolicy />} />
  <Route path="/pages/refund-policy" element={<RefundPolicy />} />
    <Route path="/pages/more-products" element={<AllProducts />} />

</Routes>
  <Whatsapp />
        <Footer />

      </CartProvider>
    </BrowserRouter></HelmetProvider>
  );
};

export default App;