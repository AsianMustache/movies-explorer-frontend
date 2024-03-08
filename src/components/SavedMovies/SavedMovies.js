import React, { useState, useEffect, useContext } from "react";
import "../SavedMovies/SavedMovies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// function SavedMovies({ onDeleteMovie, savedNewMovies }) {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isShort, setIsShort] = useState(false);
//     // const [savedMovies, setSavedMovies] = useState(() => JSON.parse(localStorage.getItem("savedMovies") || "[]"));
//     const { savedMovies } = useContext(CurrentUserContext);

//     // useEffect(() => {
//     //     setSavedMovies(JSON.parse(localStorage.getItem("savedMovies") || "[]"));
//     // }, []);

//     const filterMovies = (term, short) => {
//         return savedMovies.filter((movie) => {
//             const matchesTerm = movie.nameRU.toLowerCase().includes(term.toLowerCase());
//             const matchesLength = !short || movie.duration <= 40;
//             return matchesTerm && matchesLength;
//         });
//     };

//     const handleSearch = (search, short) => {
//         setSearchTerm(search);
//         setIsShort(short);
//     };

//     const filteredMovies = filterMovies(searchTerm, isShort);

//     const handleMovieDelete = (movieId) => {
//         // const updatedSavedMovies = savedMovies.filter(movie => movie.id !== movieToDelete.id);
//         // localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
//         // setSavedMovies(updatedSavedMovies);
//         onDeleteMovie(movieId);
//     };

//     return (
//         <main>
//             <SearchForm  onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={() => setIsShort(!isShort)} />
//             <MoviesCardList movies={filteredMovies} isLoading={false} onMovieDelete={handleMovieDelete} savedNewMovies={savedNewMovies} />
//         </main>
//     )

// }
function SavedMovies({ onDeleteMovie }) {
    const { savedMovies } = useContext(CurrentUserContext); // Получаем сохранённые фильмы из контекста
    const [searchTerm, setSearchTerm] = useState('');
    const [isShort, setIsShort] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]); // Состояние для хранения отфильтрованных фильмов
  
    // Функция для фильтрации фильмов по названию и длине
    const filterMovies = (term, short, movies) => {
      return movies.filter((movie) => {
        const matchesTerm = movie.nameRU.toLowerCase().includes(term.toLowerCase());
        const matchesLength = !short || movie.duration <= 40;
        return matchesTerm && matchesLength;
      });
    };
  
    // Обработка поиска фильмов
    const handleSearch = (search, short) => {
      setSearchTerm(search);
      setIsShort(short);
      const filtered = filterMovies(search, short, savedMovies);
      setFilteredMovies(filtered);
    };
  
    // Инициализация отфильтрованных фильмов при монтировании компонента
    useEffect(() => {
      const initialFiltered = filterMovies(searchTerm, isShort, savedMovies);
      setFilteredMovies(initialFiltered);
      // eslint-disable-next-line
    }, [savedMovies]);
  
    const handleMovieDelete = (movieId) => {
      onDeleteMovie(movieId);
    };
  
    return (
      <main>
        <SearchForm onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={() => setIsShort(!isShort)} />
        <MoviesCardList movies={filteredMovies} isLoading={false} onMovieDelete={handleMovieDelete} />
      </main>
    );
  }

export default SavedMovies;