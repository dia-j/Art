import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by name or genre..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">
        <img src={assets.search_icon} alt="search" className="search-bar-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
