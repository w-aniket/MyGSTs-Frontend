import React from "react";

const SearchFilter = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
