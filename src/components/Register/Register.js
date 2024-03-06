import "../Register/Register.css";
import logo from "../../images/logo.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        validateInput();
        if (emailError || passwordError || nameError || !email || !password || !name) {
            return;
        }
        onRegister(email, password, name).then(() => {
            navigate("/movies");
        })
        .catch((error) => {
            console.error("Ошибка при регистрации:", error);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    const validateInput = () => {
        setEmailError(''); 
        setPasswordError('');
        setNameError('');
        let isValid = true;

        if (!email) {
            setEmailError("E-mail не может быть пустым.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("E-mail должен быть действительным.");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Пароль не может быть пустым.");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Пароль должен быть не менее 6 символов.");
            isValid = false;
        } else if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*? ]/.test(password)) {
            setPasswordError("Пароль должен содержать минимум одну заглавную букву, одну цифру и один специальный символ.");
            isValid = false;
        }

        if (!name) {
            setNameError("Имя не может быть пустым.");
            isValid = false;
        }

        setIsFormValid(isValid);
    };

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
    
        if (emailRegex.test(inputValue)) {
            setEmailError("");
        } else {
            setEmailError("E-mail должен быть действительным.");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateInput();
    }

    const handleNameChange = (e) => {
        const inputValue = e.target.value.trim();
        setName(e.target.value);
    
        if (!inputValue) {
            setNameError("Имя не может быть пустым или состоять только из пробелов");
        } else {
            setNameError("");
        }
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
                            onChange={handleNameChange} 
                            type="text" 
                            className="register__input" 
                            required
                            />
                            {nameError && <span className="register__error">{nameError}</span>}
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
                            {emailError && <span className="register__error">{emailError}</span>}
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
                            {passwordError && <span className="register__error">{passwordError}</span>}
                    </div>
                </div>
                <div className="register__action">
                    <button className={`register__submit ${!isFormValid || isSubmitting ? "register__submit_disabled" : ""}`} disabled={!isFormValid || isSubmitting} >Зарегистрироваться</button>
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