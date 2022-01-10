import React from "react";
import { Routes, Route } from "react-router-dom";

import { Products, Navbar, Cart } from "./components";
import CartProvider from "./store/CartProvider";

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
