import React, { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import MovieGrid from "./components/MovieGrid";
import Footer from "./components/Footer";
import { movies as moviesData } from "./data/movies"; // ✅ sửa import
import { Modal, Button, Toast, Pagination, Form, Badge, Stack } from "react-bootstrap";
import FormRequest from "./components/FormRequest";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favourites, setFavourites] = useState(() => {
    try {
      const raw = localStorage.getItem("favourites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showToastFav, setShowToastFav] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch {}
  }, [favourites]);

  const handleFav = (movie) => {
    setFavourites((prev) => {
      const exists = prev.includes(movie.id);
      const next = exists ? prev.filter((id) => id !== movie.id) : [...prev, movie.id];
      setShowToastFav({
        text: exists ? "Removed from favourites" : "Added to favourites!",
        variant: exists ? "danger" : "success",
      });
      return next;
    });
  };

  const filteredMovies = useMemo(() => {
    let list = moviesData;
    if (genre !== "All") {
      list = list.filter((m) => m.genre === genre);
    }
    if (searchTerm.trim()) {
      const kw = searchTerm.trim().toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(kw) ||
          m.description.toLowerCase().includes(kw)
      );
    }
    if (sortBy === "duration-asc") list = [...list].sort((a, b) => a.duration - b.duration);
    if (sortBy === "duration-desc") list = [...list].sort((a, b) => b.duration - a.duration);
    return list;
  }, [searchTerm, genre, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genre, sortBy, itemsPerPage]);

  return (
    <>
      <NavbarComp
        favouritesCount={favourites.length}
        onFormClick={() => setShowForm(true)}
      />

      <div style={{ marginTop: 20 }}>
        <Hero />
      </div>

      <div className="container my-4">
        <Filters
          genre={genre}
          setGenre={setGenre}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          resultCount={filteredMovies.length}
        />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Pagination className="mb-0">
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

          <Stack direction="horizontal" gap={2} className="small text-muted">
            <Badge bg="secondary">{filteredMovies.length}</Badge>
            results
          </Stack>

          <Form.Select
            style={{ width: 150 }}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={6}>6 / page</option>
            <option value={9}>9 / page</option>
            <option value={12}>12 / page</option>
          </Form.Select>
        </div>

        <MovieGrid
          movies={currentMovies}
          onView={setSelectedMovie}
          onFav={handleFav}
          favourites={favourites}
        />
      </div>

      <Footer />

      <Modal
        show={!!selectedMovie}
        onHide={() => setSelectedMovie(null)}
        centered
        size="lg"
      >
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column flex-md-row gap-3">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="rounded object-fit-cover"
                  style={{ width: 260, height: 340 }}
                />
                <div>
                  <p className="text-muted">{selectedMovie.description}</p>
                  <p className="mb-1"><Badge bg="success">{selectedMovie.genre}</Badge></p>
                  <p className="mb-1">Year: {selectedMovie.year}</p>
                  <p className="mb-1">Country: {selectedMovie.country}</p>
                  <p className="mb-1">Duration: {selectedMovie.duration} minutes</p>
                  <p className="mb-0">Showtimes: Fri–Sun, 19:30 & 21:40</p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant={favourites.includes(selectedMovie.id) ? "outline-danger" : "primary"}
                onClick={() => handleFav(selectedMovie)}
              >
                {favourites.includes(selectedMovie.id) ? "Remove from Favourites" : "Add to Favourites"}
              </Button>
              <Button variant="secondary" onClick={() => setSelectedMovie(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <Toast
        show={!!showToastFav}
        onClose={() => setShowToastFav(null)}
        bg={showToastFav?.variant || "success"}
        delay={1600}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, color: "white" }}
      >
        <Toast.Body>{showToastFav?.text}</Toast.Body>
      </Toast>

      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Movie Request Form</Modal.Title>
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
