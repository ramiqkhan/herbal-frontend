import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../src/Pages/Cart"; // <-- 1. Import the Cart Provider

import Header from './Components/Layout/Header'
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

const App = () => {
  return (
    <BrowserRouter>
      {/* 2. Wrap everything inside the CartProvider */}
      <CartProvider>
        {/* <ScrollToTop /> */}
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