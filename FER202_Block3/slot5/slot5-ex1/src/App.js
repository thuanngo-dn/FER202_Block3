import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import recipesData from "./data/recipes";
import { Modal, Button, Toast, Pagination, Form } from "react-bootstrap";
import FormRequest from "./components/FormRequest";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [favourites, setFavourites] = useState([]);
  const [showToastFav, setShowToastFav] = useState(false);

  const [cart, setCart] = useState([]);
  const [showToastCart, setShowToastCart] = useState(false);

  const [showForm, setShowForm] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Toggle Favourite
  const handleFav = (recipe) => {
    const exists = favourites.find((r) => r.title === recipe.title);
    if (exists) {
      setFavourites(favourites.filter((r) => r.title !== recipe.title));
    } else {
      setFavourites([...favourites, recipe]);
      setShowToastFav(true);
      setTimeout(() => setShowToastFav(false), 5000);
    }
  };

  // Add to Cart
  const handleAddToCart = (recipe) => {
    setCart([...cart, recipe]);
    setShowToastCart(true);
    setTimeout(() => setShowToastCart(false), 5000);
  };

  // Filter & Sort
  const sortedRecipes = useMemo(() => {
    let filtered = recipesData.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrep = maxPrep ? recipe.prep <= maxPrep : true;
      const matchesCook = maxCook ? recipe.cook <= maxCook : true;
      return matchesSearch && matchesPrep && matchesCook;
    });

    if (sortBy === "name-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "name-desc") filtered.sort((a, b) => b.title.localeCompare(a.title));
    if (sortBy === "prep-asc") filtered.sort((a, b) => a.prep - b.prep);
    if (sortBy === "prep-desc") filtered.sort((a, b) => b.prep - a.prep);
    if (sortBy === "cook-asc") filtered.sort((a, b) => a.cook - b.cook);
    if (sortBy === "cook-desc") filtered.sort((a, b) => b.cook - a.cook);

    return filtered;
  }, [searchTerm, maxPrep, maxCook, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = sortedRecipes.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      {/* Navbar */}
      <NavbarComp
        favouritesCount={favourites.length}
        onFormClick={() => setShowForm(true)}
      />

      {/* Hero dưới navbar */}
      <div style={{ marginTop: "20px" }}>
        <Hero />
      </div>

      <div className="container my-4">
        {/* Filters */}
        <Filters
          setSearchTerm={setSearchTerm}
          setMaxPrep={setMaxPrep}
          setMaxCook={setMaxCook}
          setSortBy={setSortBy}
        />

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Pagination>
            <Pagination.First onClick={() => goToPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => goToPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>

          <Form.Select
            style={{ width: "150px" }}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={6}>6 / page</option>
            <option value={9}>9 / page</option>
            <option value={12}>12 / page</option>
          </Form.Select>
        </div>

        {/* Recipe Grid */}
        <RecipeGrid
          recipes={currentRecipes}
          onView={setSelectedRecipe}
          onFav={handleFav}
          favourites={favourites}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal chi tiết */}
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
              <Button variant="success" onClick={() => handleAddToCart(selectedRecipe)}>
                Add to Cart 🛒
              </Button>
              <Button variant="secondary" onClick={() => setSelectedRecipe(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Toast Favourites */}
      <Toast
        show={showToastFav}
        onClose={() => setShowToastFav(false)}
        style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">MyRecipes</strong>
        </Toast.Header>
        <Toast.Body>Added to favourites ❤️</Toast.Body>
      </Toast>

      {/* Toast Cart */}
      <Toast
        show={showToastCart}
        onClose={() => setShowToastCart(false)}
        style={{ position: "fixed", bottom: "80px", right: "20px", zIndex: 9999 }}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">MyRecipes</strong>
        </Toast.Header>
        <Toast.Body>Added to cart 🛒</Toast.Body>
      </Toast>

      {/* Modal Form Request */}
      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Recipe Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRequest
            onSubmitSuccess={() => {
              setTimeout(() => setShowForm(false), 2000);
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
