import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import React, { useEffect } from "react";
import SEO from "../Components/SEO";

// ✅ DEPLOYED PRODUCTION BACKEND ENDPOINT INTEGRATED
const BASE_URL = "https://herbal-backend-chi.vercel.app/api/inquiries";

const Contact = () => {
useEffect(() => {
  document.title = "Contact Us | Herbalyze";
}, []);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", text: "" });

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPopup = (type, text) => {
    setPopup({ show: true, type, text });
    setTimeout(() => {
      setPopup({ show: false, type: "", text: "" });
    }, 3000);
  };

  // ================= SUBMIT FORM =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Updated path to direct backend router stream
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        showPopup("success", "Message sent successfully! 🎉");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        showPopup("error", "Failed to send message ❌");
      }
    } catch (error) {
      console.error("Error dispatching database inquiry:", error);
      setLoading(false);
      showPopup("error", "Server error ❌");
    }
  };

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      <SEO
  title="Contact Us | Herbalyze"
  description="Get in touch with Herbalyze for product inquiries and customer support."
  keywords="contact herbalyze, customer support"
  image="https://www.theherbalyze.com/herballogo.png"
url="https://www.theherbalyze.com/pages/contact"
/>
      {/* 🛎️ POPUP ALERT (Centered on the Page with Smooth Zoom In) */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10 backdrop-blur-xs transition-all pointer-events-none">
          <div
            className={`px-8 py-4 rounded-2xl shadow-2xl text-white font-semibold text-base tracking-wide text-center transform scale-100 animate-in zoom-in-95 duration-200 ${
              popup.type === "success" ? "bg-green-600 border border-green-500" : "bg-red-600 border border-red-500"
            }`}
          >
            {popup.text}
          </div>
        </div>
      )}

      {/* 🗂️ MAIN CARD CONTAINER */}
      <div className="bg-white rounded-[32px] shadow-lg border border-[#ebe5d8] p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
          
          {/* ================= LEFT COLUMN: CONTACT INFO ================= */}
          <div className="w-full lg:col-span-5 space-y-6 lg:sticky lg:top-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2d2a26] tracking-tight text-center lg:text-left">
                Contact Information
              </h2>
              <p className="text-gray-600 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base text-center lg:text-left">
                We love to hear from you. Your feedback and suggestions are always welcome.
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Main responsive stacked wrapper layout */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4 pt-2">
              
              {/* Our Location Card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs hover:border-gray-200 transition-colors w-full">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#355e3b] shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Our Location</h4>
                  <p className="text-gray-700 text-xs sm:text-sm font-medium break-words leading-tight">Pechs Block 2, Karachi, Pakistan</p>
                </div>
              </div>

              {/* Call Us Directly Card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs hover:border-gray-200 transition-colors w-full">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#355e3b] shrink-0">
                  <Phone size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Call Us Directly</h4>
                  <p className="text-gray-700 text-xs sm:text-sm font-medium break-words leading-tight">(+92) 3292608369</p>
                </div>
              </div>

              {/* Email Support Card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs hover:border-gray-200 transition-colors w-full sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-[#355e3b] shrink-0">
                  <Mail size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Email Support</h4>
                  <p className="text-gray-700 text-xs sm:text-sm font-medium break-words leading-tight">info.herbalyze@gmail.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE FORM ================= */}
          <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#1f2f1f] mb-6 tracking-wide">
              Contact Us
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* FULL NAME */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name (required)"
                  className="w-full border border-gray-300 bg-white rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] transition-all text-sm font-medium"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-1.5">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address (required)"
                  className="w-full border border-gray-300 bg-white rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] transition-all text-sm font-medium"
                  required
                />
              </div>

              {/* PHONE */}
              <div className="flex flex-col gap-1.5">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 bg-white rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] transition-all text-sm font-medium"
                />
              </div>

              {/* MESSAGE */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe Your Message or Inquiry (required)"
                  className="w-full border border-gray-300 bg-white rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] resize-none transition-all text-sm font-medium"
                  required
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-[#355e3b] hover:bg-[#2c4d31] text-white py-4 rounded-full transition-all duration-300 hover:scale-[1.01] font-semibold shadow-md active:scale-95 disabled:opacity-60 cursor-pointer text-sm tracking-wide mt-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;