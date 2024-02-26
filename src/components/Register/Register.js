import "../Register/Register.css";
import logo from "../../images/logo.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            return;
        }
        onRegister(email, password, name, setMessage).then(() => {
            navigate("/signin");
        })
        .catch((error) => {
            console.error("Ошибка при регистрации:", error);
            setMessage(error.message || "Произошла ошибка при регистрации.");
        });
    }

    const validateInput = () => {
        let emailError = "";
        let passwordError = "";
        let isValid = true;

        if (!email) {
            emailError = "E-mail не может быть пустым.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError = "E-mail должен быть действительным.";
            isValid = false;
        }
    
        if (password.length < 6) {
            passwordError = "Пароль должен быть не менее 6 символов. ";
            isValid = false;
        } 
    
        if (!/[A-Z]/.test(password)) {
            passwordError += "Пароль должен содержать минимум одну заглавную букву. ";
            isValid = false;
        }
    
        if (!/\d/.test(password)) {
            passwordError += "Пароль должен содержать минимум одну цифру. ";
            isValid = false;
        }
    
        if (!/[!@#$%^&*? ]/.test(password)) {
            passwordError += "Пароль должен содержать минимум один специальный символ. ";
            isValid = false;
        }
    
        if (!name) {
            isValid = false;
        }
    
        setMessage(emailError + passwordError);
        setIsFormValid(isValid);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateInput();
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateInput();
    }
    
    
    return (
        <section className="register">
            <div className="register__welcome">
                <a href="/" className="register__logo-link">
                    <img src={logo} className="register__logo" alt="logo" />
                </a>
                <p className="register__message">Добро пожаловать!</p>
            </div>
            <form className="register__form" onSubmit={handleSubmit}>
                <div className="register__form-container">
                    <div className="register__field">
                        <label htmlFor="name" className="register__label">
                            Имя
                        </label>
                        <input 
                            id="name" 
                            placeholder="Имя" 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            className="register__input" 
                            required />
                    </div>
                    <div className="register__field">
                        <label htmlFor="email" className="register__label">
                            E-mail
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            minLength="2"
                            maxLength="40" className="register__input" required />
                    </div>
                    <div className="register__field">
                        <label htmlFor="password" className="register__label">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={handlePasswordChange}
                            minLength="2"
                            maxLength="200" className="register__input" required />
                    </div>
                    <span className="register__error">{message}</span>
                </div>
                <div className="register__action">
                    <button className={`register__submit ${!isFormValid ? "register__submit_disabled" : ""}`} disabled={!isFormValid} >Зарегистрироваться</button>
                    <div className="register__options">
                        <p className="register__options-message">Уже зарегистрированы?</p>
                        <a href="/signin" className="register__link">Войти</a>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Register;