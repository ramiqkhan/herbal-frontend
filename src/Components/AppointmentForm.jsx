import { useState } from "react";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationType: "",
    healthConcern: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPopup = (type, text) => {
    setPopup({ show: true, type, text });

    setTimeout(() => {
      setPopup({ show: false, type: "", text: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ UPDATED TO LIVE VERCEL PRODUCTION ENDPOINT
      const res = await fetch("https://herbal-backend-chi.vercel.app/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "appointment",
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          consultationType: form.consultationType,
          healthConcern: form.healthConcern,
        }),
      });

      const data = await res.json();

      setTimeout(() => {
        setLoading(false);

        if (data.success) {
          showPopup("success", "Appointment booked successfully 🎉");

          setForm({
            fullName: "",
            email: "",
            phone: "",
            consultationType: "",
            healthConcern: "",
          });
        } else {
          showPopup("error", data.message || "Failed to book appointment ❌");
        }
      }, 1000);
    } catch (error) {
      setLoading(false);
      showPopup("error", "Server error ❌");
    }
  };

  return (
    <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">

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

      <div className="bg-white rounded-[32px] shadow-lg border border-[#ebe5d8] p-6 sm:p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2f1f] font-serif">
            Book Your Appointment
          </h2>

          <p className="text-gray-600 mt-4">
            Fill out the form and our experts will contact you shortly.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] focus:ring-2 focus:ring-[#355e3b]/10 bg-slate-50/30 text-sm font-semibold text-gray-800"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] focus:ring-2 focus:ring-[#355e3b]/10 bg-slate-50/30 text-sm font-semibold text-gray-800"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] focus:ring-2 focus:ring-[#355e3b]/10 bg-slate-50/30 text-sm font-semibold text-gray-800"
          />

          <select
            name="consultationType"
            value={form.consultationType}
            onChange={handleChange}
            className="border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] focus:ring-2 focus:ring-[#355e3b]/10 bg-slate-50/30 text-sm font-semibold text-gray-700"
            required
          >
            <option value="" className="text-gray-400">Select Consultation Type</option>
            <option value="hair_problem">Hair Problems</option>
            <option value="skin_care">Skin Care</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="stress_sleep">Stress & Sleep</option>
          </select>

          <textarea
            name="healthConcern"
            value={form.healthConcern}
            onChange={handleChange}
            rows="5"
            placeholder="Describe Your Health Concern"
            className="md:col-span-2 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-[#355e3b] focus:ring-2 focus:ring-[#355e3b]/10 bg-slate-50/30 text-sm font-semibold text-gray-800 resize-none"
            required
          ></textarea>

          <button
            disabled={loading}
            className="md:col-span-2 bg-[#355e3b] hover:bg-[#2c4d31] text-white py-4 rounded-full transition-all duration-300 hover:scale-[1.01] font-semibold shadow-lg disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Appointment Request"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default AppointmentForm;