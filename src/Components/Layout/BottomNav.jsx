import { FiHome, FiGrid, FiShoppingCart, FiUser } from 'react-icons/fi';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-50">
      <button className="flex flex-col items-center text-[#355e3b] text-sm">
        <FiHome className="text-xl" />
        Home
      </button>
      <button className="flex flex-col items-center text-sm">
        <FiGrid className="text-xl" />
        Categories
      </button>
      <button className="flex flex-col items-center text-sm">
        <FiShoppingCart className="text-xl" />
        Cart
      </button>
      <button className="flex flex-col items-center text-sm">
        <FiUser className="text-xl" />
        Account
      </button>
    </nav>
  );
};

export default BottomNav;