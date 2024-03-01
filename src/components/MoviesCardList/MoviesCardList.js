import MovieCard from "../MoviesCard/MovieCard";
import "../MoviesCardList/MoviesCardList.css";
import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, isLoading, onMovieDelete }) {
  const [displayMovies, setDisplayMovies] = useState([]);
  const [moreLoad, setMoreLoad] = useState(true);
  const initialCount = window.innerWidth > 768 ? 12 : 5;
  const increment = window.innerWidth > 768 ? 3 : 2;

  useEffect(() => {
    
    setDisplayMovies(movies.slice(0, initialCount));
    setMoreLoad(movies.length > initialCount);
  }, [movies, initialCount]);

  const handleLoadMore = () => {
    const currentLength = displayMovies.length;
    const isMoreToLoad = currentLength + increment < movies.length;
    const nextMovies = movies.slice(0, currentLength + increment);
    setDisplayMovies(nextMovies);
    setMoreLoad(isMoreToLoad);
  }

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
                  <MovieCard key={movie.id} movie={movie} onMovieDelete={onMovieDelete} />
                ))}
              </section>
      )}
                {moreLoad && <button className="movies-list__more-button" onClick={handleLoadMore}>Ещё</button>}
        </>
    );
  }
  
  export default MoviesCardList;
  