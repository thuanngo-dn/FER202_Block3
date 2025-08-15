import React, { useState } from "react";
import { Form, Button, Alert, Stack } from "react-bootstrap";

const GENRES = ["Action","Animation","Comedy","Drama","Fantasy","Horror","Romance","Sci-Fi","Thriller"];

const initial = { title: "", genre: "", year: "", duration: "", description: "" };

export default function FormRequest({ onSubmitSuccess }) {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.genre) e.genre = "Please select a genre.";
    const year = Number(form.year);
    if (!year || year <= 1900) e.year = "Year must be > 1900.";
    const duration = Number(form.duration);
    if (!duration || duration <= 0) e.duration = "Duration must be greater than 0.";
    if (!form.description || form.description.trim().length < 30)
      e.description = "Description must be at least 30 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(initial);
    onSubmitSuccess && onSubmitSuccess();
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 720 }}>
      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Request submitted. Thank you!
        </Alert>
      )}

      <Form noValidate onSubmit={onSubmit}>
        <Stack gap={3}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              isInvalid={!!errors.title}
              placeholder="e.g., The Great Adventure"
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={form.genre}
              onChange={(e) => set("genre", e.target.value)}
              isInvalid={!!errors.genre}
            >
              <option value="">-- Select --</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              value={form.year}
              onChange={(e) => set("year", e.target.value)}
              isInvalid={!!errors.year}
              placeholder="2024"
            />
            <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="duration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
              isInvalid={!!errors.duration}
              placeholder="120"
            />
            <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              isInvalid={!!errors.description}
              placeholder="Tell us about the movie (at least 30 chars)…"
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">Submit Request</Button>
            <Button type="button" variant="outline-secondary" onClick={() => { setForm(initial); setErrors({}); }}>
              Reset
            </Button>
          </div>
        </Stack>
      </Form>
    </div>
  );
}
