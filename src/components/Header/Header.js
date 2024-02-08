import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Header() {
  const [isMoviesPage, setIsMoviesPage] = useState(false);
  const location = useLocation();

useEffect(() => {
  setIsMoviesPage(location.pathname === "/movies");
}, [location]);

return (
  <div className="header">
    <div className="header__logo">
      <Link to="/">
        <img src={logo} className="header__logo-image" alt="Logo" />
      </Link>
    </div>
    {isMoviesPage ? (
      <div className="header__movie-nav">
        <div className="header__movie-links">
          <Link to="/movies" className="header__movie-link">Фильмы</Link>
          <Link to="/saved-movies" className="header__movie-link_saved">Сохранённые фильмы</Link>
        </div>
        <Link to="/profile" className="header__profile-link"><button className="header__profile-button">Аккаунт</button></Link>
      </div>
    ) : (
      <div className="header__registration">
        <button className="header__registration-title">Регистрация</button>
        <button className="header__registration-button">Войти</button>
      </div>
    )}
  </div>
);
}

export default Header;
