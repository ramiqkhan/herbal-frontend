import {
  Leaf,
  FlaskConical,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

// import productImg from "../../assets/herblayze.png";

const BotanicalSection = () => {
  return (
    <section className="bg-[#f5f3ee] py-14 md:py-20 px-4 overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT SIDE */}
        <div className="relative flex justify-center lg:justify-start">
          
          {/* GREEN CARD */}
          <div
            className="
              bg-[#355e3b]
              text-white
              rounded-[35px]
              md:rounded-[45px]
              p-6
              sm:p-8
              md:p-10
              w-full
              max-w-[520px]
              relative
              z-10
              shadow-xl
            "
          >
            
            {/* Item */}
            <div className="mb-8 md:mb-10">
              <Leaf className="text-yellow-400 mb-3" size={28} />

              <h3 className="text-xl md:text-3xl font-bold leading-tight mb-3">
                Premium Herbal Extracts
              </h3>

              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                Carefully sourced herbal ingredients designed to support
                wellness naturally and effectively.
              </p>
            </div>

            {/* Item */}
            <div className="mb-8 md:mb-10">
              <FlaskConical className="text-yellow-400 mb-3" size={28} />

              <h3 className="text-xl md:text-3xl font-bold leading-tight mb-3">
                Science-Backed Formula
              </h3>

              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                Advanced herbal blends crafted for better daily health and
                consistent results.
              </p>
            </div>

            {/* Item */}
            <div>
              <ShieldCheck className="text-yellow-400 mb-3" size={28} />

              <h3 className="text-xl md:text-3xl font-bold leading-tight mb-3">
                Clean & Safe Ingredients
              </h3>

              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                Free from harmful additives with trusted natural wellness
                support.
              </p>
            </div>
          </div>

          {/* PRODUCT IMAGE */}
          {/* <img
            src={productImg}
            alt="Herbal Product"
            className="
              absolute
              
              right-[-10px]

              w-[180px]
              sm:w-[240px]
              md:w-[320px]
              lg:w-[380px]

              z-20
              drop-shadow-2xl

              lg:right-[-40px]
            "
          /> */}
        </div>

        {/* RIGHT SIDE */}
        <div className="text-center lg:text-left">
          
          {/* Badge */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <Leaf className="text-[#355e3b]" size={22} />

            <span className="text-[#355e3b] font-semibold text-sm md:text-base">
              Clean & Trusted Formula
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bold
              text-[#2d2a26]
              leading-tight
              mb-6
            "
          >
            Only the Best Herbal
          </h2>

          {/* Paragraph */}
          <p
            className="
              text-gray-600
              text-base
              md:text-lg
              leading-relaxed
              mb-8
              max-w-xl
              mx-auto
              lg:mx-0
            "
          >
            We carefully select premium herbal ingredients to create natural
            wellness products that support immunity, energy, and everyday
            balance.
          </p>

          {/* Features */}
          <div>
            <h3 className="text-2xl font-semibold text-[#2d2a26] mb-5">
              Trusted Quality Standards
            </h3>

            <div className="space-y-4">
              
              {[
                "100% Herbal Ingredients",
                "Organic Certified",
                "Chemical-Free",
                "No Artificial Additives",
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-center
                    lg:justify-start
                    gap-3
                  "
                >
                  <CheckCircle
                    className="text-[#355e3b]"
                    fill="currentColor"
                    size={22}
                  />

                  <span className="text-base md:text-lg text-[#2d2a26]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BotanicalSection;