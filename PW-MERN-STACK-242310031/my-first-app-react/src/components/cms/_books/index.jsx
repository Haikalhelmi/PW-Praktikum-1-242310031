"use client";

import React, { useState } from "react";
import { ListBooks } from "@/const/booklist";
import { CardCalculates } from "../components/card_calculates";
import { Header } from "./components/header";
import { openModal } from "@/components/ui/modals";
import Form from "./components/form";
import Tabledata from "./components/tabledata";

export function MBooks() {
  const [books, setBooks] = useState(ListBooks);

  const handleCloseModal = () => {
    openModal({ open: false });
  };

  const handleSaveBook = (savedBook) => {
    setBooks((prevBooks) => {
      const existingIndex = prevBooks.findIndex((b) => b.id === savedBook.id);
      if (existingIndex >= 0) {
        const updated = [...prevBooks];
        updated[existingIndex] = savedBook;
        return updated;
      }
      return [savedBook, ...prevBooks];
    });
    handleCloseModal();
  };

  const handleDeleteBook = (bookId) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    }
  };

  const handleOpenAddModal = () => {
    openModal({
      header: "Add New Book",
      message: (
        <Form
          onSave={handleSaveBook}
          onClose={handleCloseModal}
        />
      ),
      size: "lg",
      closable: true,
    });
  };

  const handleOpenEditModal = (book) => {
    openModal({
      header: "Edit Book",
      message: (
        <Form
          book={book}
          onSave={handleSaveBook}
          onClose={handleCloseModal}
        />
      ),
      size: "lg",
      closable: true,
    });
  };

  const freeBooksCount = books.filter((b) => b.is_free).length;
  const subBooksCount = books.filter((b) => !b.is_free).length;
  const uniqueAuthorsCount = new Set(books.map((b) => b.author)).size;

  return (
    <div className="container-fluid py-3">
      <Header handleAdd={handleOpenAddModal} />

      <div className="row mb-4">
        <div className="col-md-3">
          <CardCalculates
            title="Total Books"
            value={books.length}
            icon="book"
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title="Free Book"
            value={freeBooksCount}
            icon="grid"
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title="Subscribe"
            value={subBooksCount}
            icon="calendar-event"
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title="Authors"
            value={uniqueAuthorsCount}
            icon="people"
          />
        </div>
      </div>

      <Tabledata
        data={books}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default MBooks;
