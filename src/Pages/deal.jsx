import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../src/Pages/Cart"; // ✅ Linked to your central Cart context
import { ArrowRight, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";

const DealPage = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pull active global cart functions from your custom hook context
  const { addToCart } = useCart();

  // ✅ Live Vercel Backend URL configured inline
  const API_URL = "https://herbal-backend-chi.vercel.app/api/deals/all";

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter to display only active combo packages
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

  // ✅ ACTIVE ADD TO CART HANDLER FOR GRID VIEW
  const handleAddToCartClick = (e, deal) => {
    e.stopPropagation(); // Prevents clicking the button from accidentally triggering card navigate
    if (!deal) return;

    const updatedDealForCart = {
      ...deal,
      name: deal.title, // Maps layout contract property keys safely
      image: deal.images?.[0] || "",
      basePrice: parseFloat(deal.sellingPrice || 0),
      selectedSize: null // Combo bundles do not utilize size options
    };

    // Adds a single bundle unit to the global cart array seamlessly
    addToCart(updatedDealForCart, 1, null);
  };

  // ✅ ACTIVE BUY NOW FAST-TRACK HANDLER FOR GRID VIEW
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

    // Appends payload to checkout states and routes immediately
    addToCart(updatedDealForCart, 1, null, true);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center bg-[#f8f5ee]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#355e3b]"></div>
        <p className="mt-4 text-[#355e3b] font-medium animate-pulse">
          Loading live combo deals...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center bg-[#f8f5ee] px-4">
        <AlertCircle className="text-red-500 w-12 h-12 mb-3" />
        <p className="text-red-600 font-medium text-center">
          Failed to connect to Vercel Server: {error}
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#f8f5ee] py-14 sm:py-16 lg:py-24 text-[#2d2a26]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADING SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-[#355e3b]/10 text-[#355e3b] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
            <Sparkles size={14} /> Limited Time Offers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">
            Exclusive Herbal Combo Deals
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Save instantly with our premium combo bundles.
          </p>
        </div>

        {/* DEALS DISPLAY GRID */}
        {deals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#ebe5d8] p-8">
            <p className="text-gray-500">No combo deals are currently active. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <div 
                key={deal._id}
                onClick={() => handleViewDeal(deal.seoUrl)}
                className="group bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#ebe5d8] hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                {/* IMAGE BOX */}
                <div className="relative aspect-[3/3] w-full overflow-hidden bg-gray-100">
                  <img 
                    src={deal.images?.[0] || "https://placehold.co/600x400?text=Combo+Deal"} 
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
               
                </div>

                {/* CONTENT DATA LAYOUT */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2d2a26] mb-3 line-clamp-2 group-hover:text-[#355e3b] transition-colors">
                    {deal.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {deal.description}
                  </p>

                  {/* PRICE CONTAINER */}
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 line-through font-medium">
                        Rs. {deal.originalPrice?.toLocaleString()}
                      </span>
                      <span className="text-2xl font-bold text-[#355e3b]">
                        Rs. {deal.sellingPrice?.toLocaleString()}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-[#355e3b] group-hover:underline flex items-center gap-1">
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>

                  {/* ACTION BUTTON Row */}
                  <div className="mt-auto pt-4 border-t border-[#f3ede2] flex items-center gap-2.5 w-full">
                    <button
                      onClick={(e) => handleAddToCartClick(e, deal)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 border border-[#355e3b] text-[#355e3b] hover:bg-slate-50 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                      + Cart
                    </button>

                    <button
                      onClick={(e) => handleBuyNowClick(e, deal)}
                      className="flex-1 inline-flex items-center justify-center bg-[#355e3b] hover:bg-[#2d4d2f] text-white py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealPage;