import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../services/productService";

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

export default function FeaturedProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getFeaturedProducts = async () => {
        try {
          const featured = await fetchFeaturedProducts();
          setAllProducts(featured);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      getFeaturedProducts(); // Call the function here
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    const getCategoryImage = (category) => {
    // Convert category to lowercase and remove spaces
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
    // Return matching image path or a default image
    return categoryImages[normalizedCategory] || '';
  };

return (
      <section className="flex flex-col py-16 px-6 bg-gray-50 items-center justify-center justify-items-center">
        <h2 className="text-3xl text-black font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="px-25 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-6 lg:gap-12">
          {allProducts.map((prod, i) => (
            <div key={i} className="min-w-40 max-w-80 border rounded-lg overflow-hidden shadow hover:shadow-xl drop-shadow-2xl transition">
              <a href={`/product/${prod.id}`}>
                <div className="aspect-square w-full relative"> {/* Added container with fixed aspect ratio */}
                  <img 
                    src={allProducts[i].image} 
                    alt={prod.title || 'Product'} 
                    className="absolute inset-0 w-full h-full object-contain bg-white" /* Changed to object-cover and absolute positioning */
                    onError={(e) => {
                      e.target.src = getCategoryImage(prod.category);
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="truncate text-black font-semibold text-lg">{prod.title}</h3>
                  <p className="text-gray-600">${prod.price}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    );
}