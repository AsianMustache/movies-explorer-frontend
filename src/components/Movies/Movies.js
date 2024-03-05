import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import React, { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import "../Movies/Movies.css";

function Movies() {
//   const [allMovies, setAllMovies] = useState(() => {
//       const savedMovies = localStorage.getItem('allMovies');
//       return savedMovies ? JSON.parse(savedMovies) : null;
//   });
//   const [filteredMovies, setFilteredMovies] = useState(() => {
//     const savedFilteredMovies = localStorage.getItem('filteredMovies');
//     return savedFilteredMovies ? JSON.parse(savedFilteredMovies) : [];
// });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
const [allMovies, setAllMovies] = useState(() => {
    const savedMovies = localStorage.getItem('allMovies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || "";
});
  const [isShort, setIsShort] = useState(() => {
    return localStorage.getItem('isShort') === 'true';
});

useEffect(() => {
  localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  localStorage.setItem('searchTerm', searchTerm);
  localStorage.setItem('isShort', isShort);
}, [filteredMovies, searchTerm, isShort]);

  const filterMovies = (movies, searchTerm, isShort) => {
      return movies.filter(movie => {
          const matchesTerm = movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesLength = !isShort || movie.duration <= 40;
          return matchesTerm && matchesLength;
      });
  };

//   const handleSearch = (searchTerm, isShort) => {
//       setIsLoading(true);
//       setError("");

//       setSearchTerm(searchTerm);
//       setIsShort(isShort);

//       const performFiltering = (movies) => {
//           const filtered = filterMovies(movies, searchTerm, isShort);
//           if (filtered.length === 0) {
//               setError("Ничего не найдено");
//           } else {
//               setError("");
//           }
//           setFilteredMovies(filtered);
//       };

//       if (!allMovies) {
//           moviesApi.getAllMovies()
//               .then((fetchedMovies) => {
//                   localStorage.setItem('allMovies', JSON.stringify(fetchedMovies));
//                   setAllMovies(fetchedMovies);
//                   performFiltering(fetchedMovies);
//               })
//               .catch((error) => {
//                   setError('Ошибка при запросе фильмов');
//               })
//               .finally(() => setIsLoading(false));
//       } else {
//           performFiltering(allMovies);
//           setIsLoading(false);
//       }
//   };
// const handleSearch = (searchTerm, isShort) => {
//     setIsLoading(true);
//     setSearchTerm(searchTerm);
//     setIsShort(isShort);

//     if (!allMovies.length) {
//       moviesApi.getAllMovies()
//         .then((movies) => {
//           localStorage.setItem('allMovies', JSON.stringify(movies));
//           setAllMovies(movies);
//           const filtered = filterMovies(movies, searchTerm, isShort);
//           setFilteredMovies(filtered);
//           if (!filtered.length) {
//             setError("Ничего не найдено");
//           }
//         })
//         .catch((err) => {
//           console.error('Ошибка при загрузке фильмов:', err);
//           setError('Ошибка при запросе фильмов');
//         })
//         .finally(() => setIsLoading(false));
//     } else {
//       const filtered = filterMovies(allMovies, searchTerm, isShort);
//       setFilteredMovies(filtered);
//       if (!filtered.length) {
//         setError("Ничего не найдено");
//       }
//       setIsLoading(false);
//     }
//   };
const handleSearch = (searchTerm, isShort) => {
    setIsLoading(true);
    setError("");

    setTimeout(() => {
    if (allMovies.length === 0) {
      moviesApi.getAllMovies()
        .then((movies) => {
          const filtered = filterMovies(movies, searchTerm, isShort);
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setAllMovies(movies);
          setFilteredMovies(filtered);
          if (filtered.length === 0) {
            setError("Ничего не найдено");
          }
        })
        .catch((err) => {
          setError('Ошибка при запросе фильмов');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const filtered = filterMovies(allMovies, searchTerm, isShort);
      setFilteredMovies(filtered);
      if (filtered.length === 0) {
        setError("Ничего не найдено");
      }
      setIsLoading(false);
    }
  }, 500);
};

  const toggleShortFilms = () => {
      const newIsShort = !isShort;
      setIsShort(newIsShort);
      if (searchTerm) {
          handleSearch(searchTerm, newIsShort);
      }
  };

  return (
      <main>
          <SearchForm onSearch={handleSearch} searchTerm={searchTerm} isShort={isShort} toggleShortFilms={toggleShortFilms} />
          {isLoading ? <Preloader /> : (
              <>
                  {error ? <div className="search-error">{error}</div> : <MoviesCardList movies={filteredMovies} />}
              </>
          )}
      </main>
  );
}

export default Movies;