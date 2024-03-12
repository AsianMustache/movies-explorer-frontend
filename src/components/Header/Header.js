import "./Header.css";
import logo from "../../images/logo.svg";
import { NavLink , useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [isMoviesPage, setIsMoviesPage] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();
  const shouldRenderHeader = ["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname);
  const isHomePage = location.pathname === '/';

useEffect(() => {
  setIsMoviesPage(location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile" || (location.pathname === "/" && loggedIn));
}, [location, loggedIn]);

const toggleNav = () => {
  setIsNavVisible(!isNavVisible);
};


  if (!shouldRenderHeader) {
    return null;
  }

return (
  <header className="header">
    <div className="header__logo">
      <NavLink  to="/">
        <img src={logo} className="header__logo-image" alt="Logo" />
      </NavLink>
    </div>
    {shouldRenderHeader && (
      <>
        {isMoviesPage ? (
          <div className="header__movie-nav">
            <div className="header__movie-links">
              <NavLink  to="/movies" className="header__movie-link">Фильмы</NavLink>
              <NavLink  to="/saved-movies" className="header__movie-link_saved">Сохранённые фильмы</NavLink>
            </div>
            <NavLink  to="/profile" className="header__profile-button">Аккаунт</NavLink>
          </div>
        ) : (
            <div className="header__registration">
            <a href="/signup" className="header__registration-title">
              Регистрация
            </a>
            <a href="signin" className="header__registration-button" >
              Войти
            </a>
            </div>
        )}
          {!isHomePage && (
            <div className="header-mobile__burger" onClick={toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </div>
          )}
            <div className={`main-navigation-container ${isNavVisible ? "is-visible" : ""}`}>
              {isNavVisible && <Navigation onClose={toggleNav} />}
            </div>
        
          </>
        )}
  </header>
);
}

export default Header;
