"use client";
import React, { useMemo, useState } from "react";
import { Cards } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import {
  HeaderDatatables,
  SearchInput,
  PaginationComponent,
} from "@/components/ui/datatables";

export default function Tabledata({ data = [], onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalitems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const table_headers = [
    { name: "No", field: "id", sortable: false, className: "text-center" },
    { name: "Title", field: "title", sortable: true },
    { name: "Author", field: "author", sortable: true },
    { name: "Language", field: "language", sortable: true },
    { name: "Rate/View", field: "rate", sortable: false },
    { name: "Subscribe", field: "is_free", sortable: true, className: "text-center" },
    { name: "Actions", field: "id", sortable: false },
  ];

  const ResultData = useMemo(() => {
    let computedData = Array.isArray(data) ? [...data] : [];
    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }

    setTotalItems(computedData.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort((a, b) => {
        const valA = a[sorting.field] ?? "";
        const valB = b[sorting.field] ?? "";
        if (typeof valA === 'boolean' && typeof valB === 'boolean') {
          return reversed * (valA === valB ? 0 : valA ? 1 : -1);
        }
        return reversed * String(valA).localeCompare(String(valB));
      });
    }

    if (computedData.length > 0) {
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else {
      return [];
    }
  }, [data, search, sorting, currentPage]);

  return (
    <Cards>
      <Cards.Header>
        <span className="card-label fw-bold fs-3 text-success">Book Lists</span>
        <div className="w-50">
          <SearchInput
            keyword={search}
            onAction={(e) => setSearch(e.target.value)}
          />
        </div>
      </Cards.Header>
      <Cards.Body className={`px-0 pb-0`}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <HeaderDatatables
              headers={table_headers}
              onSorting={(field, order) =>
                setSorting({
                  field,
                  order,
                })
              }
            />
            <tbody>
              {ResultData.length > 0 ? (
                ResultData.map((book, index) => (
                  <tr key={book.id}>
                    <td className="text-center fw-bold">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td>
                      <strong className="text-dark">{book.title}</strong>
                    </td>
                    <td>{book.author}</td>
                    <td className="text-center">{book.language || 'English'}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-3">
                        <div>
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          <span className="text-dark small">{book.rating ?? 5.0}</span>
                        </div>
                        <div>
                          <i className="bi bi-eye text-info me-1"></i>
                          <span className="text-dark small">{book.views ?? 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={`badge ${book.is_free ? 'bg-success' : 'bg-secondary'}`}>
                        {book.is_free ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        outline
                        className="btn-sm me-2"
                        onClick={() => onEdit && onEdit(book)}
                        title="Edit Book"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="danger"
                        outline
                        className="btn-sm me-2"
                        onClick={() => onDelete && onDelete(book.id)}
                        title="Delete Book"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <p className="text-muted mb-0">No books found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalitems > 0 && (
            <div className="d-flex align-items-center justify-content-center p-3">
              <PaginationComponent
                total={totalitems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </Cards.Body>
    </Cards>
  );
}
