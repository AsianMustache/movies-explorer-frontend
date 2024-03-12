import MovieCard from "../MoviesCard/MovieCard";
import "../MoviesCardList/MoviesCardList.css";
import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, isLoading, onMovieDelete, onSaveMovieToServer, savedMoviesList }) {
  const [displayMovies, setDisplayMovies] = useState([]);
  const [moreLoad, setMoreLoad] = useState(true);
  const calculateCards = () => {
    const width = window.innerWidth;
    let initialCount, increment;

    if (width >= 1280) {
        initialCount = 12; // 3 ряда по 4 карточки
        increment = 3; // Добавляем 1 ряд по 4 карточки
    } else if (width >= 768) {
        initialCount = 8; // 2 ряда по 4 карточки
        increment = 2; // Добавляем 1 ряд по 4 карточки
    } else {
        initialCount = 5; // 5 карточек для узких экранов
        increment = 2; // Добавляем по 2 карточки
    }
    return { initialCount, increment };
};


  useEffect(() => {
    const { initialCount } = calculateCards();
    setDisplayMovies(movies.slice(0, initialCount));
    setMoreLoad(movies.length > initialCount);

    const handleResize = () => {
      const { initialCount } = calculateCards();
      setDisplayMovies(movies.slice(0, initialCount));
      setMoreLoad(movies.length > initialCount);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [movies]);

  const handleLoadMore = () => {
    const { increment } = calculateCards();
    const currentLength = displayMovies.length;
    const isMoreToLoad = currentLength + increment < movies.length;
    const nextMovies = movies.slice(0, currentLength + increment);
    setDisplayMovies(nextMovies);
    setMoreLoad(isMoreToLoad);
  };
  if (isLoading) {
    return <Preloader />
  }
    return (
        <>
          {isLoading ? (
              <Preloader />
            ) : (
                  <section className="movies-list">
                    {displayMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} onMovieDelete={onMovieDelete} onSaveMovieToServer ={onSaveMovieToServer} savedMoviesList={savedMoviesList}/>
                    ))}
                  </section>
                )}
                {moreLoad && <button className="movies-list__more-button" onClick={handleLoadMore}>Ещё</button>}
        </>
    );
  }
  
  export default MoviesCardList;
  