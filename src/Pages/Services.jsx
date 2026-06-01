import AppointmentForm from "../Components/AppointmentForm";
import React, { useEffect } from "react";
export default function DoctorService() {
  useEffect(() => {
    document.title = "Services | Herbalyze";
  }, []);

  const doctors = [
    {
      name: "Dr. Sarah Khan",
      specialty: "Herbal Skin Specialist",
      experience: "5+ Years Experience",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dr. Ahmed Ali",
      specialty: "Hair & Wellness Expert",
      experience: "7+ Years Experience",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dr. Hina Noor",
      specialty: "Digestive Health Specialist",
      experience: "4+ Years Experience",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const services = [
    "Hair Problems",
    "Skin Care",
    "Weight Loss",
    "Stress & Sleep",
    "Women's Wellness",
    "Digestive Health",
  ];

  return (
    <div className="w-full bg-[#f5f3ee] text-[#1f2a1f]">
      
      {/* HERO SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div>
          <span className="bg-[#355e3b]/10 text-[#355e3b] px-4 py-2 rounded-full text-sm font-semibold">
            Free Herbal Consultation
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-6">
            Talk To Our Herbal Wellness Experts
          </h1>

          <p className="text-gray-600 mt-6 text-base sm:text-lg leading-8 max-w-xl">
            Get free personalized consultation and natural remedy
            recommendations from our certified herbal wellness specialists.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-[#355e3b] hover:bg-[#2c4d31] text-white px-7 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-medium">
              Book Appointment
            </button>

            <button className="border border-[#355e3b] text-[#355e3b] hover:bg-[#355e3b] hover:text-white px-7 py-4 rounded-full transition-all duration-300 font-medium">
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-[#355e3b]/10 rounded-full blur-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
            alt="Doctor Consultation"
            className="w-full h-[350px] sm:h-[500px] object-cover rounded-[32px] shadow-xl relative z-10"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Consultation Categories
          </h2>

          <p className="text-gray-600 mt-4">
            Personalized guidance for your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#ebe5d8]"
            >
              <h3 className="font-semibold text-sm sm:text-base">
                {service}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Meet Our Experts
          </h2>

          <p className="text-gray-600 mt-4">
            Certified wellness specialists ready to guide you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#ebe5d8] group"
            >
              <div className="overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#1f2a1f]">
                  {doctor.name}
                </h3>

                <p className="text-[#355e3b] mt-2 font-medium">
                  {doctor.specialty}
                </p>

                <p className="text-gray-500 mt-2 text-sm">
                  {doctor.experience}
                </p>

                <button className="mt-6 w-full bg-[#355e3b] hover:bg-[#2c4d31] text-white py-3 rounded-full transition-all duration-300 hover:scale-[1.02] font-medium">
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <AppointmentForm />
    </div>
  );
}