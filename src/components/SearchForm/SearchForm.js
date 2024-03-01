import searchButton from "../../images/search-button.svg"
import "../SearchForm/SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React, { useState, useEffect } from "react";

function SearchForm({ onSearch, searchTerm, isShort, toggleShortFilms }) {
    const [searchInput, setSearchInput] = useState(searchTerm);
  
    useEffect(() => {
      setSearchInput(searchTerm);
    }, [searchTerm]);
  
    const handleInputChange = (e) => {
      setSearchInput(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(searchInput, isShort);
    };
  
    return (
      <>
        <section className="search-form">
          <form onSubmit={handleSubmit} className="search-form__field">
            <input
              placeholder="Фильм"
              type="text"
              className="search-form__input"
              value={searchInput}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="search-form__icon-container">
              <img src={searchButton} className="search-form__icon" alt="Search Icon"/>
            </button>
          </form>
          <FilterCheckbox isActive={isShort} toggleButton={toggleShortFilms} />
        </section>
      </>
    );
  }

export default SearchForm;