import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../404/404";
import api from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import { getToken, removeToken } from "../../utils/token";
import Preloader from "../Preloader/Preloader";

// function App() {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState({});
//   const [loggedIn, setLoggedIn] = useState(() => {
//     const isLoggedIn = localStorage.getItem("loggedIn");
//     return isLoggedIn === "true";
//   });
//   const [tokenState, setTokenState] = useState(getToken());
//   const [isCheckingToken, setIsCheckingToken] = useState(true);
//   const [allMovies, setAllMovies] = useState([]);
//   const [savedMovies, setSavedMovies] = useLocalStorageState("savedMovies", []);
//   const [newTokenStorage, setNewTokenStorage] = useLocalStorageState("token", "")
//   const [searchResults, setSearchResults] = useLocalStorageState("searchResults", []);

//   const setToken = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setTokenState(newToken);
//   }

// useEffect(() => {
//     if (tokenState) {
//       setIsCheckingToken(true);
//       api.checkToken(tokenState)
//         .then((userData) => {
//           setCurrentUser(userData);
//           setLoggedIn(true);
//           localStorage.setItem("loggedIn", true);
//         })
//         .catch((err) => {
//           console.error(err);
//           handleSignOut();
//         })
//         .finally(() => {
//           setIsCheckingToken(false);
//         });
//     } else {
//       setIsCheckingToken(false);
//       setLoggedIn(false);
//       localStorage.setItem("loggedIn", false);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tokenState]);

//   const handleRegister = (email, password, name) => {
//     return api.register(email, password, name)
//       .then((data) => {
//         if (data.token) {
//           setToken(data.token);
//           localStorage.setItem("loggedIn", true);
//           return api.getUserInfo(data.token);
//         }
//         handleLogin(email, password);
//       })
//       .then((userData) => {
//         setCurrentUser(userData);
//         setLoggedIn(true);
//         navigate("/movies");
//       })
//       .catch((error) => {
//         console.error("Ошибка при регистрации:", error);
//       });
//   };

//   const handleLogin = async (email, password) => {
//     try {
//       const data = await api.authorize(email, password);
//       if (data.token) {
//         setToken(data.token);
//         localStorage.setItem("loggedIn", true);
//         setCurrentUser(data);
//         setLoggedIn(true);
//         navigate("/movies");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSignOut = () => {
//     removeToken();
//     localStorage.clear();
//     setLoggedIn(false);
//     setCurrentUser({});
//     setTokenState(null);
//     navigate("/");
//   };
  
//   function handleUpdateUser(userData) {
//     return api.editApiProfile(userData.name, userData.email)
//       .then((updatedUser) => {
//         setCurrentUser(updatedUser);
//         return updatedUser;
//       })
//       .catch((err) => {
//         console.error("Ошибка:", err);
//         throw err;
//       });
//   }

//   const loadSavedMovies = () => {
//     api
//       .getMovies(newTokenStorage)
//       .then(savedMovies => {
//         const savedMoviesList = savedMovies.map(movie => {
//           return { ...movie, isSaved: true };
//         });
//         setSavedMovies(savedMoviesList);
//       })
//       .catch(error => console.log(error));
//   };

//   useEffect(() => {
//     if (loggedIn) {
//       loadSavedMovies();
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loggedIn]);

//   const saveMovie = movie => {
//     setSavedMovies([...savedMovies, movie]);
//   }

//   const deleteMovie = movie => {
//     api
//       .dislikeMovie(movie._id, newTokenStorage)
//       .then(res => {
//         const newSearchResults = searchResults.map(searchedMovie => {
//           if (searchedMovie.id === movie.id || searchedMovie.id === movie.movieId) {
//             searchedMovie.isSaved = false;
//           }
//           return searchedMovie;
//       });
//       setSearchResults([...newSearchResults]);
//         // then remove movie from savedMovies
//         setSavedMovies(savedMovies =>
//           savedMovies.filter(savedMovie => savedMovie._id !== movie._id)
//         );
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <CurrentUserContext.Provider value={ currentUser }>
//       <div className="app">
//         {isCheckingToken ? <Preloader /> : (
//           <>
//           <Header loggedIn={loggedIn} onSignOut={handleSignOut} />
//           <Routes>
//             <Route path="/movies" element={<ProtectedRoute 
//               component={Movies} 
//               loggedIn={loggedIn} 
//               allMovies={allMovies}
//               setAllMovies={setAllMovies} 
//               searchResults={searchResults}
//               setSearchResults={setSearchResults}
//               savedMovies={savedMovies}
//               onSave={saveMovie}
//               onDelete={deleteMovie}
//               token={newTokenStorage}
//               />} />
//             <Route path="/saved-movies" element={<ProtectedRoute 
//               component={SavedMovies} 
//               loggedIn={loggedIn}
//               searchResults={searchResults}
//               setSearchResults={setSearchResults}
//               savedMovies={savedMovies}
//               onSave={saveMovie}
//               onDelete={deleteMovie}
//               />} />
//             <Route path="/profile" element={<ProtectedRoute component={Profile} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} setCurrentUser={setCurrentUser} onSignOut={handleSignOut} />} />
//             <Route path="/signup" element={!loggedIn ? <Register onRegister={handleRegister} /> : <Navigate replace to="/" />} />
//             <Route path="/signin" element={!loggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
//             <Route path="/" element={<Main loggedIn={loggedIn}/>} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//           <Footer />
//           </>
//         )}
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    return isLoggedIn === "true";
  });
  const [tokenState, setTokenState] = useState(getToken());
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [savedNewMovies, setSavedNewMovies] = useState([]);

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  }

useEffect(() => {
    if (tokenState) {
      setIsCheckingToken(true);
      api.checkToken(tokenState)
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
          localStorage.setItem("loggedIn", true);
        })
        .catch((err) => {
          console.error(err);
          handleSignOut();
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
      setLoggedIn(false);
      localStorage.setItem("loggedIn", false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenState]);

  useEffect(() => {
    if (loggedIn) {
      api.getMovies(tokenState)
        .then((movies) => {
          setSavedNewMovies(movies);
        })
        .catch((err) => console.error("Ошибка при получении сохраненных фильмов:", err));
    }
  }, [loggedIn, tokenState]);

  const handleRegister = (email, password, name) => {
    return api.register(email, password, name)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("loggedIn", true);
          return api.getUserInfo(data.token);
        }
        handleLogin(email, password);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        console.log(userData._id)
        localStorage.setItem("userId", userData._id);
        navigate("/movies");
      })
      .catch((error) => {
        console.error("Ошибка при регистрации:", error);
      });
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await api.authorize(email, password);
      if (data.token) {
        setToken(data.token);
        console.log(data._id)
        localStorage.setItem("loggedIn", true);
        const userData = await api.getUserInfo(data.token); // Получаем информацию о пользователе
        setCurrentUser(userData);
        localStorage.setItem("userId", userData._id);
        // setCurrentUser(data);
        setLoggedIn(true);
        navigate("/movies");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    removeToken();
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setTokenState(null);
    navigate("/");
  };
  
  function handleUpdateUser(userData) {
    return api.editApiProfile(userData.name, userData.email)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        return updatedUser;
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        throw err;
      });
  }

  const handleSaveMovie = (movie) => {
    const userId = localStorage.getItem("userId")
    console.log("Сохранение фильма с данными:", movie);
    console.log(userId)
    api.likeMovie(tokenState, {...movie, owner: userId})
      .then((savedMovie) => {
        console.log("Фильм успешно сохранен:", savedMovie);
        setSavedNewMovies([...savedNewMovies, savedMovie]);
      })
      .catch((err) => console.error("Ошибка при сохранении фильма:", err));
  };

  const handleDeleteMovie = (movieId) => {
    api.dislikeMovie(movieId, tokenState)
      .then(() => {
        setSavedNewMovies(savedNewMovies.filter((movie) => movie._id !== movieId));
      })
      .catch((err) => console.error("Ошибка при удалении фильма:", err));
  };

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="app">
        {isCheckingToken ? <Preloader /> : (
          <>
          <Header loggedIn={loggedIn} onSignOut={handleSignOut} />
          <Routes>
            <Route path="/movies" element={<ProtectedRoute 
              component={Movies}
              loggedIn={loggedIn}
              onSaveMovieToServer={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              savedMoviesList={savedNewMovies}
              />} />
            <Route path="/saved-movies" element={<ProtectedRoute 
              component={SavedMovies} 
              loggedIn={loggedIn}
              onDeleteMovie={handleDeleteMovie}
              savedMoviesList={savedNewMovies}
              />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} setCurrentUser={setCurrentUser} onSignOut={handleSignOut} />} />
            <Route path="/signup" element={!loggedIn ? <Register onRegister={handleRegister} /> : <Navigate replace to="/" />} />
            <Route path="/signin" element={!loggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
            <Route path="/" element={<Main loggedIn={loggedIn}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;