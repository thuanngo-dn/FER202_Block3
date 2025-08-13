import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, onView, onFav, favourites }) {
  return (
    <div className="row">
      {recipes.length > 0 ? (
        recipes.map((recipe, idx) => {
          const isFav = favourites.some((r) => r.title === recipe.title);
          return (
            <RecipeCard
              key={idx}
              recipe={recipe}
              onView={onView}
              onFav={onFav}
              isFavourite={isFav}
            />
          );
        })
      ) : (
        <p className="text-center">No results found.</p>
      )}
    </div>
  );
}
