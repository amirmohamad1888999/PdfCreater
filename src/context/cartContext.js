"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [GetAgain, setGetAgain] = useState(false);
  const [orders, setOrders] = useState([]);
  const [CartCount, setCartCount] = useState(0);
  const [NotifCount, setNotifCount] = useState([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        orders,
        setOrders,
        GetAgain,
        setGetAgain,
        setCartCount,
        CartCount,
        setNotifCount,
        NotifCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
