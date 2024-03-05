import searchButton from "../../images/search-button.svg"
import "../SearchForm/SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React, { useState, useEffect } from "react";

function SearchForm({ onSearch, searchTerm, isShort, toggleShortFilms }) {
    const [searchInput, setSearchInput] = useState(searchTerm);
    const [error, setError] = useState("");
  
    useEffect(() => {
      setSearchInput(searchTerm);
      setError("");
    }, [searchTerm]);
  
    const handleInputChange = (e) => {
      setSearchInput(e.target.value);
      if (error) setError("");
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!searchInput.trim()) {
        setError("Нужно ввести ключевое слово");
        return;
      }
      onSearch(searchInput, isShort);
    };
  
    return (
      <>
        <section className="search-form">
          <form onSubmit={handleSubmit} className="search-form__field" noValidate>
            <input
              placeholder={error || "Фильм"}
              type="text"
              className={`search-form__input ${error ? "error-placeholder" : ""}`}
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => error && setError("")}
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