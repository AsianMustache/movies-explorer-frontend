import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isMoviesPage, setIsMoviesPage] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();
  const shouldRenderHeader = ["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname);
  const isHomePage = location.pathname === '/';

useEffect(() => {
  setIsMoviesPage(location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/profile");
}, [location]);

const toggleNav = () => {
  setIsNavVisible(!isNavVisible);
};


  if (!shouldRenderHeader) {
    return null;
  }

return (
  <section className="header">
    <div className="header__logo">
      <Link to="/">
        <img src={logo} className="header__logo-image" alt="Logo" />
      </Link>
    </div>
    {shouldRenderHeader && (
      <>
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
            <Link to="/signup">
              <button className="header__registration-title">Регистрация</button>
            </Link>
            <Link to="signin" className="header__link" >
              <button className="header__registration-button">Войти</button>
            </Link>
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
  </section>
);
}

export default Header;
