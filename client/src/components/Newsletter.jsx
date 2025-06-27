export default function Newsletter() {
    return (
      <section className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Subscribe to our newsletter for latest offers</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4">
          <input type="email" placeholder="Your email" className="p-3 rounded text-white w-fit md:w-1/3 border-2 border-white"/>
          <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 hover:cursor-pointer transition">Subscribe</button>
        </form>
      </section>
    );
  }