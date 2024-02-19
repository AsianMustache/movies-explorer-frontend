import { Link } from "react-router-dom";
import "../Login/Login.css";
import logo from "../../images/logo.svg"

function Login() {
    return (
        <div className="login">
            <Link to="/">
                <img src={logo} className="login__logo" alt="Logo" />
            </Link>
            <p className="login__welcome-message">Рады видеть!</p>
            <div className="login__form-container">
                <div className="login__field-container">
                    <div className="login__field">
                        <label htmlFor="email" className="login__label-email">
                            E-mail
                        </label>
                        <input id="email" placeholder="pochta@yandex.ru" type="email" className="login__input" />
                    </div>
                    <div className="login__field">
                        <label htmlFor="password" className="login__label-password">
                            Пароль
                        </label>
                        <input id="password" placeholder="Пароль" type="password" className="login__input" />
                    </div>
                </div>
                <div className="login__action-container">
                    <button className="login__submit-button">Войти</button>
                    <div className="login__registration-prompt">
                        <p className="login__registration-message">Ещё не зарегистрированы?</p>
                        <a href="/signup" className="login__registration-link">Регистрация</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;