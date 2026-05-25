import { useState } from "react";
import {
    Leaf,
    Plus,
    Minus,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import herbImg from "../../assets/plant.png";
const faqs = [
    {
        question: "What is an herbal supplement?",
        answer:
            "Herbal supplements are products made from plant extracts designed to support overall health, immunity, and daily wellness naturally.",
    },
    {
        question: "Are herbal supplements safe to use daily?",
        answer:
            "Yes, our herbal supplements are carefully formulated using natural ingredients and are safe for daily wellness support.",
    },
    {
        question: "How long does it take to see results?",
        answer:
            "Results may vary depending on lifestyle and consistency, but many users notice positive changes within a few weeks.",
    },
    {
        question:
            "Can I take herbal supplements with other vitamins?",
        answer:
            "In most cases yes, but we always recommend consulting your healthcare professional for personalized advice.",
    },
];

const FAQ = () => {
    const [active, setActive] = useState(0);

    const toggleFAQ = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <section className="bg-[#f5f3ee] py-16 px-4 md:px-8 overflow-hidden">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

                {/* LEFT SIDE */}
                <div className="flex flex-col justify-between">

                    {/* TOP */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <Leaf className="text-[#355e3b]" size={28} />

                            <span className="text-[#355e3b] font-semibold text-lg">
                                Need Help?
                            </span>
                        </div>

                        <h2
                            className="
                text-5xl
                md:text-7xl
                font-bold
                text-[#0d2213]
                leading-none
                mb-8
              "
                        >
                            Everything You
                            <br />
                            Need to Know
                        </h2>

                        {/* <p
                            className="
                text-gray-500
                text-lg
                leading-relaxed
                max-w-xl
              "
                        >
                            Explore helpful answers about our herbal products,
                            ingredients, safety, and how to use them effectively.
                        </p> */}
                    </div>

                    {/* CARD */}
                    <div
                        className="
    relative
    bg-gradient-to-br
    from-[#1f3d24]
    to-[#355e3b]
    rounded-[32px]
    overflow-hidden
    min-h-[320px]
    md:min-h-[380px]
    p-6
    md:p-10
    flex
    items-center
  "
                    >
                        {/* Glow Effect */}
                        <div
                            className="
      absolute
      -top-20
      -right-20
      w-72
      h-72
      bg-[#d4a017]/20
      blur-3xl
      rounded-full
    "
                        />

                        {/* CONTENT */}
                        <div
                            className="
      relative
      z-10
      max-w-full
      md:max-w-[340px]
    "
                        >
                            <span
                                className="
        inline-block
        bg-[#d4a017]
        text-[#1f2a1f]
        text-xs
        md:text-sm
        font-semibold
        px-4
        py-2
        rounded-full
        mb-5
      "
                            >
                                Monday - Saturday Support
                            </span>

                            <h3
                                className="
        text-white
        text-3xl
        sm:text-4xl
        font-bold
        leading-tight
        mb-5
      "
                            >
                                Still Curious?
                                <br />
                                Ask Us Anything
                            </h3>

                            <p
                                className="
        text-gray-200
        text-sm
        sm:text-base
        leading-relaxed
        mb-8
      "
                            >
                                Our herbal wellness experts are always ready
                                to guide and support your healthy journey.
                            </p>



                            <Link to="/contact">
                                <button
                                    className="
      bg-[#d4a017]
      hover:bg-[#e5b52a]
      transition-all
      duration-300
      px-7
      py-4
      rounded-full
      font-semibold
      text-[#1f2a1f]
      flex
      items-center
      gap-2
      shadow-lg
      hover:scale-105
      cursor-pointer
    "
                                >
                                    Contact Us
                                    <ArrowRight size={18} />
                                </button>
                            </Link>

                        </div>

                        {/* IMAGE */}
                        <img
                            src={herbImg}
                            alt="Herbal"
                            className="
      absolute
      bottom-0
      right-0
      w-[180px]
      sm:w-[240px]
      md:w-[320px]
      object-contain
      opacity-95
    "
                        />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div>

                    <h2
                        className="
              text-5xl
              md:text-6xl
              font-bold
              text-[#0d2213]
              mb-5
            "
                    >
                        General Questions
                    </h2>

                    <p
                        className="
              text-gray-500
              text-lg
              leading-relaxed
              max-w-2xl
              mb-10
            "
                    >
                        Find helpful answers about our herbal supplements,
                        ingredients, benefits, and how to use them safely daily.
                    </p>

                    {/* FAQ ITEMS */}
                    <div className="space-y-5">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="
                  bg-[#dfe6df]
                  rounded-[28px]
                  p-6
                  transition-all
                  duration-300
                "
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="
                    w-full
                    flex
                    justify-between
                    items-start
                    gap-4
                    text-left
                  "
                                >
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            {active === index ? (
                                                <Minus
                                                    className="text-black  "
                                                    size={24}
                                                />
                                            ) : (
                                                <Plus
                                                    className="text-[#355e3b] cursor-pointer"
                                                    size={24}
                                                />
                                            )}
                                        </div>

                                        <h3
                                            className="
                        text-xl
                        md:text-2xl
                        font-semibold
                        text-[#0d2213]
                      "
                                        >
                                            {faq.question}
                                        </h3>
                                    </div>
                                </button>

                                {active === index && (
                                    <p
                                        className="
                      text-gray-500
                      text-lg
                      leading-relaxed
                      mt-5
                      pl-10
                    "
                                    >
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;