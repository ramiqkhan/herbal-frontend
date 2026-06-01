import React from 'react'

// import FeaturesBar from "../Components/Home/FeaturesBar";
import CategoriesSection from "../Components/Home/CategoriesSection";
import ChooseUs from "../Components/Home/ChooseUs";
import Testimonials from "../Components/Home/Testimonials";
import Promo from "../Components/Home/Promo";
import HeroSection from '../Components/Home/HeroSection';
import Horizontal from '../Components/Home/Horizontal';
import BotanicalSection from '../Components/Home/BotanicalSection'; 
import Faq from '../Components/Home/Faq';
// import Banner from '../Components/Home/Banner';

import SEO from '../Components/SEO';

const Home = () => {
   
  return (
    <>
     <SEO
        title="Herbalyze | Natural Herbal Health & Wellness Products"
        description="Premium herbal products for wellness, skincare and natural healing."
        keywords="herbal products, herbal oil, natural wellness, herbal supplements"
        image="https://www.theherbalyze.com/og-image.jpg"
        url="https://www.theherbalyze.com/"
      />
    <div>
     
      <HeroSection />
       <CategoriesSection />
      <Horizontal />
      <BotanicalSection />
      <ChooseUs />
      <Faq />
      {/* <Banner /> */}
      <Testimonials />
      <Promo />
      {/* <FeaturesBar /> */}
    </div></>
  )
}

export default Home
