import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export const SearchBar: React.FC<{ initialQuery?: string }> = ({ initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="header-search">
      <form className="search-form" onSubmit={handleSearch}>
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search for medical products, brands, or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search medical products"
        />
        <button type="submit" className="search-submit-btn" aria-label="Submit search">
          Search
        </button>
      </form>
    </div>
  );
};
