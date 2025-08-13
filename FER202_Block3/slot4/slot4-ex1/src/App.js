import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import recipesData from "./data/recipes";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = useMemo(() => {
    return recipesData.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrep = maxPrep ? recipe.prep <= maxPrep : true;
      const matchesCook = maxCook ? recipe.cook <= maxCook : true;
      return matchesSearch && matchesPrep && matchesCook;
    });
  }, [searchTerm, maxPrep, maxCook]);

  return (
    <>
      <NavbarComp />
      <Hero />
      <div className="container my-4">
        <Filters
          setSearchTerm={setSearchTerm}
          setMaxPrep={setMaxPrep}
          setMaxCook={setMaxCook}
        />
        <RecipeGrid recipes={filteredRecipes} onView={setSelectedRecipe} />
      </div>
      <Footer />

      {/* Modal hiển thị chi tiết */}
      <Modal
        show={!!selectedRecipe}
        onHide={() => setSelectedRecipe(null)}
        centered
      >
        {selectedRecipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRecipe.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="img-fluid mb-3"
                style={{ borderRadius: "8px" }}
              />
              <p>{selectedRecipe.description}</p>
              <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
              <p><strong>Prep Time:</strong> {selectedRecipe.prep} mins</p>
              <p><strong>Cook Time:</strong> {selectedRecipe.cook} mins</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success">Add to Cart</Button>
              <Button variant="secondary" onClick={() => setSelectedRecipe(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
