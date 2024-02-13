import MovieCard from "../MoviesCard/MovieCard";
import "../MoviesCardList/MoviesCardList.css";

function MoviesCardList() {
    return (
        <>
      <div className="movies-list">
        <MovieCard />
      </div>
        <button className="movies-list__more-button">Ещё</button>
        </>
    );
  }
  
  export default MoviesCardList;
  