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
import { setToken } from "../../utils/token";


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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
        setUserEmail(email);
        localStorage.setItem("loggedIn", true);
        navigate("/movies");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) navigate("/movies");
  }, [loggedIn, navigate]);

  return (
      <>
      <Header onSignOut={onSignOut}
          loggedIn={loggedIn}
          userEmail={userEmail}/>
      <Routes>
        <Route path="/movies" element={(
          <Movies />
        )} />
        <Route path="/saved-movies" element={( <SavedMovies />)} />
        <Route path="/profile" element={( <Profile /> )} />
        <Route path="/signup" element={( <Register onRegister={handleRegister}/> )} />
        <Route path="/signin" element={( <Login onLogin={handleLogin} /> )} />
        <Route path="/" element={(
        <Main />
        )} />
        <Route path="*" element={( <NotFound /> )} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;
