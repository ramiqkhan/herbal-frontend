import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight, User } from "lucide-react";
import SEO from "../Components/SEO";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH PUBLIC ACTIVE ENTRIES FROM BACKEND
  // ==========================================
  useEffect(() => {
    const fetchPublicBlogs = async () => {
      try {
        const response = await fetch("https://herbal-backend-chi.vercel.app/api/blogs");
        const data = await response.json();
        if (response.ok) {
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error retrieving active public blog lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicBlogs();
  }, []);

  // Helper function to render timestamps into cleanly human-readable formats
  const formatDate = (isoString) => {
    if (!isoString) return "Recent Post";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <SEO
        title="Herbal Wellness Blog | Herbalyze"
        description="Read herbal wellness tips, natural remedies, and healthy lifestyle articles."
        keywords="herbal blog, wellness blog, herbal remedies"
        image="https://www.theherbalyze.com/herballogo.png"
        url="https://www.theherbalyze.com/blogs/news"
      />

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

          {/* LOADING STATES AND BLANK FALLBACK ACTIONS */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-10 h-10 border-4 border-[#355e3b]/20 border-t-[#355e3b] rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-gray-500">Harvesting latest wellness articles...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-medium">Our journal is currently being updated.</p>
              <p className="text-sm text-gray-400 mt-1">Please check back shortly for new herbal insights!</p>
            </div>
          ) : (
            
            /* DYNAMIC DATABASE VALUE RENDERING GRID MATCHING image_44651f.png */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => {
                // Determine cover file path target (Cloudinary arrays vs Unsplash fallback)
                const coverImage = blog.images && blog.images.length > 0 
                  ? blog.images[0] 
                  : "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop";

                return (
                  <div
                    key={blog._id}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#ebe5d8]/60 flex flex-col h-full"
                  >
                    {/* LINK-WRAPPED IMAGE */}
                 <Link to={`/blogs/${blog.slug}`} className="block overflow-hidden bg-[#fdfcf9] relative h-64 border-b border-[#f0eae1] flex items-center justify-center">
  {/* Soft blurred background layer to cleanly fill gaps */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-5 blur-md pointer-events-none" 
    style={{ backgroundImage: `url(${coverImage})` }}
  />
  
  {/* Entire image completely visible */}
  <img
    src={coverImage}
    alt={blog.title}
    loading="lazy"
    className="w-full h-full object-contain relative z-10 hover:scale-[1.02] transition duration-500"
  />
</Link>

                    {/* CONTENT CARD CONTAINER */}
                    <div className="p-7 flex flex-col flex-1">
                      
                      {/* CARD META */}
                      <div className="flex items-center gap-4 text-[11px] text-[#7c847e] mb-3 flex-wrap">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5 text-[#6c8e70]" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#6c8e70]" />
                          <span>{blog.author || "Herbal Care Admin"}</span>
                        </div>
                      </div>

                      {/* LINK-WRAPPED TITLE */}
                      <h2 className="text-xl font-bold text-[#1f2f1f] mb-3 leading-snug line-clamp-2">
                        <Link to={`/blogs/${blog.slug}`} className="hover:text-[#355e3b] transition-colors duration-200">
                          {blog.title}
                        </Link>
                      </h2>

                      {/* SUMMARY BRIEF */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3 flex-1">
                        {blog.summary}
                      </p>

                      {/* LINK-WRAPPED READ MORE ACTION */}
                      <div className="pt-2 mt-auto">
                        <Link 
                          to={`/blogs/${blog.slug}`}
                          className="inline-flex items-center gap-1.5 text-[#355e3b] font-semibold text-sm hover:gap-2.5 transition-all duration-200"
                        >
                          Read More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;