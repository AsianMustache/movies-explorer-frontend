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
import { setToken, getToken, removeToken } from "../../utils/token";
import Preloader from '../Preloader/Preloader';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
        api.checkToken(token)
            .then((userData) => {
                setCurrentUser(userData);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.error(err);
                removeToken();
            })
            .finally(() => {
                setIsAuthChecking(false);
            });
    } else {
        setIsAuthChecking(false);
    }
  }, [navigate]);


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
        setLoggedIn(true);
        setCurrentUser({ ...currentUser, email: email });
        localStorage.setItem("loggedIn", true); 
        navigate("/movies");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    removeToken();
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    navigate("/signin");
  };

  if (isAuthChecking) {
    return <Preloader />;
  }

  function handleUpdateUser({ name, email }) {
    api
      .editApiProfile(name, email)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        console.log("Ошибка:", err);
      });
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