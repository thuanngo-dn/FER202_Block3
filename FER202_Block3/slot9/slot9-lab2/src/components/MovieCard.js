import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import PropTypes from "prop-types";
import { HeartFill, Heart, EyeFill } from "react-bootstrap-icons";

export default function MovieCard({ movie, isFaved, onToggleFav, onView }) {
  const shortDesc =
    movie.description.length > 100
      ? movie.description.slice(0, 100) + "…"
      : movie.description;

  const cardHover = {
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const cardHoverOn = {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(18, 224, 18, 0.89)",
  };

  const cardPoster = {
    height: "260px",
    objectFit: "cover",
    borderBottom: "1px solid #eee",
  };

  const badgeStyle = {
    fontSize: "0.75rem",
  };

  const titleStyle = {
    fontWeight: 800,
  };

  const textSmall = {
    fontSize: "0.8rem",
  };

  return (
    <Card
      className="h-100 shadow-sm"
      style={cardHover}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverOn)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardHover)}
    >
      <Card.Img
        variant="top"
        src={movie.poster}
        alt={`${movie.title} poster`}
        style={cardPoster}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="fs-6 mb-0" style={titleStyle}>
            {movie.title}
          </Card.Title>
          <Badge bg="success" pill style={badgeStyle}>
            {movie.genre}
          </Badge>
        </div>

        <Card.Text className="text-muted mb-2" style={textSmall}>
          {shortDesc}
        </Card.Text>

        <Stack direction="horizontal" gap={2} className="text-muted mb-3" style={textSmall}>
          <span>⏱ {movie.duration}m</span>
          <span>• {movie.year}</span>
          <span>• {movie.country}</span>
        </Stack>

        <div className="mt-auto d-grid gap-2">
          <Button
            variant={isFaved ? "outline-danger" : "primary"}
            onClick={onToggleFav}
          >
            {isFaved ? <HeartFill className="me-1" /> : <Heart className="me-1" />}
            {isFaved ? "Remove from Favourites" : "Add to Favourites"}
          </Button>
          <Button variant="dark" onClick={onView}>
            <EyeFill className="me-1" /> Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  isFaved: PropTypes.bool.isRequired,
  onToggleFav: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};
