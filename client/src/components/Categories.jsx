import React from "react";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/productService"; // Assuming you have a service to fetch categories
  
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

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await getAllCategories();
        setAllCategories(categories.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories(); // Call the function here
  }, []);
  
  const getCategoryImage = (category) => {
    // Convert category to lowercase and remove spaces
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
    // Return matching image path or a default image
    return categoryImages[normalizedCategory] || '/images/electronics.webp';
  };

  return (
    <section className="h-full w-full">
      <h2 className="text-4xl font-bold text-center pt-12">Categories</h2>
      <div className="px-12 md:px-24 xl:px-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-16 gap-8 items-center justify-center justify-items-center">
        {allCategories.map((cat, i) => (
          <div key={i} className="relative group cursor-pointer overflow-hidden rounded shadow-lg w-full h-64">
            <a href={`/category/${cat}`}>
              <img 
                src={getCategoryImage(cat)} 
                alt={cat.title} 
                className="w-full h-full object-fill group-hover:scale-105 rounded transition" 
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center py-3 text-lg font-semibold group-hover:scale-105 transition">
                <p>{cat}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}