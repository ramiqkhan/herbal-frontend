import { MessageCircle } from "lucide-react";
import whatsappIcon from "../../assets/OIP1.jfif";
const Whatsapp = () => {
  const phoneNumber = "923292608369"; // Replace with your number
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-md hover:scale-105 transition overflow-hidden"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
};

export default Whatsapp;