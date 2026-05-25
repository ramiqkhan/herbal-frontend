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

const Home = () => {
  return (
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
    </div>
  )
}

export default Home
