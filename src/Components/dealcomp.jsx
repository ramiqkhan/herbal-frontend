import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/Cart"; // Ensure path matches your setup
import { ArrowRight, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";

const DealComponent = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const API_URL = "https://herbal-backend-chi.vercel.app/api/deals/all";

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDeals(data.filter(deal => deal.isActive !== false));
      } catch (err) {
        console.error("🚨 Vercel Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleViewDeal = (seoUrl) => {
    navigate(`/pages/deals/${seoUrl}`);
  };

  const handleAddToCartClick = (e, deal) => {
    e.stopPropagation();
    if (!deal) return;

    const updatedDealForCart = {
      ...deal,
      name: deal.title,
      image: deal.images?.[0] || "",
      basePrice: parseFloat(deal.sellingPrice || 0),
      selectedSize: null
    };

    addToCart(updatedDealForCart, 1, null);
  };

  const handleBuyNowClick = (e, deal) => {
    e.stopPropagation(); 
    if (!deal) return;

    const updatedDealForCart = {
      ...deal,
      name: deal.title,
      image: deal.images?.[0] || "",
      basePrice: parseFloat(deal.sellingPrice || 0),
      selectedSize: null
    };

    addToCart(updatedDealForCart, 1, null, true);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#355e3b]"></div>
        <p className="mt-3 text-[#355e3b] text-sm font-medium animate-pulse">
          Loading exclusive bundles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 flex flex-col items-center justify-center px-4 border border-red-100 rounded-3xl bg-red-50/50">
        <AlertCircle className="text-red-500 w-8 h-8 mb-2" />
        <p className="text-red-600 text-sm font-medium text-center">
          Couldn't load deals: {error}
        </p>
      </div>
    );
  }

  if (deals.length === 0) return null; // Gracefully hide the block if empty

  return (
    <div className="mb-20">
      {/* HEADING SUBSECTION */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 bg-[#355e3b]/10 text-[#355e3b] px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
          <Sparkles size={14} /> Limited Time Offers
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2d2a26]">
          Exclusive Herbal Combo Deals
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Save instantly with our premium combo bundles.
        </p>
      </div>

      {/* DEALS DISPLAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((deal) => (
          <div 
            key={deal._id}
            onClick={() => handleViewDeal(deal.seoUrl)}
            className="group bg-white rounded-[32px] overflow-hidden shadow-xs border border-[#ebe5d8] hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
          >
            {/* IMAGE BOX */}
            <div className="relative aspect-[3/3] w-full overflow-hidden bg-gray-50">
              <img 
                src={deal.images?.[0] || "https://placehold.co/600x400?text=Combo+Deal"} 
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* CONTENT DATA LAYOUT */}
            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-serif font-bold text-[#2d2a26] mb-2 line-clamp-2 group-hover:text-[#355e3b] transition-colors">
                {deal.title}
              </h3>
              
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
                {deal.description}
              </p>

              {/* PRICE CONTAINER */}
              <div className="mb-6 flex items-center justify-between gap-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-400 line-through font-medium">
                    Rs. {deal.originalPrice?.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-[#355e3b]">
                    Rs. {deal.sellingPrice?.toLocaleString()}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#355e3b] group-hover:underline flex items-center gap-1">
                  View Details <ArrowRight size={14} />
                </span>
              </div>

              {/* ACTION BUTTON Row */}
              <div className="pt-4 border-t border-[#f3ede2] flex items-center gap-2.5 w-full">
                <button
                  onClick={(e) => handleAddToCartClick(e, deal)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 border border-[#355e3b] text-[#355e3b] hover:bg-slate-50 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  + Cart
                </button>

                <button
                  onClick={(e) => handleBuyNowClick(e, deal)}
                  className="flex-1 inline-flex items-center justify-center bg-[#355e3b] hover:bg-[#2d4d2f] text-white py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* SEPARATOR */}
      <hr className="border-gray-200 mt-16" />
    </div>
  );
};

export default DealComponent;