import banner from "../../assets/banner.png";

const Banner = () => {
  return (
    <section className="px-4 py-6 md:py-10">
      <div className="w-full bg-[#f5f3ee] rounded-3xl overflow-hidden flex items-center justify-center">
        
        <img
          src={banner}
          alt="banner"
          className="w-full h-auto object-contain"
        />

      </div>
    </section>
  );
};

export default Banner;