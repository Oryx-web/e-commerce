const benefits = [
    { title: "Free Shipping", desc: "On all orders over $50", icon: "🚚" },
    { title: "Secure Payments", desc: "100% safe and secure", icon: "🔒" },
    { title: "24/7 Support", desc: "We are here to help", icon: "📞" },
  ];
  
  export default function Benefits() {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {benefits.map((item, i) => (
            <div key={i} className="p-6">
              <div className="text-4xl mb-4 select-none">{item.icon}</div>
              <h3 className="text-xl text-black font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }