import React from 'react';

export default function Hero() {
    return (
      <section className="w-full bg-gray-100 py-20 px-6 text-center">
        <h1 className="text-5xl text-gray-900 font-bold mb-4">Discover the Best Products</h1>
        <p className="text-xl text-gray-600 mb-8">Shop the latest and greatest items from our store</p>
        <a href="/products" className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-800 transition">
          Start Shopping
        </a>
      </section>
    );
  }