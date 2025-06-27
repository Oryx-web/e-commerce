export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white pt-12 px-6">
        <div className="grid grid-cols-2 items-center justify-center justify-items-center sm:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Shop</h4>
            <ul>
              <li><a href="#" className="hover:underline">All Products</a></li>
              <li><a href="#" className="hover:underline">Best Sellers</a></li>
              <li><a href="#" className="hover:underline">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="min-w-fit"><span>🐦</span></a>
              <a href="#" className="min-w-fit"><span>📘</span></a>
              <a href="#" className="min-w-fit"><span>📸</span></a>
            </div>
          </div>
        </div>
        <p className="text-center mt-20 text-gray-400">© {new Date().getFullYear()} Oryx Store. Made by Holman.</p>
      </footer>
    );
  }