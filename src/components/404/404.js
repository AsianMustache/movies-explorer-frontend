import "../404/404.css"

function NotFound() {
    return (
        <div className="page-not-found">
        <div className="error-container">
          <h1 className="page-not-found-title">404</h1>
          <p className="error-message">Страница не найдена</p>
        </div>
        <a href="/" className="back-button">Назад</a>
      </div>
    )
}

export default NotFound;