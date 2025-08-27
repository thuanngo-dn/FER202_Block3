import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; //  thêm Navigate
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";   

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Details from "./pages/Details";
import WishlistPage from "./pages/WishlistPage";  
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <NavBar />
              <Routes>
                {/*  Redirect "/" sang "/products" */}
                <Route path="/" element={<Navigate to="/products" replace />} /> 
                <Route path="/products" element={<Products />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
