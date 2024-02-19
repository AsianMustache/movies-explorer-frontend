import "../Register/Register.css";
import logo from "../../images/logo.svg";

function Register() {
    return (
        <div className="register">
            <div className="register__welcome">
                <a href="/" className="register__logo-link">
                    <img src={logo} className="register__logo" alt="logo" />
                </a>
                <p className="register__message">Добро пожаловать!</p>
            </div>
            <div className="register__form">
                <div className="register__form-container">
                    <div className="register__field">
                        <label htmlFor="name" className="register__label">
                            Имя
                        </label>
                        <input id="name" placeholder="Александр" type="text" className="register__input" />
                    </div>
                    <div className="register__field">
                        <label htmlFor="email" className="register__label">
                            E-mail
                        </label>
                        <input id="email" placeholder="pochta@yandex.ru" type="email" className="register__input" />
                    </div>
                    <div className="register__field">
                        <label htmlFor="password" className="register__label">
                            Пароль
                        </label>
                        <input id="password" placeholder="••••••••••••••" type="password" className="register__input" />
                    </div>
                    <span className="register__error">Что-то пошло не так...</span>
                </div>
                <div className="register__action">
                    <button className="register__submit">Зарегистрироваться</button>
                    <div className="register__options">
                        <p className="register__options-message">Уже зарегистрированы?</p>
                        <a href="/signin" className="register__link">Войти</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;