import React, { createContext, useEffect, useMemo, useReducer } from "react";

export const WishlistContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) return state;
      return { ...state, items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state));
  }, [state]);

  const idsSet = useMemo(() => new Set(state.items.map((i) => i.id)), [state.items]);

  const addToWishlist = (item) => dispatch({ type: "ADD", item });
  const removeFromWishlist = (id) => dispatch({ type: "REMOVE", id });
  const clearWishlist = () => dispatch({ type: "CLEAR" });
  const isWished = (id) => idsSet.has(id);
  const count = state.items.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: state.items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isWished,
        count,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
