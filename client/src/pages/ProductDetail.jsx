import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/cartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [itemAvailable] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [itemReviews] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [itemStars] = useState(() => Math.floor(Math.random() * 5) + 1);
  const { dispatch } = useCart();

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

  const colors = [
    { name: 'Red', class: 'bg-red-400' },
    { name: 'Black', class: 'bg-gray-800' },
    { name: 'Sage', class: 'bg-green-200' },
    { name: 'Silver', class: 'bg-gray-200' },
    { name: 'Navy', class: 'bg-blue-900' }
  ];

  const notify = () => toast.success('Added to cart!', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);        
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

    const getCategoryImage = (category) => {
    // Convert category to lowercase and remove spaces
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
    // Return matching image path or a default image
    return categoryImages[normalizedCategory] || '';
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQuantity = () => quantity < itemAvailable && setQuantity(quantity + 1);

  const handleAddToCart = () => {
    notify();
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        name: product.title, // Changed from title to name to match Cart.jsx
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category
      },
    });
  };

  return (
    <div className="max-w-fit mx-auto px-10 md:px-14 py-8 border-b-2 w-full">
      <nav className="text-sm mb-8">
        <ol className="flex gap-2">
          <li>{product.category}</li>
          <li>/</li>
          <li className="text-gray-500">{product.title}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row md:gap-8 gap-4">
        <div className="flex flex-col gap-8">
          {/* Left Column - Image */}
          <div className="h-fit max-w-6xl bg-gray-50 rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-lg"
              onError={(e) => {
                e.target.src = getCategoryImage(product.category);
              }}
            />
          </div>
          <div className="grid grid-cols-4 rounded-lg items-center justify-center justify-items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="bg-white w-20 h-18 sm:w-34 sm:h-30 md:w-20 md:h-18 lg:w-30 lg:h-26 shadow-lg rounded-lg object-cover"
              onError={(e) => {
                e.target.src = getCategoryImage(product.category);
              }}
            />
            <img
              src={product.image}
              alt={product.title}
              className="bg-white w-20 h-18 sm:w-34 sm:h-30 md:w-20 md:h-18 lg:w-30 lg:h-26 shadow-lg rounded-lg object-cover"
              onError={(e) => {
                e.target.src = getCategoryImage(product.category);
              }}
            />
            <img
              src={product.image}
              alt={product.title}
              className="bg-white w-20 h-18 sm:w-34 sm:h-30 md:w-20 md:h-18 lg:w-30 lg:h-26 shadow-lg rounded-lg object-cover"
              onError={(e) => {
                e.target.src = getCategoryImage(product.category);
              }}
            />
            <img
              src={product.image}
              alt={product.title}
              className="bg-white w-20 h-18 sm:w-34 sm:h-30 md:w-20 md:h-18 lg:w-30 lg:h-26 shadow-lg rounded-lg object-cover"
              onError={(e) => {
                e.target.src = getCategoryImage(product.category);
              }}
            />
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col h-full w-full gap-5">
          <h1 className="text-xl md:text-lg lg:text-2xl font-bold">{product.title}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {"★".repeat(itemStars)}
              {"☆".repeat(5-itemStars)}
            </div>
            <span className="ml-2 text-gray-600">({itemReviews})</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">${product.price}</h2>
            <p className="text-sm text-gray-600">
              Suggested payments with 6 months special financing
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Choose a Color</h3>
            <div className="flex gap-4">
              {colors.map((color, index) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full ${color.class} ${
                    selectedColor === index ? 'ring-2 ring-offset-2 ring-black' : ''
                  }`}
                  onClick={() => setSelectedColor(index)}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded">
              <button
                onClick={decreaseQuantity}
                className="px-4 py-2 border-r hover:bg-gray-500 transition"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-4 py-2 border-l hover:bg-gray-500 transition"
              >
                +
              </button>
            </div>
            <span className="text-sm text-orange-500">
              Only {itemAvailable} Items Left!
            </span>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="flex-1 md:text-sm lg:text-lg cursor-pointer border border-gray-600 text-white py-3 rounded hover:bg-gray-300 hover:text-gray-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <ToastContainer />
          </div>

          <div className="space-y-4 px-0 xl:px-10">
            <div className="border rounded px-4 py-2">
              <div className="grid items-center" style={{ gridTemplateColumns: '30% 70%' }}>
                <div className="sm:text-xl flex justify-center">
                  <span>🚚</span>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold">Free Delivery</h4>
                  <p className="text-sm text-gray-600 underline">
                    Enter your Postal code for Delivery Availability
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded px-4 py-2">
              <div className="grid items-center" style={{ gridTemplateColumns: '30% 70%' }}>
                <div className="sm:text-xl flex justify-center">
                  <span>↩️</span>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold">Return Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Free 30 days Delivery Returns. <button className="underline">Details</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;