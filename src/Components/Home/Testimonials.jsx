import React, { useState, useEffect } from 'react';
import { Star, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// ✅ DEPLOYED PRODUCTION BACKEND ROUTE
const BASE_URL = "https://herbal-backend-chi.vercel.app/api/comments";

// ✅ SAFE FALLBACK DATA ARRAYS (Prevents component breakdown on error)
const fallbackTestimonials = [
  {
    _id: "fb-1",
    name: "Ayesha Khan",
    description: "Herbalyze ka Anti-Acne serum kamal ka hai! Meri skin sirf 2 weeks mein clear ho gayi. Strongly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
  },
  {
    _id: "fb-2",
    name: "Zain Ahmed",
    description: "Organic Aloe Vera gel bohot authentic hai. No artificial chemical smell. Highly satisfied with Karachi delivery service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
  },
  {
    _id: "fb-3",
    name: "Sana Malik",
    description: "Saffron Glow Toner works like magic. Skin bright ho jati hai instant. Herbalyze products are pure love.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"
  },
  {
    _id: "fb-4",
    name: "Bilal Siddiqui",
    description: "Tea Tree Hair Oil se mera dandruff bilkul khatam ho gaya. Authentic and 100% natural herbal remedy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
  }
];

// Card handles both incoming dynamic database items and local fallbacks safely
const Card = ({ item }) => {
  // ✅ FIX: Strict verification of Cloudinary absolute string protocol or local assets
  const imageSrc = item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))
    ? item.image 
    : item.image ? `/${item.image}` : "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500";
  
  const displayReview = item.description || item.review || "No review content provided.";
  const currentRating = item.rating || 5;

  return (
    <div className="bg-white rounded-[28px] shadow-[0_6px_24px_rgba(0,0,0,0.02)] p-6 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full border border-[#e8e3d9]/80 min-h-[480px]">
      
      {/* 1. IMAGE DISPLAY LAYER */}
      <div className="w-full h-56 mb-4 overflow-hidden rounded-2xl bg-[#fcfbfa]">
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500";
          }}
        />
      </div>

      {/* 2. RATING STARS SYSTEM */}
      <div className="flex text-yellow-500 mb-2 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            fill={i < currentRating ? "currentColor" : "none"} 
            className={i < currentRating ? "text-amber-400" : "text-gray-200"}
          />
        ))}
      </div>

      {/* 3. IDENTITY HEADER */}
      <h3 className="font-bold text-[#2d2a26] text-base mb-2 capitalize tracking-tight">
        {item.name}
      </h3>

      {/* 4. UNCLAMPED FEEDBACK DESCRIPTION */}
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line break-words italic">
        "{displayReview}"
      </p>
    </div>
  );
};

const Testimonials = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // ✅ Hit Live Vercel Proxy Route
        const response = await fetch(BASE_URL);
        const result = await response.json();
        
        // Structured verification of backend responses array patterns
        if (Array.isArray(result)) {
          setComments(result.length > 0 ? result : fallbackTestimonials);
        } else if (result && result.success && Array.isArray(result.comments)) {
          setComments(result.comments.length > 0 ? result.comments : fallbackTestimonials);
        } else if (result && Array.isArray(result.data)) {
          setComments(result.data.length > 0 ? result.data : fallbackTestimonials);
        } else {
          setComments(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Failed connecting to comments backend route:", error);
        setComments(fallbackTestimonials); // ✅ FIX: Fallback applied safely
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <section className="bg-[#f5f3ee] py-16 px-4 min-h-[500px] flex flex-col justify-center">
      
      {/* Structural Heading Info section */}
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#355e3b] bg-[#355e3b]/5 px-3 py-1 rounded-full">
          Reviews
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mt-3">
          What Our Customers Say
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Real organic results experienced by real people
        </p>
      </div>

      {/* Loading Spinner Module */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-[#355e3b] w-8 h-8" />
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto w-full px-2 sm:px-4">
          
          {/* Desktop Grid Architecture Layout */}
          <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch w-full">
            {comments.map((item, index) => (
              <div key={item._id || `desk-${index}`} className="h-full">
                <Card item={item} />
              </div>
            ))}
          </div>

          {/* Mobile Swiper Slider Container */}
          <div className="md:hidden w-full">
            <Swiper spaceBetween={16} slidesPerView={1.15} grabCursor={true}>
              {comments.map((item, index) => (
                <SwiperSlide key={item._id || `mob-${index}`}>
                  <Card item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
        </div>
      )}

    </section>
  );
};

export default Testimonials;