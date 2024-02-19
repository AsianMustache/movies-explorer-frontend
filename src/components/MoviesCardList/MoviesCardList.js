import MovieCard from "../MoviesCard/MovieCard";
import "../MoviesCardList/MoviesCardList.css";

function MoviesCardList() {
    return (
        <>
          <section className="movies-list">
            <MovieCard />
          </section>
          <button className="movies-list__more-button">Ещё</button>
        </>
    );
  }
  
  export default MoviesCardList;
  