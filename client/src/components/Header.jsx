import React, { useState, useEffect, useRef } from 'react';

export default function Header() {
    return (
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold"><a href="/">ShopLogo</a></div>
          <input type="text" placeholder="Search products..." className="hidden md:block px-3 py-2 border rounded w-1/2"/>
          <div className="flex gap-4 text-lg">
            <button><a href="/cart">🛒</a></button>
            <button><a href="/profile">👤</a></button>
          </div>
        </div>
      </header>
    );
  }