import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../src/Pages/Cart"; // ✅ Path matches your ProductPage context import
import { 
  ArrowLeft, 
  ShoppingBag, 
  CheckCircle, 
  Truck, 
  Star, 
  AlertCircle,
  Clock
} from "lucide-react";
import { FiMinus, FiPlus } from "react-icons/fi";

const DetailDealPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Data States
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1); // ✅ Added quantity state management

  // Pull global cart context methods matching ProductPage structure
  const { addToCart } = useCart();

  const API_SINGLE_URL = `https://herbal-backend-chi.vercel.app/api/deals/single/${slug}`;

  useEffect(() => {
    const fetchDealDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_SINGLE_URL);
        if (!response.ok) throw new Error("Deal not found");
        const data = await response.json();
        setDeal(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDealDetail();
    window.scrollTo(0, 0);
  }, [slug]);

  // Adjust quantity selector safely
  const handleQuantityChange = (val) => {
    if (quantity + val >= 1) {
      setQuantity(quantity + val);
    }
  };

  // ✅ ACTIVE ADD TO CART LINK
  const handleAddToCart = () => {
    if (!deal) return;

    // Build payload mimicking ProductPage structure, assigning sellingPrice to basePrice
    const updatedDealForCart = {
      ...deal,
      name: deal.title, // Maps title over to name property for cart layout continuity
      image: deal.images?.[activeImage] || (deal.images && deal.images[0]) || "",
      basePrice: parseFloat(deal.sellingPrice || 0), 
      selectedSize: null // Combo packages do not contain sizing variant attributes
    };

    // Fire global context action
    addToCart(updatedDealForCart, quantity, null);
  };

  // ✅ ACTIVE BUY NOW LINK
  const handleBuyNow = () => {
    if (!deal) return;

    const updatedDealForCart = {
      ...deal,
      name: deal.title,
      image: deal.images?.[activeImage] || (deal.images && deal.images[0]) || "",
      basePrice: parseFloat(deal.sellingPrice || 0), 
      selectedSize: null
    };

    // Fire the redirect logic to push payload context straight into checkout
    addToCart(updatedDealForCart, quantity, null, true);
    navigate('/checkout');
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5ee]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#355e3b]"></div>
    </div>
  );

  if (error || !deal) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5ee]">
      <AlertCircle className="text-red-500 w-12 h-12 mb-4" />
      <p className="text-gray-700 font-serif text-xl">Oops! This deal has expired or doesn't exist.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-[#355e3b] underline">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f5ee] pb-20">
      {/* NAVIGATION / BACK BUTTON */}
      <div className="max-w-[1300px] mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#355e3b] transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft size={20} /> Back to Deals
        </button>
      </div>

      <main className="max-w-[1300px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: IMAGES */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-[40px] overflow-hidden border border-[#ebe5d8] bg-white shadow-sm">
            <img 
              src={deal.images?.[activeImage] || "https://placehold.co/600x600?text=Combo+Deal"} 
              alt={deal.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail Strip */}
          {deal.images && deal.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {deal.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === index ? "border-[#355e3b]" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INFO */}
        <div className="flex flex-col justify-center">
          {/* Header Info */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {deal.isBestSeller && (
                <span className="bg-[#d4a017] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Best Seller
                </span>
              )}
              <span className="bg-[#355e3b]/10 text-[#355e3b] text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                Combo Deal
              </span>
                 {deal.discountPercentage > 0 && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg mb-1">
                  {deal.discountPercentage}% OFF
                </span>
              )}
              {/* Top Banner Warning for Low Stocks */}
              {deal.stock && deal.stock <= 15 && (
                <span className="bg-red-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full animate-pulse">
                  Low Stock | Only {deal.stock} Left
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] leading-tight mb-4">
              {deal.title}
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {deal.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-white rounded-3xl p-6 border border-[#ebe5d8] shadow-sm mb-6">
  {/* Price Wrapper: flex-row ensures elements stay side-by-side, flex-wrap gracefully handles extreme zoom */}
  <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mb-2">
    <span className="text-2xl sm:text-4xl font-bold text-[#355e3b] whitespace-nowrap">
      Rs. {deal.sellingPrice?.toLocaleString()}
    </span>

    {deal.originalPrice && (
      <span className="text-base sm:text-xl text-gray-400 line-through whitespace-nowrap">
        Rs. {deal.originalPrice?.toLocaleString()}
      </span>
    )}

  
  </div>

  {deal.originalPrice && deal.sellingPrice && (
    <p className="text-sm text-gray-500 flex items-center gap-2 mt-3 sm:mt-2">
      <CheckCircle size={14} className="text-green-500 shrink-0" /> 
      <span>You save Rs. {(deal.originalPrice - deal.sellingPrice)?.toLocaleString()} on this bundle</span>
    </p>
  )}
</div>

          {/* QUANTITY CONTROL BAR */}
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Quantity</span>
            <div className="flex items-center justify-between border border-gray-200 bg-white p-2 rounded-xl w-36 h-14 shadow-xs">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-100 text-sm font-bold flex items-center justify-center hover:bg-gray-100 transition active:scale-95 cursor-pointer"
              >
                <FiMinus />
              </button>
              <span className="font-extrabold text-gray-800 text-base px-2">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-100 text-sm font-bold flex items-center justify-center hover:bg-gray-100 transition active:scale-95 cursor-pointer"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button 
                onClick={handleAddToCart}
                className="w-full sm:flex-1 h-14 border-2 border-[#355e3b] text-[#355e3b] font-bold rounded-xl hover:bg-white/50 transition flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <ShoppingBag size={18} /> Add Bundle to Cart
              </button>

              <button 
                onClick={handleBuyNow}
                className="w-full sm:flex-1 h-14 bg-[#355e3b] hover:bg-[#2d4d2f] text-white font-bold rounded-xl transition flex items-center justify-center text-center shadow-md cursor-pointer text-base"
              >
                Buy Now
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
         
               
               {/* ✅ FIXED DYNAMIC BADGE LOGIC */}
               <div className="flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-xl border border-[#ebe5d8]">
                  {deal?.stock && deal.stock <= 15 ? (
                    <>
                      <AlertCircle size={16} className="text-amber-600 animate-pulse shrink-0" />
                      <span className="text-amber-700 font-bold">
                        Only {deal.stock} Bundles Left!
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock size={16} className="text-[#355e3b] shrink-0" />
                      <span>Limited Time Promotion</span>
                    </>
                  )}
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DetailDealPage;