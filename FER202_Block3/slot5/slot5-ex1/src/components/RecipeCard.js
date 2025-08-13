import React from "react";

export default function RecipeCard({ recipe, onView }) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-img-top"
          style={{
            height: "400px",
            objectFit: "cover",
            width: "100%"
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.description}</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Prep:</strong> {recipe.prep} mins</p>
          <p><strong>Cook:</strong> {recipe.cook} mins</p>
          <button
            className="btn btn-success mt-auto"
            onClick={() => onView(recipe)}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
