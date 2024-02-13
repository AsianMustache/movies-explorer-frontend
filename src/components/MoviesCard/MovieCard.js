import words from "../../images/33words.jpg";
import yearsofdesign from "../../images/100yearsofdesign.jpg";
import banksy from "../../images/Banksy.jpg";
import baskiya from "../../images/Baskiya.jpg";
import running from "../../images/running.jpg";
import booksellers from "../../images/BookSellers.jpg";
import germany from "../../images/Germany.jpg";
import gimme from "../../images/GimmeDanger.jpg";
import genis from "../../images/Genis.jpg";
import jump from "../../images/Jump.jpg";
import pj from "../../images/PJHarvey.jpg";
import waves from "../../images/waves.jpg";
import favorite from "../../images/favorite.svg"
import "../MoviesCard/MovieCard.css"
import React, { useState } from "react";

function MovieCard() {
    const [isSaved, setIsSaved] = useState(true);
    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    }

    return (
        <>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ words } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">33 слова о дизайне</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ yearsofdesign } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Киноальманах «100 лет дизайна» </p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className={!isSaved ? "movies-list__save-button" : "movies-list__save-button__active"} onClick={handleSaveClick}>
                    {isSaved ? <img src={ favorite } alt="Избранное" /> : "Сохранить"}
                </button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ banksy } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">В погоне за Бенкси</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ baskiya } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Баския: Взрыв реальности</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ running } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Бег это свобода</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ booksellers } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Книготорговцы</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ germany } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Когда я думаю о Германии ночью</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ gimme } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Gimme Danger: История Игги и The Stooges</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ genis } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Дженис: Маленькая девочка грустит</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ jump } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Соберись перед прыжком</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ pj } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">Пи Джей Харви: A dog called money</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
            <div className="movies-list__container">
                <img className="movies-list__image-container" src={ waves } alt="33 Words" />
                <div className="movies-list__title-container">
                    <p className="movies-list__title">По волнам: Искусство звука в кино</p>
                    <p className="movies-list__duration-button">1ч 17м</p>
                </div>

                <button className="movies-list__save-button">Сохранить</button>
            </div>
        </>
    )
}

export default MovieCard;