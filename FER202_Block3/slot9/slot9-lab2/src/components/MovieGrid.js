import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, favourites, onView, onFav }) {
  if (!movies.length)
    return <Alert variant="warning">No movies found.</Alert>;

  return (
    <Row xs={1} sm={2} lg={3} className="g-4">
      {movies.map((m) => (
        <Col key={m.id}>
          <MovieCard
            movie={m}
            isFaved={favourites.includes(m.id)}
            onToggleFav={() => onFav(m)}
            onView={() => onView(m)}
          />
        </Col>
      ))}
    </Row>
  );
}
