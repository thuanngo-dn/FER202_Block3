import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, onView }) {
  return (
    <div className="row">
      {recipes.length > 0 ? (
        recipes.map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} onView={onView} />
        ))
      ) : (
        <p className="text-center">No results found.</p>
      )}
    </div>
  );
}
