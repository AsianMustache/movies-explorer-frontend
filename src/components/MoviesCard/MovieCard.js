
import favorite from "../../images/favorite.svg"
import "../MoviesCard/MovieCard.css"
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import deleteButton from "../../images/delete.svg";

function MovieCard({ movie, onMovieDelete, savedMoviesList, onSaveMovieToServer }) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(savedMoviesList && movie ? savedMoviesList.some(savedMovie => savedMovie.movieId === movie.id) : false);
    useEffect(() => {
        if (savedMoviesList && movie) {
            setIsSaved(savedMoviesList.some(savedMovie => savedMovie.movieId === movie.id));
        }
    }, [savedMoviesList, movie]);
    
    const isSavedMoviesPage = location.pathname === "/saved-movies";

    const duration = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;

    // const handleSaveClick = () => {
    //     if (!isSaved) {
    //         onSaveMovieToServer(movie).then(() => {
    //             setIsSaved(true)
    //         });
    //     } else {
    //         const savedMovieId = savedMoviesList.find(savedMovie => savedMovie.movieId === movie.id);
    //         console.log(savedMovieId)
    //         onMovieDelete(savedMovieId._id).then(() => {
    //             setIsSaved(false);
    //         });
    //     }
    // };
    const handleSaveClick = (e) => {
        e.preventDefault(); // Добавлено предотвращение действия по умолчанию
        if (!isSaved) {
            onSaveMovieToServer(movie).then(() => {
                setIsSaved(true);
            }).catch(err => console.error("Ошибка при сохранении фильма:", err));
        } else {
            // Найдем ID сохраненного фильма для его удаления
            const movieToDelete = savedMoviesList.find(savedMovie => savedMovie.movieId === movie.id);
            if (movieToDelete && movieToDelete._id) {
                onMovieDelete(movieToDelete._id).then(() => {
                    setIsSaved(false);
                }).catch(err => console.error("Ошибка при удалении фильма:", err));
            }
        }
    };

    let imageUrl;
    if (movie.image && movie.image.url) {
        if (movie.image.url.startsWith('http')) {
            imageUrl = movie.image.url;
        } else {
            imageUrl = `https://api.nomoreparties.co${movie.image.url}`;
        }
    } else {
        imageUrl = `${movie.image}`;
    }

    return (
        <>
            <article className="movies-list__container">
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img className="movies-list__image-container" src={imageUrl} alt={movie.nameRU} />
            </a>
                <div className="movies-list__title-container">
                    <p className="movies-list__title">{movie.nameRU}</p>
                    <p className="movies-list__duration-button">{duration}</p>
                </div>

                {isSavedMoviesPage ? (
                    <button className="movies-list__delete-button" onClick={handleSaveClick} >
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