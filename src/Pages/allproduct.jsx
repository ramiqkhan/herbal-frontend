import React, { useEffect, useState } from "react";
import { ShoppingCart, Star, Heart, Eye, ArrowRight } from "lucide-react";
import { useCart } from "../Pages/Cart";
import { useNavigate } from "react-router-dom";

// Deployed Backend URL API Endpoint
const BASE_URL = "https://herbal-backend-chi.vercel.app/api/products";

const AllProducts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState({});

  // Toggle Wishlist State locally per product
  const toggleWishlist = (id, e) => {
    e.stopPropagation(); // Stop card click events from navigating
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ================= FETCH ALL PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Network response error during products fetch.");
        
        const data = await res.json();
        
        // Safety validation fallback layers for response arrays
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching live products data streams:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Buy Now with proper scope and propagation block
  const handleBuyNow = (e, product) => {
    e.stopPropagation(); // Stop card click (redirect to detail page)
    
    const quantity = 1;
    const selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null; 
    const finalPrice = selectedSize ? parseFloat(selectedSize.price) : parseFloat(product.basePrice || 0);

    const updatedProductForCart = {
      ...product,
      image: product.images?.[0] || "",
      basePrice: finalPrice, 
      selectedSize: selectedSize ? { label: selectedSize.label, price: selectedSize.price } : null
    };

    addToCart(updatedProductForCart, quantity, selectedSize, true);
    navigate('/checkout');
  };

  return (
    <section className="w-full bg-[#faf9f6] min-h-screen pb-20 sm:pb-28">
      {/* PAGE HERO / BANNER HEADER */}
      <div className="w-full bg-[#355e3b] text-white py-16 sm:py-24 text-center px-4 mb-12">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
          Our Entire <span className="font-serif italic font-normal text-amber-200">Collection</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-200 max-w-md mx-auto font-medium tracking-wide">
          Explore premium, 100% organic wellness formulas curated directly from nature to nurture your health.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* INNER GRID HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Showing {products.length} {products.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        </div>

        {/* LOADING SKELETON STATE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-gray-200/80 rounded-[24px] h-[320px] w-full" />
                <div className="h-4 bg-gray-200/80 rounded w-2/3" />
                <div className="h-4 bg-gray-200/80 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          /* PRODUCT GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {products.map((product) => {
              const isWishlisted = wishlist[product._id];
              
              // Base calculation matching fallbacks
              const displaySellingPrice = product.sizes && product.sizes.length > 0 ? parseFloat(product.sizes[0].price || 0) : parseFloat(product.basePrice || 0);
              const displayOriginalPrice = product.sizes && product.sizes.length > 0 ? product.sizes[0].originalPrice : product.originalPrice;

              return (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product.seoUrl || product._id}`)}
                  className="bg-white rounded-[28px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 group cursor-pointer flex flex-col justify-between h-full min-h-[520px]"
                >
                  {/* IMAGE & BADGES CONTAINER */}
                  <div className="relative aspect-[6/6] w-full overflow-hidden bg-[#f7f7f7]">
                    <img
                      src={product.images?.[0] || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=500"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* TOP ACTION ROW (WISHLIST) */}
                    <div className="absolute top-5 right-5 z-10">
                      <button
                        onClick={(e) => toggleWishlist(product._id, e)}
                        className="p-3 bg-white/95 backdrop-blur-md text-gray-600 rounded-full hover:bg-white hover:text-red-500 shadow-md transition-all active:scale-95"
                      >
                        <Heart 
                          size={20} 
                          className={isWishlisted ? "text-red-500 transition-colors" : "transition-colors"} 
                          fill={isWishlisted ? "currentColor" : "none"} 
                        />
                      </button>
                    </div>

                    {/* HOVER INTERACTION OVERLAY PANEL */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white/95 backdrop-blur-md py-3 px-5 rounded-2xl shadow-xl flex items-center gap-2.5 pointer-events-none">
                        <Eye size={18} className="text-[#355e3b]" />
                        <span className="text-xs font-bold tracking-wide text-gray-800">Quick View</span>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS & ACTIONS FOOTER */}
                  <div className="p-6 md:p-7 flex flex-col justify-between flex-1 text-left bg-white">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#355e3b]/70 block">
                        Herbal Care
                      </span>
                      
                      <h3 className="font-bold text-lg text-[#2d2a26] tracking-tight line-clamp-2 group-hover:text-[#355e3b] transition-colors min-h-[3.5rem] leading-snug">
                        {product.name}
                      </h3>
                      
                      {/* DYNAMIC PRICES BLOCK */}
                      <div className="flex items-baseline gap-2.5 pt-1 flex-wrap">
                        {/* Actual Selling Price */}
                        <span className="text-xl font-black text-[#355e3b]">
                          Rs. {displaySellingPrice.toLocaleString('en-PK')}
                        </span>

                        {/* Cut-out Price */}
                        {displayOriginalPrice && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through font-medium font-mono">
                            Rs. {parseFloat(displayOriginalPrice).toLocaleString('en-PK')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* MODERN BUTTONS GRID */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-6">
                      
                      {/* Add to Cart Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
                          const finalPrice = defaultSize ? parseFloat(defaultSize.price) : parseFloat(product.basePrice || 0);

                          const updatedProductForCart = {
                            ...product,
                            image: product.images?.[0] || "",
                            basePrice: finalPrice, 
                            selectedSize: defaultSize ? { label: defaultSize.label, price: defaultSize.price } : null
                          };

                          addToCart(updatedProductForCart, 1, defaultSize);
                        }}
                        className="w-full sm:flex-1 h-12 border-2 border-[#355e3b] text-[#355e3b] font-bold rounded-xl hover:bg-[#355e3b]/5 transition-colors duration-300 flex items-center justify-center cursor-pointer text-sm tracking-wide"
                      >
                        Add to Cart
                      </button>

                      {/* Buy Now Button */}
                      <button 
                        onClick={(e) => handleBuyNow(e, product)}
                        className="w-full sm:flex-1 h-12 bg-[#355e3b] text-white font-bold rounded-xl hover:bg-[#2d4d2f] shadow-md shadow-green-900/10 transition-all duration-300 flex items-center justify-center text-center cursor-pointer text-sm tracking-wide"
                      >
                        Buy Now
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default AllProducts;