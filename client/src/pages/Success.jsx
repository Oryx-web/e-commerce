import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-700 mb-4">¡Pago exitoso! 🎉</h1>
      <p className="text-lg text-green-800 mb-8">
        Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.
      </p>
      <Link
        to="/"
        className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}