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
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
    setSavedNewMovies(savedMovies);
  }, []);

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
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userId", data.id);
        setCurrentUser(data);
        setLoggedIn(true);
        navigate("/movies");
      }
    } catch (err) {
      console.log(err);
      handleSignOut();
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
    if (!savedNewMovies.some(m => m.movieId === movie.movieId)) {
     return api.likeMovie(tokenState, {...movie}, userId)
      .then((savedMovie) => {
        const savedMovieWithStatus = { ...savedMovie, isSaved: true };
        const updatedMovies = [...savedNewMovies, savedMovieWithStatus];
        setSavedNewMovies(updatedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
      })
      .catch((err) => console.error("Ошибка при сохранении фильма:", err));
    }
  };

  const handleDeleteMovie = (movieId) => {
    const token = localStorage.getItem("token");
    return api.dislikeMovie(movieId, token)
      .then(() => {
        const updatedSavedMovies = savedNewMovies.filter((movie) => movie._id !== movieId);
        setSavedNewMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((error) => console.error("Ошибка при удалении фильма:", error));
  };
  

  return (
    <CurrentUserContext.Provider value={{ currentUser, savedMovies: savedNewMovies }}>
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