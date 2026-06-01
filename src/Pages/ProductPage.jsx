import React, { useEffect, useState } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import { useCart } from "../../src/Pages/Cart"; // Adjust path if necessary
import { FiShoppingCart, FiMinus, FiPlus, FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";
import SEO from "../Components/SEO";

const ProductPage = () => {
  
  const { seoUrl } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive UI States
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // Tracks the selected size schema object

  // Pull global cart context methods
  const { addToCart, updateQuantity, cartItems } = useCart();
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // ✅ DEPLOYED ROUTE URL STREAM
        const res = await fetch(`https://herbal-backend-chi.vercel.app/api/products/${seoUrl}`);
        if (!res.ok) throw new Error("Product data link endpoint down.");
        
        const data = await res.json();
        setProduct(data);
        
        // ✅ FIXED STEP 1: Default size select karna aur check karna agar uski apni image array majood hai
        if (data?.sizes?.length > 0) {
          const defaultSize = data.sizes[0];
          setSelectedSize(defaultSize);
          
          // Agar size ki apni variation images array mein image hai toh pehle woh active hogi
          if (defaultSize.images && defaultSize.images.length > 0) {
            setActiveImage(defaultSize.images[0]);
          } else if (defaultSize.image) {
            // Safe fallback checking if any old data context strings exist
            setActiveImage(defaultSize.image);
          } else if (data?.images?.length > 0) {
            setActiveImage(data.images[0]);
          }
        } else if (data?.images?.length > 0) {
          // Agar product ke sizes hi nahi hain, toh default main image set hogi
          setActiveImage(data.images[0]);
        }

      } catch (err) {
        console.error("Error fetching unique product specs from deployment server:", err);
      } finally {
        setLoading(false);
      }
    };

    if (seoUrl) {
      fetchProduct();
    }
  }, [seoUrl]);

  // Adjust quantity selector safely
  const handleQuantityChange = (val) => {
    if (quantity + val >= 1) {
      setQuantity(quantity + val);
    }
  };

  // Direct context hook trigger to append item to cart layout array
  const handleAddToCart = () => {
    if (!product) return;

    // Calculate the exact price corresponding to the selected size button state
    const finalPrice = selectedSize ? parseFloat(selectedSize.price) : parseFloat(product.basePrice || 0);

    // Build the updated cart item payload, modifying basePrice on the fly
    const updatedProductForCart = {
      ...product,
      image: activeImage || (product.images && product.images[0]) || "",
      basePrice: finalPrice, 
      selectedSize: selectedSize ? { label: selectedSize.label, price: selectedSize.price } : null
    };

    // Fire the context handler with the newly built payload structure
    addToCart(updatedProductForCart, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    if (!product) return;
    const finalPrice = selectedSize ? parseFloat(selectedSize.price) : parseFloat(product.basePrice || 0);
    
    const updatedProductForCart = {
      ...product,
      image: activeImage || (product.images && product.images[0]) || "",
      basePrice: finalPrice, 
      selectedSize: selectedSize ? { label: selectedSize.label, price: selectedSize.price } : null
    };

    addToCart(updatedProductForCart, quantity, selectedSize, true);
    navigate('/checkout');
  };

  // ✅ FIXED STEP 2: Size click handle karne par structural check array logic 
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    
    // Check karega agar size ke andar images ka array hai aur usme koi image majood hai
    if (size.images && size.images.length > 0) {
      setActiveImage(size.images[0]);
    } else if (size.image) {
      // Safe fallback string parameter tracking
      setActiveImage(size.image);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#355e3b]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The item you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="bg-[#355e3b] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2d4d2f] transition">
          <FiArrowLeft /> Back to Shop
        </Link>
      </div>
    );
  }

  // 🔥 Dynamic Pricing Calculation Stream Logic
  const displaySellingPrice = selectedSize ? parseFloat(selectedSize.price || 0) : parseFloat(product.basePrice || 0);
  const displayOriginalPrice = selectedSize ? selectedSize.originalPrice : product.originalPrice;

  return (
    <>  
      <SEO
        title={`${product?.name} | Herbalyze`}
        description={product?.description?.substring(0, 160)}
        keywords={`${product?.name}, herbal product, herbalyze`}
        image={activeImage}
        url={`https://www.theherbalyze.com/product/${seoUrl}`}
      />
      
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        {/* BREADCRUMB */}
        <div className="mb-8">
          <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-[#355e3b] flex items-center gap-2 transition w-fit">
            <FiArrowLeft /> Back to shop products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE VISUAL GALLERY */}
          <div className="lg:col-span-6 space-y-4">
            <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 shadow-xs aspect-square max-h-[500px]">
              <img
                src={activeImage || "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=500&auto=format&fit=crop"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500 unique-product-frame"
              />
            </div>
            
            {/* Thumbnail Strip (only renders if multiple images exist) */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-slate-50 flex-shrink-0 transition-all ${activeImage === img ? 'border-[#355e3b] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: DETAIL CHECKOUT INFORMATION OVERVIEW */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
            <div>
              {/* HOT PRODUCT BADGE */}
              <div className="w-full text-center mb-5">
                <span className="inline-block bg-[#355e3b] px-4 py-1 text-[10px] md:text-xs font-bold tracking-[0.18em] uppercase text-white rounded-md shadow-xs">
                  Hot Product | Low Stock
                </span>
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#355e3b] bg-green-50 px-3 py-1 rounded-md inline-block mb-3">
                Premium Herbal Selection
              </span>
              
              <h1 className="text-3xl sm:text-4xl font-black text-[#2d2a26] tracking-tight">
                {product.name}
              </h1>
              
              {/* 💰 DYNAMIC PRICES WRAPPER BLOCK WITH STRIKE-THROUGH */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-black text-[#355e3b] tracking-tight">
                  Rs. {displaySellingPrice.toLocaleString('en-PK')}
                </span>

                {displayOriginalPrice && (
                  <span className="text-base text-gray-400 line-through font-medium font-mono">
                    Rs. {parseFloat(displayOriginalPrice).toLocaleString('en-PK')}
                  </span>
                )}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* DYNAMIC SIZE SELECTOR CONTAINER */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => {
                    // ✅ FIXED: Fallback tracking back to correct variations structure checking (_id / label)
                    const isSelected = selectedSize?._id === size._id || selectedSize?.label === size.label;
                    return (
                      <button
                        key={size._id || index}
                        type="button"
                        onClick={() => handleSizeSelect(size)}
                        className={`px-5 py-3 rounded-xl font-bold text-sm transition-all border cursor-pointer flex flex-col items-center ${
                          isSelected
                            ? "bg-[#355e3b] text-white border-[#355e3b] shadow-sm scale-95"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span>{size.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && <hr className="border-gray-100" />}

            {/* QUANTITY */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Quantity</span>
              <div className="flex items-center justify-between border border-gray-200 bg-slate-50 p-2 rounded-xl w-36 h-14">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-sm font-bold flex items-center justify-center hover:bg-gray-100 transition active:scale-95"
                >
                  <FiMinus />
                </button>
                <span className="font-extrabold text-gray-800 text-base px-2">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-sm font-bold flex items-center justify-center hover:bg-gray-100 transition active:scale-95"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS ROW */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
              <button 
                onClick={handleAddToCart}
                className="w-full sm:flex-1 h-13 border-2 border-[#355e3b] text-[#355e3b] font-bold rounded-xl hover:bg-slate-50 transition flex items-center justify-center cursor-pointer text-base"
              >
                Add to Cart
              </button>

              <button 
                onClick={handleBuyNow}
                className="w-full sm:flex-1 h-13 bg-[#355e3b] text-white font-bold rounded-xl hover:bg-[#2d4d2f] transition flex items-center justify-center text-center shadow-xs cursor-pointer text-base"
              >
                Buy Now
              </button>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-2">Description</h3>
              <div className="space-y-3">
                {product.description ? (
                  product.description.split("\n").map((paragraph, index) => 
                    paragraph.trim() ? (
                      <p key={index} className="text-gray-600 leading-relaxed text-base">
                        {paragraph}
                      </p>
                    ) : (
                      <br key={index} />
                    )
                  )
                ) : (
                  <p className="text-gray-400 italic">No product description provided.</p>
                )}
              </div>
            </div>

            {/* ACCORDION FAQ SEGMENT */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-[#2d2a26] mb-4">Frequently Asked Questions</h3>
              
              {product.faqs?.length > 0 ? (
                <div className="space-y-2">
                  {product.faqs.map((faq, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-white transition-all shadow-xs">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                          className="w-full p-4 text-left font-bold text-sm text-gray-800 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition"
                        >
                          <span className="pr-4">{faq.question}</span>
                          {isOpen ? <FiChevronUp className="text-gray-500 shrink-0" /> : <FiChevronDown className="text-gray-500 shrink-0" />}
                        </button>
                        
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-gray-50' : 'max-h-0'}`}>
                          <p className="p-4 text-sm text-gray-600 leading-relaxed bg-white">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No FAQs configured for this specific formulation.</p>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;