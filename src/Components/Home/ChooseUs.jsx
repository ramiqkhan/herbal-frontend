import { Leaf, FlaskConical, Globe, Heart } from "lucide-react";

const points = [
  {
    title: "Pure Herbal Ingredients",
    icon: <Leaf size={40} />,
    desc: "Carefully sourced natural ingredients for holistic wellness.",
  },
  {
    title: "Science-Backed Formulas",
    icon: <FlaskConical size={40} />,
    desc: "Blending herbal tradition with modern scientific research.",
  },
  {
    title: "Sustainable Sourcing",
    icon: <Globe size={40} />,
    desc: "Ethically harvested ingredients that support the planet.",
  },
  {
    title: "Trusted by Thousands",
    icon: <Heart size={40} />,
    desc: "Loved by customers for quality and proven results.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f2f1f] mb-3">
          Why HerbalYze?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Discover premium herbal wellness crafted with purity, sustainability,
          and trusted expertise.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((point, index) => (
          <div
            key={index}
            className="bg-[#f8f5ee] hover:bg-[#eef3df] transition-all duration-300 rounded-3xl p-6 shadow-sm hover:shadow-lg border border-[#e7dfcf] text-center"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4 text-[#355e3b]">
              {point.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-[#355e3b] mb-3">
              {point.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;