import { MessageCircle } from "lucide-react";

const Whatsapp = () => {
  const phoneNumber = "923292608369"; // Replace with your number

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        fixed
        bottom-5
        right-5
        z-50

        bg-[#25D366]
        text-white

        p-4
        rounded-full
        shadow-xl

        flex
        items-center
        justify-center

        transition-all
        duration-300

        hover:scale-110
        hover:shadow-2xl
      "
    >
      {/* Pulse Effect */}
      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-[#25D366]
          animate-ping
          opacity-20
        "
      />

      {/* Icon */}
      <MessageCircle
        size={26}
        className="relative z-10"
      />
    </a>
  );
};

export default Whatsapp;