import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import React, { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import "../Movies/Movies.css";

function Movies() {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isShort, setIsShort] = useState(false);
  
    useEffect(() => {
        setIsLoading(true);
        moviesApi.getAllMovies()
            .then((movies) => {
                setAllMovies(movies);
                const savedSearchTerm = localStorage.getItem("searchTerm");
                const savedIsShort = localStorage.getItem("isShort") === "true";
                setSearchTerm(savedSearchTerm || "");
                setIsShort(savedIsShort);

                if (!savedSearchTerm) {
                    setFilteredMovies(movies);
                } else {
                    const filtered = filterMovies(movies, savedSearchTerm, savedIsShort);
                    setFilteredMovies(filtered);
                }
            })
            .catch((error) => {
                setError('Ошибка при запросе фильмов');
            })
            .finally(() => setIsLoading(false));
    }, []);
  
    const filterMovies = (movies, searchTerm, isShort) => {
        return movies.filter(movie => {
            const matchesTerm = movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLength = !isShort || movie.duration <= 40;
            return matchesTerm && matchesLength;
        });
    };
  
    const handleSearch = (searchTerm, isShort) => {
        setIsLoading(true);
        setError("");
        setSearchTerm(searchTerm);
        setIsShort(isShort);
    
        if (searchTerm === "") {
            const filtered = allMovies.filter(movie => !isShort || movie.duration <= 40);
            setFilteredMovies(filtered);
        } else {
            let filtered = allMovies.filter(movie => {
                const matchesTerm = movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesLength = !isShort || movie.duration <= 40;
                return matchesTerm && matchesLength;
            });
    
            localStorage.setItem("searchTerm", searchTerm);
            localStorage.setItem("isShort", isShort.toString());
            localStorage.setItem("filteredMovies", JSON.stringify(filtered));
    
            if (filtered.length === 0) {
                setError("Ничего не найдено");
            }
            setFilteredMovies(filtered);
        }
    
        setIsLoading(false);
    };
  
    const toggleShortFilms = () => {
      const newIsShort = !isShort;
      setIsShort(newIsShort);
      handleSearch(searchTerm, newIsShort);
    };
  
    return (
      <main>
        <SearchForm onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={toggleShortFilms} />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {error ? (
              <div className="search-error">{error}</div>
            ) : (
              <MoviesCardList movies={filteredMovies} />
            )}
          </>
        )}
      </main>
    );
  }

export default Movies;