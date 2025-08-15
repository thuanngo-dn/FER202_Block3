import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

export default function RequestForm() {
  const [form, setForm] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const errors = {
    title: form.title.trim() === '' ? 'Title is required' : null,
    genre: form.genre.trim() === '' ? 'Genre is required' : null,
    year: !form.year || Number(form.year) <= 1900 ? 'Year must be > 1900' : null,
    duration: !form.duration || Number(form.duration) <= 0 ? 'Duration must be > 0' : null,
    description: form.description.trim().length < 30 ? 'Description must be at least 30 characters' : null,
  };

  const isInvalid = (field) => validated && errors[field];

  const onSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;
    setSubmitted(true);
    setForm({ title:'', genre:'', year:'', duration:'', description:'' });
    setValidated(false);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 720, marginTop: 90 }}>
      <Card.Body>
        <Card.Title className="mb-3">Movie Request Form</Card.Title>

        {submitted && (
          <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
            Request submitted. Thank you!
          </Alert>
        )}

        <Form noValidate onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
              isInvalid={!!isInvalid('title')}
              placeholder="Movie title"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              isInvalid={!!isInvalid('genre')}
              required
            >
              <option value="">Select genre</option>
              <option>Action</option>
              <option>Animation</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Fantasy</option>
              <option>Horror</option>
              <option>Romance</option>
              <option>Sci-Fi</option>
              <option>Thriller</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.genre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              isInvalid={!!isInvalid('year')}
              placeholder="e.g. 2024"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.year}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              isInvalid={!!isInvalid('duration')}
              placeholder="e.g. 120"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              isInvalid={!!isInvalid('description')}
              placeholder="Please describe your movie request (min 30 characters)"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit">Submit Request</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
