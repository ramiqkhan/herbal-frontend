// src/Pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../../src/Pages/Cart'; // Using your verified path configuration
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiShoppingBag, FiCheckCircle, FiLoader } from 'react-icons/fi';

// ✅ LIVE DEPLOYED PRODUCTION ENDPOINT
const BASE_URL = "https://herbal-backend-chi.vercel.app/api/orders";

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Track layout state flow (false = Reviewing items list, true = filling form details)
  const [isFormStep, setIsFormStep] = useState(false);
    useEffect(() => {
    document.title = "Checkout | Herbalyze";
  }, []);
  // Backend integration states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    optionalphone: '',
    paymentMethod: 'cod' // Matches your order schema enum default value
  });

  // Dynamic Shipping Fee Constant Configuration
  const SHIPPING_FEE = 350.00;

  // Calculate Subtotal totals dynamically using your new basePrice configuration
  const subtotal = cartItems.reduce((total, item) => {
    const activePrice = parseFloat(item.basePrice || 0);
    return total + activePrice * item.quantity;
  }, 0);

  // Unified Total Calculated Amount
  const totalAmount = subtotal + SHIPPING_FEE;

  // Handle controlled form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission directly structured for your backend models
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Shape your state array dynamically into your mongoose backend orderItemSchema format
    const mappedOrderItems = cartItems.map((item) => {
      // Determine the actual dynamic unit price (checks if size has a custom price, otherwise falls back to base)
      const unitPrice = parseFloat(item.selectedSize?.price || item.basePrice || 0);
      const calculatedItemTotal = unitPrice * item.quantity;

      return {
        product: item.id || item._id,
        name: item.name,
        image: item.image || (item.images && item.images[0]) || "",
        size: item.selectedSize ? {
          label: item.selectedSize.label,
          price: parseFloat(item.selectedSize.price || item.basePrice || 0)
        } : undefined,
        quantity: item.quantity,
        totalPrice: calculatedItemTotal
      };
    });

    // Structure object exactly mirroring your backend shippingSchema and orderSchema parameters
    const finalPayload = {
      orderItems: mappedOrderItems,
      shippingInfo: {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        optionalphone: formData.optionalphone,
        city: formData.city,
        address: formData.address
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice: subtotal,
      shippingPrice: SHIPPING_FEE,
      totalAmount: totalAmount // ✅ Now carries the accurate calculated final sum to the server gateway
    };

    try {
      // ✅ Direct fetch proxy redirection to Live Cloud Deployment Engine
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalPayload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create order entry on system registry database.");
      }

      // Safely clear out the cart elements now that server database entry is verified
      if (typeof clearCart === 'function') {
        clearCart(); 
      }
      
      // Success routing flow execution 
      navigate(`/track?number=${result.trackingNumber}`);
    } catch (err) {
      console.error("Order creation processing error details:", err);
      setError(err.message || "Something went wrong while executing server database commit pipelines.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-[#2d2a26] mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to your cart before checking out.</p>
        <Link to="/" className="bg-[#355e3b] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2d4d2f] transition">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      
      {/* STEPS PROGRESS INDICATOR BAR */}
      <div className="flex items-center justify-center gap-4 mb-10 max-w-md mx-auto text-sm font-semibold">
        <div className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${!isFormStep ? 'border-[#355e3b] text-[#355e3b]' : 'border-transparent text-gray-400'}`}>
          <span className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">1</span>
          Review Order
        </div>
        <div className="w-12 h-[1px] bg-gray-200 mb-2" />
        <div className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${isFormStep ? 'border-[#355e3b] text-[#355e3b]' : 'border-transparent text-gray-400'}`}>
          <span className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">2</span>
          Shipping Details
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
        
        {/* LEFT COLUMN PANEL AREA */}
        <div className="lg:col-span-8 space-y-6">
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-2xl border border-red-100">
              ⚠️ Error: {error}
            </div>
          )}
          
          {!isFormStep ? (
            /* VIEW A: HORIZONTAL COMPACT ITEM STREAM CARDS */
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#2d2a26] mb-4 flex items-center gap-2">
                <FiShoppingBag className="text-[#355e3b]" /> Confirm Ordered Items
              </h2>
              
              <div className="divide-y divide-gray-100 border border-gray-100 bg-white rounded-3xl p-2 sm:p-6 shadow-xs">
                {cartItems.map((item) => {
                  const itemId = item.id || item._id;
                  const itemPrice = parseFloat(item.basePrice || 0);
                  const currentSizeLabel = item.selectedSize?.label || null;

                  return (
                    <div key={`${itemId}-${currentSizeLabel}`} className="py-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between dynamic-row">
                      
                      {/* Thumbnail & Title Context */}
                      <div className="flex gap-4 items-center flex-1">
                        <img 
                          src={item.image || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=500&auto=format&fit=crop"} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-xl bg-gray-100 border border-gray-50 flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-base font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                          
                          {/* SHOW SELECTED VARIANT LABEL */}
                          {item.selectedSize?.label && (
                            <p className="text-xs font-semibold text-gray-400 mt-0.5 bg-gray-50 px-2 py-0.5 rounded w-fit">
                              Size: {item.selectedSize.label}
                            </p>
                          )}

                          <p className="text-xs text-gray-500 mt-1">Unit price: Rs. {itemPrice.toLocaleString('en-PK')}</p>
                        </div>
                      </div>

                      {/* Quantity widget control interface */}
                      <div className="flex items-center gap-8 justify-between sm:justify-end">
                        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                          <button 
                            onClick={() => updateQuantity(itemId, -1, currentSizeLabel)} 
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-xs border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 active:scale-95 transition cursor-pointer"
                          >
                            —
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(itemId, 1, currentSizeLabel)} 
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white shadow-xs border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 active:scale-95 transition cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Cumulative product price display */}
                        <div className="text-right min-w-[100px]">
                          <span className="text-base font-black text-[#355e3b] block">
                            Rs. {(itemPrice * item.quantity).toLocaleString('en-PK')}
                          </span>
                          <button 
                            onClick={() => removeFromCart(itemId, currentSizeLabel)}
                            className="text-xs text-red-400 hover:text-red-600 hover:underline transition mt-0.5 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* VIEW B: INTEGRATED REGISTRATION FORM INTERFACE */
            <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-black text-[#2d2a26]">Delivery & Shipping Address</h2>
                <button 
                  type="button"
                  onClick={() => setIsFormStep(false)} 
                  className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition cursor-pointer"
                >
                  <FiArrowLeft /> Edit Items
                </button>
              </div>

              <form id="checkout-shipping-form" onSubmit={handleSubmitOrder} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Street Address / Location</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address / Location" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Alternative Phone (Optional)</label>
                  <input type="tel" name="optionalphone" value={formData.optionalphone} onChange={handleInputChange} placeholder="Alternative Phone (Optional)" className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition text-sm font-semibold text-gray-800" />
                </div>
                <div className="sm:col-span-2 pt-2">
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Payment Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full border border-gray-200 bg-slate-50/50 rounded-xl p-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#355e3b]/20 focus:border-[#355e3b] transition font-semibold text-gray-700 text-sm">
                    <option value="cod">Cash on Delivery (COD)</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN PANEL AREA: PRICING COMPARTMENT BOX */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sticky top-24 shadow-xs">
            <h3 className="text-lg font-bold text-[#2d2a26] mb-4 border-b border-gray-200 pb-3">Fees & Payment Summary</h3>
            
            <div className="space-y-3.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-800">Rs. {subtotal.toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Estimated Tax</span>
                <span className="font-semibold text-gray-800">Rs. 0</span>
              </div>
              
              {/* Dynamic Shipping Fee Row */}
              <div className="flex justify-between text-sm text-gray-600 items-center">
                <span>Shipping Fee</span>
                <span className="font-semibold text-gray-800">Rs. {SHIPPING_FEE.toLocaleString('en-PK')}</span>
              </div>
              
              {/* Final Calculated Total Bill Amount */}
              <div className="flex justify-between text-base font-black text-[#2d2a26] pt-3 border-t border-dashed border-gray-200">
                <span>Total Bill Amount</span>
                <span className="text-xl text-[#355e3b]">Rs. {totalAmount.toLocaleString('en-PK')}</span>
              </div>
            </div>

            {/* CONDITIONAL ACTION BUTTONS */}
            {!isFormStep ? (
              <button 
                type="button"
                onClick={() => setIsFormStep(true)}
                className="w-full bg-[#355e3b] text-white py-4 px-4 rounded-xl font-bold hover:bg-[#2d4d2f] transition-all text-center mt-6 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                Proceed to Details 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-3 mt-6">
                <button 
                  type="submit"
                  form="checkout-shipping-form"
                  disabled={loading}
                  className="w-full bg-[#2d4d2f] text-white py-4 px-4 rounded-xl font-bold hover:bg-[#1e341f] transition-all text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" /> Processing Order...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle /> Complete & Place Order
                    </>
                  )}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setIsFormStep(false)}
                  disabled={loading}
                  className="w-full bg-transparent text-gray-500 py-2 rounded-xl text-xs font-semibold hover:text-gray-800 transition-colors text-center cursor-pointer disabled:opacity-50"
                >
                  ← Go Back and Edit Items
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;