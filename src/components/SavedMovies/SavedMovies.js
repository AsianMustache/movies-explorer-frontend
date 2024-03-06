import React, { useState, useEffect } from "react";
import "../SavedMovies/SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ onDeleteMovie, savedNewMovies }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isShort, setIsShort] = useState(false);
    const [savedMovies, setSavedMovies] = useState(() => JSON.parse(localStorage.getItem("savedMovies") || "[]"));

    useEffect(() => {
        setSavedMovies(JSON.parse(localStorage.getItem("savedMovies") || "[]"));
    }, []);

    const filterMovies = (term, short) => {
        return savedMovies.filter((movie) => {
            const matchesTerm = movie.nameRU.toLowerCase().includes(term.toLowerCase());
            const matchesLength = !short || movie.duration <= 40;
            return matchesTerm && matchesLength;
        });
    };

    const handleSearch = (search, short) => {
        setSearchTerm(search);
        setIsShort(short);
    };

    const filteredMovies = filterMovies(searchTerm, isShort);

    const handleMovieDelete = (movieId) => {
        // const updatedSavedMovies = savedMovies.filter(movie => movie.id !== movieToDelete.id);
        // localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
        // setSavedMovies(updatedSavedMovies);
        onDeleteMovie(movieId);
    };

    return (
        <main>
            <SearchForm  onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={() => setIsShort(!isShort)} />
            <MoviesCardList movies={filteredMovies} isLoading={false} onMovieDelete={handleMovieDelete} savedNewMovies={savedNewMovies} />
        </main>
    )

}

export default SavedMovies;