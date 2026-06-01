import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  PackageCheck,
  Truck,
  MapPin,
  Clock3,
  Search,
  Mail,
  Loader,
  AlertCircle
} from "lucide-react";
import SEO from "../Components/SEO";

// ✅ DEPLOYED PRODUCTION BACKEND ENDPOINT INTEGRATED
const BASE_URL = "https://herbal-backend-chi.vercel.app/api/orders";

const Track = () => {
  const location = useLocation();

  // Input fields state configuration
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  // Backend response management states
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
    useEffect(() => {
    document.title = "Track Order | Herbalyze";
  }, []);

  // Parse trailing query strings implicitly dropped from Checkout route paths
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderNumber = params.get("number");
    if (orderNumber) {
      setSearchId(orderNumber);
      fetchOrderStatus(orderNumber, "");
    }
  }, [location]);

  // Unified API call pipeline matching your Express routes
  const fetchOrderStatus = async (trackingId, email) => {
    if (!trackingId && !email) {
      setError("Please provide a Tracking ID or Email to look up status records.");
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      // ✅ Fetching directly from Live Vercel Proxy Gateway
      const response = await fetch(BASE_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed fetching systemic order files.");
      }

      // Filter array on the client side based on parameters provided
      const foundOrder = result.orders.find((ord) => {
        const matchesId = trackingId ? String(ord.trackingNumber) === String(trackingId) : true;
        const matchesEmail = email ? ord.shippingInfo?.email?.toLowerCase().trim() === email.toLowerCase().trim() : true;
        return trackingId && email ? (matchesId && matchesEmail) : (matchesId && ord.trackingNumber) || (matchesEmail && ord.shippingInfo?.email);
      });

      if (!foundOrder) {
        throw new Error("No active or pending orders match the provided tracking criteria.");
      }

      setOrder(foundOrder);
      setSearched(true);
    } catch (err) {
      console.error("Tracking look up failure details:", err);
      setError(err.message || "An unexpected pipeline routing problem occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrderStatus(searchId, searchEmail);
  };

  // Maps backend enum settings onto index sequences to illuminate progress step indicators dynamically
  const getStatusStepIndex = (status) => {
    switch (status) {
      case "pending": return 0;     // Packed / Awaiting verification
      case "confirmed": return 1;   // Confirmed / Dispatched from source
      case "shipped": return 2;     // Shipped / Reached city facility hub
      case "delivered": return 3;   // Out for delivery / Finished transaction
      default: return 0;
    }
  };

  const currentStep = order ? getStatusStepIndex(order.orderStatus) : -1;

  return (
    <><SEO
  title="Track Your Order | Herbalyze"
  description="Track the real-time shipping status of your Herbalyze organic product order directly using your tracking ID."
  keywords="track order, herbalyze shipping status"
  url="https://www.theherbalyze.com/track"
/>
    <section className="w-full bg-[#f5f3ee] min-h-screen py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* HEADING */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1f2f1f] mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Enter your transaction tracking criteria parameters below to query real-time logistics registry values.
          </p>
        </div>

        {/* TRACKING INPUT BOX CONTAINER */}
        <div className="bg-white rounded-[30px] shadow-sm p-6 sm:p-10 border border-[#e8e3d9]">
          <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* INPUT FIELD: ID */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#355e3b] w-5 h-5" />
              <input
                type="text"
                placeholder="Tracking ID (e.g. 458792)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#355e3b] bg-slate-50/30 text-sm font-semibold"
              />
            </div>

            {/* INPUT FIELD: EMAIL */}
            <div className="relative w-full flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#355e3b] w-5 h-5" />
              <input
                type="email"
                placeholder="Registered Email Address"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#355e3b] bg-slate-50/30 text-sm font-semibold"
              />
            </div>

            {/* ACTION TRIGGER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full lg:w-auto bg-[#355e3b] hover:bg-[#2d4d2f] text-white px-10 py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-400"
            >
              {loading ? <Loader className="animate-spin w-5 h-5" /> : "Track Order"}
            </button>
          </form>

          {/* DYNAMIC FEEDBACK NOTICES */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-2xl border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
            </div>
          )}

          {/* DYNAMIC RESULT STREAM VIEW */}
          {searched && order && (
            <div className="mt-12 animate-fadeIn">
              
              {/* ORDER SUMMARY BLOCK */}
              <div className="bg-[#f8f5ee] rounded-3xl p-6 border border-[#ebe5d8]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center text-center sm:text-left">
                  <div>
                    <p className="text-sm text-gray-500">Tracking ID</p>
                    <h3 className="text-xl font-black text-[#1f2f1f] tracking-wide">
                      {order.trackingNumber}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <h3 className="text-base font-bold text-gray-700 capitalize line-clamp-1">
                      {order.shippingInfo?.fullName || "Valued Customer"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total Bill Amount</p>
                    <h3 className="text-xl font-serif font-black text-[#355e3b]">
                      Rs. {parseFloat(order.totalAmount || 0).toLocaleString('en-PK')}
                    </h3>
                  </div>

                  <div className="flex justify-center sm:justify-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Status</p>
                      <span className="inline-flex items-center gap-2 bg-[#355e3b] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                        <Truck className="w-3.5 h-3.5" />
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TRACKING STEP CARDS TIMELINE */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* STEP 1: PENDING / PACKED */}
                <div className={`rounded-3xl p-6 border transition-all text-center ${currentStep >= 0 ? 'bg-white border-[#355e3b]/30 shadow-md translate-y-0' : 'bg-gray-50/50 border-gray-100 opacity-50'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${currentStep >= 0 ? 'bg-[#355e3b] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <PackageCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1f2f1f] mb-2">Order Packed</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Your organic formulas have been sealed and configured for transport processing channels.</p>
                </div>

                {/* STEP 2: CONFIRMED */}
                <div className={`rounded-3xl p-6 border transition-all text-center ${currentStep >= 1 ? 'bg-white border-[#355e3b]/30 shadow-md' : 'bg-gray-50/50 border-gray-100 opacity-50'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${currentStep >= 1 ? 'bg-[#355e3b] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <Truck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1f2f1f] mb-2">Dispatched</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Manifest handed off to regional logistics couriers successfully.</p>
                </div>

                {/* STEP 3: SHIPPED */}
                <div className={`rounded-3xl p-6 border transition-all text-center ${currentStep >= 2 ? 'bg-white border-[#355e3b]/30 shadow-md' : 'bg-gray-50/50 border-gray-100 opacity-50'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${currentStep >= 2 ? 'bg-[#355e3b] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1f2f1f] mb-2">Reached City Hub</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Package cargo has docked securely at your nearest fulfillment sorting warehouse.</p>
                </div>

                {/* STEP 4: DELIVERED */}
                <div className={`rounded-3xl p-6 border transition-all text-center ${currentStep >= 3 ? 'bg-white border-[#2d4d2f] shadow-lg scale-102' : 'bg-gray-50/50 border-gray-100 opacity-50'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${currentStep >= 3 ? 'bg-[#2d4d2f] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <Clock3 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#1f2f1f] mb-2">Out for Delivery</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Fulfillment courier is currently en route to deliver goods right to your doorstep shortly!</p>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </section></>
  );
};

export default Track;