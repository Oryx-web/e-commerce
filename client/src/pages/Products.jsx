import React, { useEffect, useState, useRef } from 'react';
import { getAllProducts } from '../services/productService';

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
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
    return categoryImages[normalizedCategory] || '';
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Agrupa productos por categoría
    const productsByCategory = products.reduce((acc, product) => {
        const category = product.category || "Other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {});

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-red-100 text-center py-12">{error}</div>;

    return (
        <div className="flex justify-center items-center justify-items-center">
            {/* Sidebar */}
            <div className="md:flex md:flex-col hidden md:w-42 w-0 md:fixed top-16 left-0 h-full bg-gray-800 items-center py-8 z-1">
                <h1 className="text-white text-xl font-bold mb-6">Categories</h1>
                {Object.keys(productsByCategory).map(category => (
                    <a
                        key={category}
                        href={`#${category}`}
                        className="text-white py-2 px-4 w-full text-center hover:bg-gray-700 rounded transition mb-2 capitalize"
                    >
                        {category}
                    </a>
                ))}
            </div>
            {/* Main Content */}
            <div className="pt-20 max-w-6xl px-4 ml-0 md:ml-42 w-full justify-center items-center justify-items-center">
                <h2 className="text-4xl font-bold -mb-10">Products</h2>
                {Object.keys(productsByCategory).map(category => (
                    <div key={category} className="py-20" id={category}>
                        <div className="flex items-center pb-4 gap-4">
                            <img
                                src={getCategoryImage(category)}
                                alt={category}
                                className="w-10 h-10 object-cover rounded-full border"
                            />
                            <h3 className="text-2xl font-semibold capitalize">{category}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {productsByCategory[category].map(product => (
                                <a href={`/product/${product.id}`} key={product.id}>
                                    <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:scale-105 transition h-full flex flex-col">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full object-cover rounded-t-lg"
                                            onError={(e) => {
                                                e.target.src = getCategoryImage(product.category);
                                            }}
                                        />
                                        <h4 className="pt-4 font-semibold text-black">
                                            {product.title.length > 100
                                                ? product.title.slice(0, 100) + '...'
                                                : product.title}
                                        </h4>
                                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;