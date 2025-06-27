import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = getAllProducts; // Adjust the API endpoint as needed

            console.log(response.products);
            setProducts(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
    
        fetchProducts();
    }, []);
    
    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
    
    return (
        <div className="pt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
            ))}
        </div>
        </div>
    );
}

export default Products;