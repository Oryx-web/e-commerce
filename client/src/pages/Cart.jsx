import React from "react";
import { useCart } from "../context/cartContext";
import { createCheckoutSession } from "../services/checkoutService";
import { loadStripe } from '@stripe/stripe-js';

export default function Cart() {
  const { cart, dispatch } = useCart();

  const categoryImages = {
    electronics: "/images/electronics.webp",
    audio: "/images/audio.jpeg",
    fashion: "/images/fashion.webp",
    gaming: "/images/gaming.webp",
    mobile: "/images/mobile.webp",
    laptop: "/images/laptop.webp",
    appliances: "/images/appliances.jpg",
    home: "/images/home.jpg",
    tv: "/images/tv.jpg"
  };  

  const getCategoryImage = (category) => {
    // Convert category to lowercase and remove spaces
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
    // Return matching image path or a default image
    return categoryImages[normalizedCategory] || '';
  };

  const handleRemoveItem = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id
    });
  };
  
  const handleCheckout = async () => {
    try {
      const { url } = await createCheckoutSession(cart);
      window.location.href = url;
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  const total = cart.reduce((acc, item) => 
    acc + (item.price || 0) * (item.quantity || 1), 0
  ).toFixed(2);
  
  return (
    <div className="pt-20 max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-10">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || getCategoryImage(item.category)}
                  alt={item.name}
                  className="w-24 h-24 object-contain bg-white rounded-lg shadow"
                  onError={(e) => {
                  e.target.src = getCategoryImage(item.category);
                  }}
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 text-sm mt-2 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="grid grid-cols-2 grid-rows-2 justify-between items-center pt-6">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold justify-self-end">${total}</span>
            <button 
              onClick={handleCheckout}
              className="w-1/2 mt-5 col-start-2 justify-self-end bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}