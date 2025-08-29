import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBooks(data.docs.slice(0, 12)); // show first 12
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4">
      <h1 className="text-5xl font-bold text-center mb-8 text-indigo-400">
        📚 BOOK FINDER
      </h1>
      <SearchBar onSearch={fetchBooks} />
      {loading && <p className="text-center mt-4 text-gray-400">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {!loading && books.length === 0 && (
        <p className="text-center mt-4 text-gray-600">No books found.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}
