import "../Footer/Footer.css"
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const shouldRenderFooter = ["/", "/movies", "/saved-movies"].includes(location.pathname);

  if (!shouldRenderFooter) {
    return null;
  }
    return (
        <div className="footer">
          <div className="footer__description">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          </div>
          <div className="footer__details">
            <p className="footer__year">©2024</p>
            <div className="footer__links">
              <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
              <a href="https://github.com/AsianMustache/" className="footer__link footer__link-github">Github</a>
            </div>
          </div>
        </div>
    );
  }
export default Footer