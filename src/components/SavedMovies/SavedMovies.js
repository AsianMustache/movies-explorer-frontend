import "../SavedMovies/SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <section>
            <SearchForm />
            <MoviesCardList />
        </section>
    )

}

export default SavedMovies;