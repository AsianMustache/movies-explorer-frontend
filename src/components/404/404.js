import "../404/404.css"
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

    return (
        <div className="page-not-found">
        <div className="error-container">
          <h1 className="page-not-found-title">404</h1>
          <p className="error-message">Страница не найдена</p>
        </div>
        <button onClick={goBack} className="back-button">Назад</button>
      </div>
    )
}

export default NotFound;