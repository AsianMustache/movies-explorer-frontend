
import favorite from "../../images/favorite.svg"
import "../MoviesCard/MovieCard.css"
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import deleteButton from "../../images/delete.svg";

function MovieCard({ movie, onMovieDelete }) {
    const location = useLocation();

    const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
    const isSavedMovie = savedMovies.some(savedMovie => savedMovie.id === movie.id);
    const handleDeleteClick = () => {
        onMovieDelete(movie);
    };
    
    useEffect(() => {
        setIsSaved(isSavedMovie);
    }, [isSavedMovie]);

    const [isSaved, setIsSaved] = useState(isSavedMovie);
    const isSavedMoviesPage = location.pathname === "/saved-movies";

    const duration = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;

    const handleSaveClick = () => {
        let updatedSavedMovies;
        if (isSaved) {
            updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.id !== movie.id);
        } else {
            updatedSavedMovies = [...savedMovies, movie];
        }
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
        setIsSaved(!isSaved);
    };

    return (
        <>
            <article className="movies-list__container">
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img className="movies-list__image-container" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
            </a>
                <div className="movies-list__title-container">
                    <p className="movies-list__title">{movie.nameRU}</p>
                    <p className="movies-list__duration-button">{duration}</p>
                </div>

                {isSavedMoviesPage ? (
                    <button className="movies-list__delete-button" onClick={handleDeleteClick} >
                        <img src={ deleteButton } alt="Удаление карточки" />
                    </button>
                ) : (
                    <button className={!isSaved ? "movies-list__save-button" : "movies-list__save-button__active"} onClick={handleSaveClick}>
                        {isSaved ? <img src={favorite} alt="Избранное" /> : "Сохранить"}
                    </button>
                )}
            </article>
        </>
    )
}

export default MovieCard;