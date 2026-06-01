// import {
//   ShoppingCart,
//   Truck,
//   MessageCircleMore,
// } from "lucide-react";

// const FeaturesBar = () => {
//   const features = [
//     {
//       icon: <ShoppingCart size={22} />,
//       title: "Order Online",
//       desc: "Fast herbal delivery",
//     },

//     {
//       icon: <Truck size={22} />,
//       title: "Nationwide Shipping",
//       desc: "All across Pakistan",
//     },

//     {
//       icon: <MessageCircleMore size={22} />,
//       title: "24/7 Support",
//       desc: "WhatsApp assistance",
//     },
//   ];

//   return (
//     <section className=" py-5 px-4">
      
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
//         {features.map((item, index) => (
//           <div
//             key={index}
//             className="
//               group
//               bg-white
//               border
//               border-[#ebe5d8]
//               rounded-2xl
//               px-4
//               py-4
//               flex
//               items-center
//               gap-4
//               shadow-sm
//               hover:shadow-md
//               transition-all
//               duration-300
//             "
//           >
//             {/* Icon Box */}
//             <div
//               className="
//                 w-12
//                 h-12
//                 rounded-xl
//                 bg-[#355e3b]/10
//                 flex
//                 items-center
//                 justify-center
//                 text-[#355e3b]
//                 group-hover:bg-[#355e3b]
//                 group-hover:text-white
//                 transition-all
//                 duration-300
//                 shrink-0
//               "
//             >
//               {item.icon}
//             </div>

//             {/* Content */}
//             <div>
              
//               <h3
//                 className="
//                   text-base
//                   md:text-lg
//                   font-semibold
//                   text-[#1f2a1f]
//                   leading-tight
//                 "
//               >
//                 {item.title}
//               </h3>

//               <p
//                 className="
//                   text-gray-500
//                   text-sm
//                   mt-1
//                 "
//               >
//                 {item.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturesBar;