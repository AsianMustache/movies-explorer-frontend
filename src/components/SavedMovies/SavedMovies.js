import React, { useState, useEffect, useContext } from "react";
import "../SavedMovies/SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ onDeleteMovie, onSaveMovieToServer }) {
    const { savedMovies } = useContext(CurrentUserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isShort, setIsShort] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const filterMovies = (term, short, movies) => {
      return movies.filter((movie) => {
        const matchesTerm = movie.nameRU.toLowerCase().includes(term.toLowerCase());
        const matchesLength = !short || movie.duration <= 40;
        return matchesTerm && matchesLength;
      });
    };
    const handleSearch = (search, short) => {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = savedMovies.filter((movie) => {
          const matchesTerm = movie.nameRU.toLowerCase().includes(search.toLowerCase());
          const matchesLength = !short || movie.duration <= 40;
          return matchesTerm && matchesLength;
        });

        if (filtered.length === 0) {
          setError("Ничего не найдено");
        } else {
          setError("");
        }
        setFilteredMovies(filtered);
        setIsLoading(false);
      }, 500);
    };

    useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = filterMovies(searchTerm, isShort, savedMovies);
    
        if (filtered.length === 0) {
          setError("Ничего не найдено");
        } else {
          setError("");
        }
    
        setFilteredMovies(filtered);
        setIsLoading(false);
      }, 500);
    }, [searchTerm, isShort, savedMovies]);
  
    return (
      <main>
        <SearchForm onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={() => setIsShort(!isShort)} />
        {isLoading ? (
          <Preloader />
        ) : filteredMovies.length > 0 ? (
          <MoviesCardList movies={filteredMovies} isLoading={false} onMovieDelete={onDeleteMovie} />) : (
            <p className="movies-not-found">Ничего не найдено</p>
        )}
      </main>
    );
  }

export default SavedMovies;