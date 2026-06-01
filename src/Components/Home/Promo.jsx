import { ArrowRight, ShoppingBag } from "lucide-react";

const Promo = () => {
  return (
    <section className="w-full bg-[#f8f5ee] px-3 sm:px-5 lg:px-8 py-6 sm:py-10 overflow-hidden">
      
      {/* MAIN PROMO BOX */}
      <div
        className="
          relative
          max-w-[1450px]
          mx-auto
          overflow-hidden
          rounded-[26px]
          sm:rounded-[36px]
          lg:rounded-[42px]
          bg-gradient-to-br
          from-[#143822]
          via-[#1f4d2f]
          to-[#0f2d1b]
          min-h-[420px]
          sm:min-h-[500px]
          lg:min-h-[580px]
          flex
          items-center
          justify-center
        "
      >

        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0">

          {/* GOLD GLOW */}
          <div
            className="
              absolute
              -top-24
              -left-20
              w-[220px]
              h-[220px]
              sm:w-[380px]
              sm:h-[380px]
              bg-[#d4a017]/20
              rounded-full
              blur-3xl
            "
          />

          {/* GREEN GLOW */}
          <div
            className="
              absolute
              -bottom-28
              -right-24
              w-[260px]
              h-[260px]
              sm:w-[450px]
              sm:h-[450px]
              bg-green-400/10
              rounded-full
              blur-3xl
            "
          />

          {/* CENTER LIGHT */}
          <div
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[500px]
              h-[500px]
              bg-white/5
              rounded-full
              blur-3xl
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            w-full
            text-center
            px-5
            sm:px-10
            lg:px-16
            py-14
            sm:py-16
            lg:py-20
            flex
            flex-col
            items-center
            justify-center
          "
        >

          {/* TOP BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-white/10
              border
              border-white/10
              backdrop-blur-md
              text-[#f4c542]
              px-4
              sm:px-6
              py-2
              rounded-full
              text-[11px]
              sm:text-sm
              font-semibold
              mb-5
              shadow-lg
            "
          >
            <ShoppingBag size={16} />
            Premium Herbal Wellness
          </div>

          {/* HEADING */}
          <h1
            className="
              text-white
              font-bold
              leading-[1.05]
              tracking-tight
              max-w-5xl
              mx-auto
              text-[38px]
              xs:text-[42px]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Enjoy{" "}
            <span className="text-[#f4c542]">
              30% Off
            </span>
            <br className="hidden sm:block" />
            Herbal Essentials
          </h1>

          {/* SUBTEXT */}
          <p
            className="
              text-white/80
              mt-5
              sm:mt-7
              max-w-3xl
              mx-auto
              leading-7
              sm:leading-8
              text-sm
              sm:text-lg
              lg:text-xl
            "
          >
            Boost your wellness routine with premium herbal
            supplements crafted using natural ingredients
            for daily energy, immunity, and healthy living.
          </p>

          {/* BUTTONS */}
          <div
            className="
              mt-8
              sm:mt-10
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-4
              w-full
              sm:w-auto
            "
          >

            {/* PRIMARY BUTTON */}
            <button
              className="
                w-full
                sm:w-auto
                min-w-[220px]
                bg-[#d4a017]
                hover:bg-[#bc8f12]
                text-[#1f2a1f]
                px-7
                sm:px-9
                py-3.5
                rounded-full
                font-semibold
                text-sm
                sm:text-base
                flex
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                hover:scale-105
                shadow-2xl
                cursor-pointer
              "
            >
              Get Offer
              <ShoppingBag size={18} />
            </button>

            {/* SECONDARY BUTTON */}
            <button
              className="
                w-full
                sm:w-auto
                min-w-[220px]
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                backdrop-blur-md
                text-white
                px-7
                sm:px-9
                py-3.5
                rounded-full
                font-semibold
                text-sm
                sm:text-base
                flex
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                hover:scale-105
                cursor-pointer
              "
            >
              Discover More
              <ArrowRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;