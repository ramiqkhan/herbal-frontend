import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDropdown = ({ setMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Your exact active live herbal backend URL
  const BASE_URL = "https://herbal-backend-chi.vercel.app/api/products";

  // Helper inside the component to handle dynamic fallback if seoUrl is missing
  const getProductSlug = (product) => {
    if (product.seoUrl) return product.seoUrl;
    if (!product.name) return product._id || "";
    return product.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Fetch all products stream when dropdown opens
  const fetchAllProducts = async () => {
    if (products.length > 0) return; // Background pull prevention layer if already cached
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Inventory system reachable error");
      
      const data = await res.json();
      
      // Verification fallbacks matching your CategoryCard schema
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Dropdown Products Fetch Error:", err);
      setError("Failed to sync catalog");
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown on outside focus window click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      fetchAllProducts();
    }
  };

  const handleProductClick = (product) => {
    const productSlug = getProductSlug(product);
    navigate(`/product/${productSlug}`);
    setIsOpen(false); // Automatically dismiss menu panel on route selection
    
    // ✅ Closes the mobile toggle bar menu overlay instantly
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left font-sans" ref={dropdownRef}>
      {/* Dropdown Navigation Trigger */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#355e3b] font-medium hover:text-[#2d4d2f] transition-colors duration-300 focus:outline-none"
      >
        Shop Products
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#355e3b]' : 'text-[#2d2a26]'}`} 
        />
      </button>

      {/* Dropdown Flyout Panel Content */}
      {isOpen && (
        <div 
          className="absolute left-0 mt-2 w-[280px] sm:w-[320px] max-h-[360px] overflow-y-auto bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 py-2 scroll-smooth"
          style={{ 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)'
          }}
        >
          {/* Loading Loader Animation */}
          {loading && (
            <div className="flex items-center justify-center py-8 text-gray-400 gap-2.5">
              <Loader2 className="animate-spin text-[#355e3b]" size={16} />
              <span className="uppercase tracking-widest text-[10px] font-bold italic text-gray-500">Syncing Collection...</span>
            </div>
          )}

          {/* Error Warning Message Fallback */}
          {error && (
            <div className="px-4 py-4 text-center text-red-500 font-bold text-[11px] uppercase tracking-wider">
              {error}
            </div>
          )}

          {/* Empty Inventory Safeguard Row */}
          {!loading && !error && products.length === 0 && (
            <div className="px-4 py-4 text-center text-gray-400 font-bold text-[11px] uppercase tracking-wider">
              No organic assets found
            </div>
          )}

          {/* Main Products Map List Layout */}
          {!loading && !error && products.map((product) => {
            const displayPrice = product.sizes && product.sizes.length > 0 
              ? parseFloat(product.sizes[0].price || 0) 
              : parseFloat(product.basePrice || 0);

            return (
              <div
                key={product._id}
                onClick={() => handleProductClick(product)}
                className="flex items-center gap-3.5 px-4 py-3 hover:bg-[#fdfcfb] cursor-pointer border-b border-gray-50 last:border-b-0 group transition-colors duration-200"
              >
                {/* Image Showcase Miniature Display */}
                <div className="w-10 h-10 rounded-xl bg-[#f7f7f7] flex items-center justify-center p-1.5 shrink-0 overflow-hidden border border-gray-100/50">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Leaf size={14} className="text-[#355e3b]/40" />
                  )}
                </div>

                {/* Metadata Title and Value Specs Label */}
                <div className="flex flex-col min-w-0 flex-1 text-left">
                  <span className="text-[12px] font-bold text-[#2d2a26] uppercase tracking-tight line-clamp-1 group-hover:text-[#355e3b] transition-colors">
                    {product.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#355e3b] mt-0.5 font-mono">
                    Rs. {displayPrice.toLocaleString('en-PK')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductDropdown;