import { Leaf, Truck, Flame } from "lucide-react";


import React from "react";

const messages = [
  { text: "Organic & Halal",   icon: <Leaf className="w-4 h-4"/> },
  {  icon: <Truck className="w-4 h-4" />,
      text: "Fuel Charges Are Now Effective" },
   {
      icon: <Flame className="w-4 h-4" />,
      text: "Upto 30% OFF",
    },
];

const Horizontal = () => {
  return (
    <div className="w-full bg-[#1e3a24] text-white overflow-hidden relative  border-b border-white/10 shadow-sm">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          white-space: nowrap;
          width: max-content;
          animation: scroll 80s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="h-9 flex items-center bg-gradient-to-r from-black/20 via-transparent to-black/20">
        <div className="animate-marquee">
          
          {/* Main Set */}
          <div className="flex items-center">
            {messages.map((item, idx) => (
              <div key={idx} className="flex items-center px-12 group">
                <span className="flex items-center justify-center w-6 h-6 bg-white/10 rounded-full mr-3 transition-colors group-hover:bg-[#D4AF37]/20">
                  {React.cloneElement(item.icon, { className: "text-white group-hover:text-[#D4AF37] transition-colors" })}
                </span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap">
                  {item.text}
                </span>
                <span className="ml-12 text-white/20 text-xs font-light">|</span>
              </div>
            ))}
          </div>
          
          {/* Loop Set (Identical) */}
          <div className="flex items-center">
            {messages.map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center px-12 group">
                <span className="flex items-center justify-center w-6 h-6 bg-white/10 rounded-full mr-3 transition-colors group-hover:bg-[#D4AF37]/20">
                  {React.cloneElement(item.icon, { className: "text-white group-hover:text-[#D4AF37] transition-colors" })}
                </span>
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap">
                  {item.text}
                </span>
                <span className="ml-12 text-white/20 text-xs font-light">|</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Horizontal;