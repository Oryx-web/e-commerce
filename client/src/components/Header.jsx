import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold pl-5"><a href="/">ShopLogo</a></div>
        <form onSubmit={handleSearch} className="hidden md:block w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 border rounded w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        <div className="flex gap-4 text-lg pr-5">
          <button><a href="/cart">🛒 Cart</a></button>
        </div>
      </div>
    </header>
  );
}