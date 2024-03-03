import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../404/404';
import api from "../../utils/MainApi";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute';
import { getToken, removeToken } from "../../utils/token";
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenState, setTokenState] = useState(() => getToken());
  const [isCheckingToken, setIsCheckingToken] = useState(true);

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
          if (!localStorage.getItem('allMovies')) {
            moviesApi.getAllMovies()
              .then((movies) => {
                localStorage.setItem('allMovies', JSON.stringify(movies));
              })
              .catch((err) => console.error('Ошибка при загрузке фильмов:', err));
          }
        })
        .catch((err) => {
          console.error(err);
          removeToken();
          navigate("/signin");
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
      setLoggedIn(false);
      setCurrentUser({ name: "", email: "" });
      navigate("/signin");
    }
  }, [tokenState, navigate]);

  const handleRegister = (email, password, name, setMessage) => {
  return api
    .register(email, password, name)
    .then((data) => {
      if (data) {
        setMessage("Вы успешно зарегистрировались!");
        navigate("/signin", { replace: true });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
          throw new Error("Ошибка при регистрации");
      } else {
          throw new Error("Ошибка при регистрации" || "Произошла ошибка при регистрации.");
      }
    });
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await api.authorize(email, password);
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("loggedIn", true);
        setCurrentUser(data);
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
    navigate("/signin");
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

  if (isCheckingToken) {
    return <Preloader />
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="app">
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/movies" element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} setCurrentUser={setCurrentUser} onSignOut={handleSignOut} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;