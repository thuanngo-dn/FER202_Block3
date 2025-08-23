import React, { createContext, useEffect, useReducer } from "react";

export const FavouritesContext = createContext();

const initial = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      if (state.items.find((p) => p.id === action.item.id)) return state;
      return { ...state, items: [...state.items, action.item] };
    case "REMOVE":
      return { ...state, items: state.items.filter((p) => p.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const saved = localStorage.getItem("favourites");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state));
  }, [state]);

  const addToFavourites = (item) => dispatch({ type: "ADD", item });
  const removeFromFavourites = (id) => dispatch({ type: "REMOVE", id });
  const clearFavourites = () => dispatch({ type: "CLEAR" });
  const isFavourite = (id) => !!state.items.find((p) => p.id === id);

  return (
    <FavouritesContext.Provider
      value={{
        favourites: state.items,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
