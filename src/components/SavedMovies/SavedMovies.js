import "../SavedMovies/SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <main>
            <SearchForm />
            <MoviesCardList />
        </main>
    )

}

export default SavedMovies;