/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from 'react';
import { TextAreaInput, TextInput, InputImage, InputCheckbox } from '@/components/ui/forms';
import { Button } from "@/components/ui/button";
import { Alert } from '@/components/ui/alert';

export default function Form({ book, onSave, onClose }) {
  const initialForm = {
    title: book?.title || '',
    author: book?.author || '',
    sinopsis: book?.sinopsis || '',
    story: book?.story || '',
    is_free: book?.is_free ?? false,
    language: book?.language || 'English',
    rating: book?.rating || 5.0,
    views: book?.views || 0,
    image: null
  };

  const [formData, setFormData] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(book?.img || null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        sinopsis: book.sinopsis || '',
        story: book.story || '',
        is_free: book.is_free ?? false,
        language: book.language || 'English',
        rating: book.rating || 5.0,
        views: book.views || 0,
        image: null
      });
      if (book.img) {
        setImagePreview(book.img);
      }
    }
  }, [book]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      setError("Please fill in both Book Title and Author Name.");
      return;
    }

    const savedBook = {
      id: book?.id || Date.now(),
      title: formData.title,
      author: formData.author,
      sinopsis: formData.sinopsis,
      story: formData.story,
      is_free: formData.is_free,
      language: formData.language,
      rating: formData.rating,
      views: formData.views,
      img: imagePreview || "harpot.jpg"
    };

    if (onSave) {
      onSave(savedBook);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <div className="mb-4">
        <h4 className="fw-bold text-success mb-1">
          {book ? "Edit Book" : "Add New Book"}
        </h4>
        <p className="text-secondary small mb-0">
          Fill in the details for the book below.
        </p>
      </div>

      {error && <Alert message={error} variant="danger" />}

      <div className="row">
        <div className="col-lg-6">
          <TextInput
            title="Book Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter book title"
          />

          <TextAreaInput
            title="Sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={2}
            required
            placeholder="Enter book synopsis"
          />

          <TextAreaInput
            title="Story"
            name="story"
            value={formData.story}
            onChange={handleInputChange}
            rows={3}
            required
            placeholder="Enter book story summary"
          />
        </div>

        <div className="col-lg-6">
          <div className="row align-items-center mb-3">
            <div className="col-8">
              <TextInput
                title="Author Name"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="Enter author name"
              />
            </div>
            <div className="col-4">
              <InputCheckbox
                title="Type Book"
                value="Is Free"
                name="is_free"
                is_switch={true}
                checked={formData.is_free}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <InputImage
            title="Cover Image"
            onChange={handleImageChange}
            imagePreview={imagePreview}
          />
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <Button
          type="button"
          variant="light"
          className="px-4"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="px-4"
          style={{ backgroundColor: '#437059', borderColor: '#437059' }}
        >
          {book ? "Update Book" : "Submit Book"}
        </Button>
      </div>
    </form>
  );
}