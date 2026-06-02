// src/components/Header.jsx
import { useState } from "react";
import { FiMenu, FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // Cleaned up imports
import { useCart } from "../../Pages/Cart"; // Your Hook path
import navPic from "../../assets/herblayze.png";
import ProductDropdown from "./dropdown";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 1. FIX: Added the missing initialization parentheses () here
  const navigate = useNavigate(); 
  
  // Extract state and functions from CartContext
  const { cartItems, isCartOpen, setIsCartOpen, cartCount, updateQuantity, removeFromCart } = useCart();

  // Helper inside the component to handle dynamic fallback if seoUrl is missing
  const getProductSlug = (item) => {
    if (item.seoUrl) return item.seoUrl;
    if (!item.name) return item._id || item.id || "";
    return item.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Dynamically calculate the precise rolling drawer total using basePrice
  const drawerSubtotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.basePrice || 0) * item.quantity;
  }, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* NAVBAR */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-[#355e3b] md:hidden cursor-pointer"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

         {/* LOGO - CENTER ON MOBILE */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
            <Link to="/">
              <img
                src={navPic}
                alt="HerbalYze Logo"
                className="h-10 sm:h-10 md:h-12 w-auto object-contain"
              />
            </Link>
          </div>
        </div>

        {/* DESKTOP MENU */}
    <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">Home</Link>
          <Link to="/pages/about" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">About Us</Link>
          <Link to="/pages/contact" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">Contact Us</Link>
          <Link to="/pages/track" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">Track Order</Link>
          <Link to="/blogs/news" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">Blogs</Link>
          <ProductDropdown setMenuOpen={setMenuOpen} />
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 sm:gap-4 text-xl text-[#355e3b]">
          {/* CART ICON WITH BADGE */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2 cursor-pointer hover:scale-110 transition focus:outline-none"
          >
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`
          fixed inset-0 z-50 bg-[#f8f5ee]
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* MENU CONTENT */}
        <div className="flex flex-col h-full px-6 py-8">

          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-10">
            <img
              src={navPic}
              alt="HerbalYze Logo"
              className="h-10 object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl text-[#355e3b]"
            >
              <FiX />
            </button>
          </div>

          {/* LINKS */}
    {/* DESKTOP MENU */}
<nav className="hidden md:flex items-center gap-8">
  <Link to="/" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">
    Home
  </Link>
  
  {/* ✅ Updated to Shopify-style path */}
  <Link to="/pages/about" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">
    About Us
  </Link>
  
  {/* ✅ Updated to Shopify-style path */}
  <Link to="/pages/contact" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">
    Contact Us
  </Link>
  
  {/* ✅ Updated to Shopify-style path */}
  <Link to="/pages/track" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">
    Track Order
  </Link>
  
  {/* ✅ Updated to match /blogs/news */}
  <Link to="/blogs/news" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">
    Blogs
  </Link>
  
  {/* <Link to="/pages/services" className="text-[#355e3b] font-medium hover:text-[#2d4d2f] transition">Services</Link> */}
  <ProductDropdown setMenuOpen={setMenuOpen} />
</nav>
        </div>
      </div>

      {/* SIDEBAR CART DRAWER OVERLAY */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Dark backdrop element */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer" onClick={() => setIsCartOpen(false)} />
        
        {/* Drawer container panel */}
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-[#2d2a26] text-xl font-bold flex items-center gap-2">
              <FiShoppingCart /> Your Cart ({cartCount})
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-500 hover:text-black transition text-2xl cursor-pointer">
              <FiX />
            </button>
          </div>

          {/* Drawer Items Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <FiShoppingCart size={48} className="mb-3 opacity-50" />
                <p className="font-medium">Your shopping cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemId = item.id || item._id;
                const activePrice = parseFloat(item.basePrice || 0);
                const currentSizeLabel = item.selectedSize?.label || null;
                const productSlug = getProductSlug(item);

                return (
                  <div key={`${itemId}-${currentSizeLabel}`} className="flex gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-center">
                    <Link to={`/product/${productSlug}`} onClick={() => setIsCartOpen(false)}>
                      <img 
                        src={item.image || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=500&auto=format&fit=crop"} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-xl bg-gray-200 border border-gray-100 flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${productSlug}`} onClick={() => setIsCartOpen(false)}>
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-[#355e3b] transition">{item.name}</h4>
                      </Link>
                      
                      {/* FIXED: DYNAMIC SIZE LABEL INDICATOR */}
                      {item.selectedSize?.label && (
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5 bg-gray-200/60 px-1.5 py-0.5 rounded w-fit">
                          Size: {item.selectedSize.label}
                        </p>
                      )}

                      {/* Cleaned up dynamic pricing stack layout info */}
                      <p className="text-xs text-gray-500 mt-1">
                        {item.quantity} x Rs {activePrice.toFixed(2)}
                      </p>
                      <p className="font-extrabold text-gray-900 text-sm mt-0.5">
                        Rs {(activePrice * item.quantity).toFixed(2)}
                      </p>
                      
                      {/* Quantity control widgets */}
                      <div className="flex items-center gap-2 mt-2">
                        {/* FIXED: Passing size argument to decrease */}
                        <button 
                          onClick={() => updateQuantity(itemId, -1, currentSizeLabel)} 
                          className="p-1 rounded bg-white border border-gray-200 text-xs hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FiMinus />
                        </button>
                        <span className="text-xs font-semibold px-1 w-4 text-center text-gray-700">{item.quantity}</span>
                        {/* FIXED: Passing size argument to increase */}
                        <button 
                          onClick={() => updateQuantity(itemId, 1, currentSizeLabel)} 
                          className="p-1 rounded bg-white border border-gray-200 text-xs hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    {/* FIXED: Passing size argument to remove button completely */}
                    <button 
                      onClick={() => removeFromCart(itemId, currentSizeLabel)} 
                      className="text-gray-400 hover:text-red-500 transition p-2 cursor-pointer"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-slate-50 space-y-4">
              <div className="flex justify-between items-center text-gray-800 font-bold text-sm px-1">
                <span>Subtotal:</span>
                <span className="text-[#355e3b] text-base font-black">Rs {drawerSubtotal.toFixed(2)}</span>
              </div>
              <Link 
                to="/checkout"
                onClick={() => {
                  setIsCartOpen(false); // Close the side drawer overlay
                  if (typeof setMenuOpen === "function") setMenuOpen(false); // Close mobile menu if applicable
                }}
                className="w-full bg-[#355e3b] text-white py-4 rounded-xl font-bold hover:bg-[#2d4d2f] transition-all text-center shadow-md block cursor-pointer"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;