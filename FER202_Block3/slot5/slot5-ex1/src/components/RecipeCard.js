import React from "react";
import { Button } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";

export default function RecipeCard({ recipe, onView, onFav, isFavourite }) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-img-top"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5>{recipe.title}</h5>
          <p>{recipe.description}</p>
          <p><strong>Prep:</strong> {recipe.prep} mins | <strong>Cook:</strong> {recipe.cook} mins</p>
          <div className="mt-auto d-flex gap-2">
            <Button variant="success" onClick={() => onView(recipe)}>View</Button>
            <Button
              variant={isFavourite ? "danger" : "outline-danger"}
              onClick={() => onFav(recipe)}
            >
              <Heart fill={isFavourite ? "red" : "none"} /> Add to Favourite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
