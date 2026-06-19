import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, User, ArrowLeft, Tag, Layers } from "lucide-react";
import SEO from "../Components/SEO";

const BlogDetail = () => {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ TRACKS WHICH COVER IMAGE IS CURRENTLY SELECTED
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://herbal-backend-chi.vercel.app/api/blogs/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "We couldn't track down this article entry.");
        }

        setBlog(data);
        // Reset to first image if slug changes
        setActiveImageIndex(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ ENHANCED GIF ENGINE: Safely processes video tags and anchors without attribute leaks
  const renderEnhancedContent = (htmlContent) => {
    if (!htmlContent) return "";

    let processedContent = htmlContent;

    // 1. Process explicit Quill iframe elements
    processedContent = processedContent.replace(/<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>/g, (iframeMatch, src) => {
      if (src.includes("youtube.com/embed/")) {
        const cleanUrl = src.split('?')[0];
        const videoId = cleanUrl.split('/').pop();
        const pureGifParams = `?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1`;
        
        return `<iframe class="ql-video pure-gif-mode" src="${cleanUrl}${pureGifParams}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="false"></iframe>`;
      }
      return iframeMatch;
    });

    // 2. Clear out full anchor tags containing embed URLs so they don't break/leak attributes
    const anchorYoutubeRegex = /<a[^>]*href="(https?:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+[^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
    processedContent = processedContent.replace(anchorYoutubeRegex, (anchorMatch, href) => {
      const cleanUrl = href.split('?')[0];
      const videoId = cleanUrl.split('/').pop();
      const pureGifParams = `?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1`;
      
      return `<iframe class="ql-video pure-gif-mode" src="${cleanUrl}${pureGifParams}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="false"></iframe>`;
    });

    // 3. Fallback: Catch leftover naked text links without lookbehind dependencies
    const strictYoutubeRegex = /(https?:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+(?:\?[^"\s<]+)?)/g;
    processedContent = processedContent.replace(strictYoutubeRegex, (match, url, offset, fullString) => {
      const pieces = fullString.substring(0, offset);
      if (pieces.match(/src=\s*["']?[^"']*$/)) {
        return match; 
      }

      const cleanUrl = match.replace(/"/g, "").split('?')[0];
      const videoId = cleanUrl.split('/').pop();
      const pureGifParams = `?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1`;
      
      return `<iframe class="ql-video pure-gif-mode" src="${cleanUrl}${pureGifParams}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="false"></iframe>`;
    });

    return processedContent;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-10 h-10 border-4 border-[#355e3b]/20 border-t-[#355e3b] rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Preparing wellness reading space...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif text-[#1f2f1f] mb-2">Article Not Found</h2>
        <p className="text-gray-500 max-w-sm mb-6">{error || "The article you are looking for does not exist or has been modified."}</p>
        <Link to="/blogs/news" className="inline-flex items-center gap-2 bg-[#355e3b] text-white px-5 py-2.5 rounded-xl hover:bg-[#2b4c2f] transition-colors text-sm font-medium shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Return to Wellness Journal
        </Link>
      </div>
    );
  }

  const blogImages = Array.isArray(blog.images) ? blog.images.filter(Boolean) : [];
  const primarySEOImage = blogImages.length > 0 ? blogImages[0] : "https://www.theherbalyze.com/herballogo.png";
  
  // Safely grab the currently selected active image URL
  const currentActiveImage = blogImages[activeImageIndex] || blogImages[0] || "";

  return (
    <>
      <SEO
        title={`${blog.metaTitle || blog.title} | Herbalyze`}
        description={blog.metaDescription || blog.summary}
        keywords={blog.metaKeywords || "herbal remedy, wellness guide"}
        image={primarySEOImage}
        url={`https://www.theherbalyze.com/blogs/${blog.slug}`}
        tags={blog.tags} 
      />

      <style>{`
        .ql-video.pure-gif-mode {
          width: 100% !important;
          aspect-ratio: 16 / 9 !important;
          border-radius: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          background-color: #000;
          display: block;
          pointer-events: none !important; 
          user-select: none !important;
        }
      `}</style>

      <article className="w-full bg-[#f5f3ee] min-h-screen py-6 sm:py-12">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6">
          
          <div className="mb-6 sm:mb-8">
            <Link 
              to="/blogs/news" 
              className="inline-flex items-center gap-2 text-[#5c665e] hover:text-[#355e3b] font-medium text-sm transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
            </Link>
          </div>

          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm border border-[#ebe5d8]/60 p-5 sm:p-10 md:p-12">
            
            <header className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#1f2f1f] leading-tight mb-4 sm:mb-5">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#6e7770] border-b border-[#f2eee6] pb-4 sm:pb-6">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-[#6c8e70]" />
                  <span className="font-medium">{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#6c8e70]" />
                  <span className="font-medium">{blog.author || "Herbal Care Admin"}</span>
                </div>
              </div>
            </header>

            {/* ✅ INTERACTIVE GALLEY DISPLAY SYSTEM */}
            {blogImages.length > 0 && (
              <div className="mb-8 space-y-4">
                
                {/* 1. Main Display Box (Renders Selected Photo) */}
                <div className="w-full h-auto max-h-[550px] rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden bg-[#fdfcf9] border border-[#f0eae1] flex items-center justify-center relative shadow-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 blur-xl pointer-events-none transition-all duration-300" 
                    style={{ backgroundImage: `url(${currentActiveImage})` }}
                  />
                  <img 
                    src={currentActiveImage} 
                    alt={blog.title} 
                    className="w-full h-full max-h-[550px] object-contain relative z-10 mx-auto transition-all duration-300"
                  />
                </div>

                {/* 2. Interactive Thumbnail Row (Only shows if there's more than one picture) */}
                {blogImages.length > 1 && (
                  <div>
                    <div className="text-[11px] font-bold tracking-wider text-[#4a5c4e] uppercase mb-2 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Select Cover View ({blogImages.length})
                    </div>
                    
                    <div className="flex flex-wrap gap-2.5">
                      {blogImages.map((imgUrl, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden border transition-all duration-200 bg-[#fdfcf9] cursor-pointer focus:outline-none ${
                            activeImageIndex === index
                              ? "border-[#355e3b] ring-2 ring-[#355e3b]/20 scale-95 shadow-inner"
                              : "border-[#f0eae1] hover:border-gray-400 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Thumbnail choice ${index + 1}`} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            )}

            {blog.summary && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-[#f5f3ee]/50 rounded-xl sm:rounded-2xl border-l-4 border-[#355e3b]">
                <p className="text-sm sm:text-lg italic text-[#2c3e2e] font-medium leading-relaxed">
                  {blog.summary}
                </p>
              </div>
            )}

            {/* DYNAMIC CONTENT CONTAINER */}
            <div 
              className="prose prose-neutral max-w-none prose-sm sm:prose-base prose-headings:font-serif prose-headings:text-[#1f2f1f] prose-p:text-gray-600 prose-p:leading-relaxed prose-headings:mb-4 prose-headings:mt-8 first:prose-headings:mt-0 text-gray-700 dynamic-blog-content"
              dangerouslySetInnerHTML={{ __html: renderEnhancedContent(blog.content) }}
            />

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-[#f2eee6] flex flex-wrap gap-2 items-center">
                <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1 mr-1">
                  <Tag className="w-3.5 h-3.5" /> Filed Under:
                </div>
                {blog.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[11px] sm:text-xs bg-[#f5f3ee] text-[#4a5c4e] px-2.5 py-1 rounded-full font-medium transition-colors hover:bg-[#ebd9c3]/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;