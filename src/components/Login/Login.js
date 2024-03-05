import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import logo from "../../images/logo.svg"

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            setEmailError("Некорректный адрес электронной почты");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }
   
    useEffect(() => {
        const isValid = email !== '' && validateEmail(email) && password.length >= 2;
        setIsFormValid(isValid);
    }, [email, password]);

    const resetForm = () => {
        setEmail("");
        setPassword("");
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        onLogin(email, password).then(resetForm);
    }

    return (
        <section className="login">
            <Link to="/">
                <img src={logo} className="login__logo" alt="Logo" />
            </Link>
            <p className="login__welcome-message">Рады видеть!</p>
            <form className="login__form-container" onSubmit={handleSubmit} >
                <div className="login__field-container">
                    <div className="login__field">
                        <label htmlFor="email" className="login__label-email">
                            E-mail
                        </label>
                        <input id="email" placeholder="pochta@yandex.ru" type="email" className="login__input" value={email} onChange={e => setEmail(e.target.value)} minLength="2" maxLength="40" required />
                        <span className="login__error">{emailError}</span>
                    </div>
                    <div className="login__field">
                        <label htmlFor="password" className="login__label-password">
                            Пароль
                        </label>
                        <input id="password" placeholder="Пароль" type="password" className="login__input" value={password} onChange={e => setPassword(e.target.value)} minLength="2" maxLength="200" required />
                    </div>
                </div>
                <div className="login__action-container">
                    <button className={`login__submit-button ${!isFormValid ? "login__submit-button_disabled" : ""}`} disabled={!isFormValid}>Войти</button>
                    <div className="login__registration-prompt">
                        <p className="login__registration-message">Ещё не зарегистрированы?</p>
                        <a href="/signup" className="login__registration-link">Регистрация</a>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Login;