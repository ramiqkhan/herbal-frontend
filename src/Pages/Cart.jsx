import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initializer function checks localStorage before setting state back to empty []
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('herbal_cart_items');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed parsing cart data from localStorage:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Automatically save cartItems to localStorage whenever the array changes
  useEffect(() => {
    localStorage.setItem('herbal_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

// Isko thoda change karein taake bypassCartOpen parameter mil sake
const addToCart = (product, chosenQuantity = 1, selectedSize = null, bypassCartOpen = false) => {
  setCartItems((prevItems) => {
    const productId = product._id || product.id;
    
    const existingItem = prevItems.find(
      (item) => (item._id === productId || item.id === productId) && 
                item.selectedSize?.label === selectedSize?.label
    );

    if (existingItem) {
      return prevItems.map((item) =>
        (item._id === productId || item.id === productId) && 
        item.selectedSize?.label === selectedSize?.label
          ? { 
              ...item, 
              quantity: item.quantity + chosenQuantity,
              basePrice: product.basePrice 
            }
          : item
      );
    }

    return [
      ...prevItems,
      { 
        ...product, 
        id: productId, 
        quantity: chosenQuantity, 
        selectedSize: selectedSize ? { label: selectedSize.label, price: selectedSize.price } : null
      }
    ];
  });
  
  // Agar bypassCartOpen true hoga (matlab Buy Now daba hai) toh sidebar cart open nahi hoga
  if (!bypassCartOpen) {
    setIsCartOpen(true);
  }
};

  const removeFromCart = (id, sizeLabel = null) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const itemId = item._id || item.id;
        
        // If the ID doesn't match, keep the item safely
        if (itemId !== id) return true;
        
        // If the ID matches, check the size labels
        const itemSize = item.selectedSize?.label || null;
        const targetSize = sizeLabel || null;
        
        // Keep the item only if the sizes are different
        return itemSize !== targetSize;
      })
    );
  };

  const updateQuantity = (id, amount, sizeLabel = null) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          const itemId = item._id || item.id;
          
          // Fallback primitives ensure matching logic does not break on plain items
          const itemSize = item.selectedSize?.label || null;
          const targetSize = sizeLabel || null;

          return itemId === id && itemSize === targetSize
            ? { ...item, quantity: item.quantity + amount }
            : item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // 🔥 NEW: Clear Cart Handler
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        clearCart // Exposing the clear function to your checkout component hook
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);