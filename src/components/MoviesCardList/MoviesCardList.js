import MovieCard from "../MoviesCard/MovieCard";
import "../MoviesCardList/MoviesCardList.css";
import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, isLoading, onMovieDelete, onSaveMovieToServer  }) {
  const [displayMovies, setDisplayMovies] = useState([]);
  const [moreLoad, setMoreLoad] = useState(true);
  // const initialCount = window.innerWidth > 768 ? 12 : 5;
  // const increment = window.innerWidth > 768 ? 3 : 2;
  const calculateCards = () => {
    const width = window.innerWidth;
    let initialCount, increment;

    if (width > 768) {
      // Ширина экрана больше 768px
      initialCount = 16; // 4 ряда по 4 карточки
      increment = 4; // Добавляем по ряду карточек
    } else if (width > 480 && width <= 768) {
      // Ширина экрана от 481px до 768px
      initialCount = 8; // 2 ряда по 4 карточки
      increment = 2; // Добавляем по ряду карточек
    } else {
      // Ширина экрана до 480px
      initialCount = 5; // 5 карточек по 1 в ряд
      increment = 2; // Добавляем по 2 карточки
    }

    return { initialCount, increment };
  };

  // useEffect(() => {
    
  //   setDisplayMovies(movies.slice(0, initialCount));
  //   setMoreLoad(movies.length > initialCount);
  // }, [movies, initialCount]);

  // const handleLoadMore = () => {
  //   const currentLength = displayMovies.length;
  //   const isMoreToLoad = currentLength + increment < movies.length;
  //   const nextMovies = movies.slice(0, currentLength + increment);
  //   setDisplayMovies(nextMovies);
  //   setMoreLoad(isMoreToLoad);
  // }
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
                  <MovieCard key={movie.id} movie={movie} onMovieDelete={onMovieDelete} onSaveMovieToServer ={onSaveMovieToServer }/>
                ))}
              </section>
      )}
                {moreLoad && <button className="movies-list__more-button" onClick={handleLoadMore}>Ещё</button>}
        </>
    );
  }
  
  export default MoviesCardList;
  