import {
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Sprout,
  Users,
  Headset,
  PackageCheck,
} from "lucide-react";

import aboutImg from "../assets/plant.png";

const stats = [
  {
    icon: <Users size={24} />,
    number: "10K+",
    title: "Happy Customers",
  },
  {
    icon: <Leaf size={24} />,
    number: "100%",
    title: "Herbal Products",
  },
  {
    icon: <Headset size={24} />,
    number: "Mon - Sat",
    title: "Customer Support",
  },
  {
    icon: <PackageCheck size={24} />,
    number: "Eco",
    title: "Sustainable Packaging",
  },
];

const AboutUs = () => {
  return (
    <section className="w-full bg-[#f8f5ee] text-[#2d2a26] overflow-hidden">

      {/* HERO SECTION */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-24 flex justify-center">

        {/* CONTENT */}
        <div className="max-w-4xl text-center">

          <span className="inline-block bg-[#355e3b]/10 text-[#355e3b] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5">
            About Herbalyze
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-5">
            Nature Inspired <br className="hidden sm:block" />
            Wellness for Modern Living
          </h1>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-5">
            Herbalyze was created with one mission —
            bringing the healing power of nature into
            everyday wellness.
          </p>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            From herbal oils to wellness supplements,
            every Herbalyze product is crafted using
            carefully selected natural ingredients inspired
            by traditional herbal remedies and modern research.
          </p>

          {/* BUTTONS */}
          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 justify-center items-center">

            <button
              className="
      bg-[#355e3b]
      hover:bg-[#2d4d2f]
      text-white
      w-full sm:w-auto
      px-5 sm:px-7
      py-2.5 sm:py-3
      text-sm sm:text-base
      rounded-full
      font-medium
      shadow-md
      hover:scale-105
      transition-all duration-300
    "
            >
              Explore Products
            </button>

            <button
              className="
      border border-[#355e3b]
      text-[#355e3b]
      hover:bg-[#355e3b]
      hover:text-white
      w-full sm:w-auto
      px-5 sm:px-7
      py-2.5 sm:py-3
      text-sm sm:text-base
      rounded-full
      font-medium
      transition-all duration-300
    "
            >
              Learn More
            </button>

          </div>
        </div>
      </div>

      {/* OUR STORY */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

        <div className="text-center mb-12 sm:mb-14">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4">
            Our Story
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg">
            Herbalyze started with a simple vision:
            reconnecting people with natural healing traditions
            through pure, trusted, and effective wellness products.
          </p>
        </div>

        {/* STORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ebe5d8] hover:shadow-xl hover:-translate-y-1 transition duration-300">

            <div className="w-14 h-14 rounded-2xl bg-[#355e3b]/10 flex items-center justify-center mb-5 mx-auto lg:mx-0">
              <Leaf className="text-[#355e3b]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-center lg:text-left">
              Pure Ingredients
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center lg:text-left">
              Carefully selected herbal ingredients sourced
              from trusted farms and natural environments.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ebe5d8] hover:shadow-xl hover:-translate-y-1 transition duration-300">

            <div className="w-14 h-14 rounded-2xl bg-[#355e3b]/10 flex items-center justify-center mb-5 mx-auto lg:mx-0">
              <ShieldCheck className="text-[#355e3b]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-center lg:text-left">
              Science Backed
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center lg:text-left">
              Traditional herbal knowledge combined with
              modern wellness research for trusted results.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ebe5d8] hover:shadow-xl hover:-translate-y-1 transition duration-300">

            <div className="w-14 h-14 rounded-2xl bg-[#355e3b]/10 flex items-center justify-center mb-5 mx-auto lg:mx-0">
              <HeartHandshake className="text-[#355e3b]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-center lg:text-left">
              Customer First
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center lg:text-left">
              Herbalyze is committed to delivering wellness
              products customers can trust every day.
            </p>
          </div>
        </div>
      </div>

      {/* OUR MISSION */}
      <div className="bg-[#355e3b] text-white py-14 sm:py-16">

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Sprout className="w-10 h-10" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6">
            Our Mission
          </h2>

          <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto">
            Our mission is to inspire healthier lifestyles
            through natural herbal wellness products that
            are safe, sustainable, and effective.
          </p>
        </div>
      </div>

      {/* MODERN STATS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-3xl
                p-5 md:p-7
                border border-[#e7dfd2]
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all duration-300
                text-center
              "
            >

              {/* ICON */}
              <div
                className="
                  w-14 h-14
                  mx-auto mb-4
                  rounded-2xl
                  bg-[#355e3b]/10
                  flex items-center justify-center
                  text-[#355e3b]
                  group-hover:bg-[#355e3b]
                  group-hover:text-white
                  transition-all duration-300
                "
              >
                {item.icon}
              </div>

              {/* NUMBER */}
              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-bold
                  text-[#355e3b]
                  mb-2
                "
              >
                {item.number}
              </h2>

              {/* TITLE */}
              <p
                className="
                  text-sm
                  sm:text-base
                  text-gray-600
                  font-medium
                "
              >
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default AboutUs;