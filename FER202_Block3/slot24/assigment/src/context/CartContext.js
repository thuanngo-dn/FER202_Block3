import React, { createContext, useEffect, useReducer, useMemo } from "react";

export const CartContext = createContext();

const initialState = {
  items: [], // {id, name, price, image, qty}
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.item.id);
      const items = exists
        ? state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...action.item, qty: 1 }];
      return { ...state, items };
    }
    case "REMOVE_ONE": {
      const items = state.items
        .map((i) =>
          i.id === action.id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0);
      return { ...state, items };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);
//Tổng số lượng sản phẩm trong giỏ
  const totalQty = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty, 0),
    [state.items]
  );
  //Tổng giá trị giỏ hàng
  const totalValue = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty * Number(i.price), 0).toFixed(2),
    [state.items]
  );

  const addToCart = (item) => dispatch({ type: "ADD", item });
  const removeOne = (id) => dispatch({ type: "REMOVE_ONE", id });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{ cartItems: state.items, addToCart, removeOne, removeFromCart, clearCart, totalQty, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
