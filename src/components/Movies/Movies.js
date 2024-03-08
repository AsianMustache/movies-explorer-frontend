import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import "../Movies/Movies.css";

function Movies({ onSaveMovieToServer, onDeleteMovie, savedMoviesList }) {
    const [allMovies, setAllMovies] = useState(() => {
        const savedMovies = localStorage.getItem('allMovies');
        return savedMovies ? JSON.parse(savedMovies) : [];
    });

    const [filteredMovies, setFilteredMovies] = useState(() => {
        const savedFilteredMovies = localStorage.getItem('filteredMovies');
        return savedFilteredMovies ? JSON.parse(savedFilteredMovies) : [];
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(() => {
        return localStorage.getItem('searchTerm') || "";
    });
    const [isShort, setIsShort] = useState(() => {
        return localStorage.getItem('isShort') === 'true';
    });
    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        localStorage.setItem('searchTerm', newSearchTerm);
      };

    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('isShort', isShort);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    }, [searchTerm, isShort, filteredMovies]);

    const filterMovies = (movies, searchTerm, isShort) => {
        return movies.filter(movie => {
            const matchesTerm = movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLength = !isShort || movie.duration <= 40;
            return matchesTerm && matchesLength;
        });
    };

    const handleSearch = (newSearchTerm, isShort) => {
        updateSearchTerm(newSearchTerm);
        setIsLoading(true);
        setError("");
        setTimeout(() => {
            if (allMovies.length === 0) {
                moviesApi.getAllMovies()
                    .then((movies) => {
                        const filtered = filterMovies(movies, searchTerm, isShort);
                        localStorage.setItem('allMovies', JSON.stringify(movies));
                        setAllMovies(movies);
                        setFilteredMovies(filtered);
                        if (filtered.length === 0) {
                            setError("Ничего не найдено");
                        }
                    })
                    .catch((err) => {
                        setError('Ошибка при запросе фильмов');
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                const filtered = filterMovies(allMovies, searchTerm, isShort);
                setFilteredMovies(filtered);
                if (filtered.length === 0) {
                    setError("Ничего не найдено");
                }
                setIsLoading(false);
            }
        }, 500);
    };

    const toggleShortFilms = () => {
        const newIsShort = !isShort;
        setIsShort(newIsShort);
        if (searchTerm) {
            handleSearch(searchTerm, newIsShort);
        }
    };

    // const handleMovieSave = (movie) => {
    //     const isSaved = savedNewMovies.some(savedMovie => savedMovie.movieId === movie.id);
    //     if (!isSaved) {
    //       onSaveMovie(movie);
    //     } else {
    //       const savedMovie = savedNewMovies.find(savedMovie => savedMovie.movieId === movie.id);
    //       onDeleteMovie(savedMovie._id);
    //     }
    //   };

    return (
        <main>
            <SearchForm onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={toggleShortFilms} />
            {isLoading ? <Preloader /> : (
                <>
                    {error ? <div className="search-error">{error}</div> : <MoviesCardList 
                        movies={filteredMovies}
                        savedMoviesList={savedMoviesList}
                        onSaveMovieToServer={onSaveMovieToServer}
                        onMovieDelete={onDeleteMovie}
                    />}
                </>
            )}
        </main>
    );
}

export default Movies;