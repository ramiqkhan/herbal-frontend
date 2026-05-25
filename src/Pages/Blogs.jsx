import {
  CalendarDays,
  ArrowRight,
  User,
} from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Herbal Remedies for Daily Wellness",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
    date: "12 July 2026",
    author: "HerbalYze Team",
    desc: "Discover natural herbal remedies that support immunity, digestion, and everyday wellness.",
  },

  {
    id: 2,
    title: "Benefits of Organic Oils for Skin Care",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
    date: "15 July 2026",
    author: "Admin",
    desc: "Learn how organic herbal oils nourish your skin naturally without harmful chemicals.",
  },

  {
    id: 3,
    title: "Why Herbal Products Are Better Than Chemicals",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    date: "18 July 2026",
    author: "HerbalYze",
    desc: "Explore the long-term benefits of switching to natural and herbal wellness products.",
  },

  {
    id: 4,
    title: "Healthy Living Starts With Natural Ingredients",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop",
    date: "22 July 2026",
    author: "Wellness Expert",
    desc: "Simple lifestyle habits and natural ingredients can improve your overall health.",
  },
];

const Blog = () => {
  return (
    <section className="w-full bg-[#f5f3ee] py-16 min-h-screen">
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* HEADING */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1f2f1f] mb-4">
            Herbal Wellness Blog
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Explore wellness tips, herbal remedies, and healthy lifestyle
            inspiration from HerbalYze experts.
          </p>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-[#ebe5d8] group"
            >
              
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                
                {/* META */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                  
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-[#355e3b]" />
                    <span>{blog.date}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#355e3b]" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-semibold text-[#1f2f1f] mb-3 leading-snug">
                  {blog.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {blog.desc}
                </p>

                {/* BUTTON */}
                <button className="flex items-center gap-2 text-[#355e3b] font-medium hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;