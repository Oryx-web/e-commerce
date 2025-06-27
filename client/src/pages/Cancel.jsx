import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-4xl font-bold text-red-700 mb-4">Pago cancelado</h1>
      <p className="text-lg text-red-800 mb-8">
        El pago fue cancelado. Puedes intentarlo de nuevo o regresar a la tienda.
      </p>
      <Link
        to="/cart"
        className="bg-red-700 text-white px-6 py-3 rounded hover:bg-red-800 transition"
      >
        Volver al carrito
      </Link>
    </div>
  );
}