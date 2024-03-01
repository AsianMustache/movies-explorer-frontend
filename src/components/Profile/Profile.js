import "../Profile/Profile.css"
import React, { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onSignOut, onUpdateUser, setCurrentUser   }) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isDataEdited, setIsDataEdited] = useState(false);

    const handleEditClick = () => {
        setIsDataEdited(!isDataEdited);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onUpdateUser(name, email)
    //         .then(() => {
    //             setIsDataEdited(false);
    //         })
    //         .catch((err) => console.error("Ошибка при обновлении профиля:", err));
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(name, email)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
            })
            .catch((err) => console.error("Ошибка при обновлении профиля:", err));
    };


    return (
        <section className="profile-card">
            <h1 className="greeting-heading">Привет, {currentUser.name}!</h1>
            {isDataEdited ? (
            <form className="user-profile" onSubmit={handleSubmit} >
                <div className="personal-info-container">
                    <div className="info-card-name">
                        <p className="name-text">Имя</p>
                        <input className="name-paragraph" 
                            value={currentUser.name} 
                            onChange={(e) => setName(e.target.value)} >{currentUser.name}</input>
                    </div>
                    <div className="info-card-mail">
                        <p className="name-text">E-mail</p>
                        <input className="name-paragraph"
                            value={currentUser.email} 
                            onChange={(e) => setEmail(e.target.value)} >{currentUser.email}</input>
                    </div>
                </div>
                <div className="account-actions">
                    <a href="#edit" className="save-button" type="submit" onClick={handleEditClick}>Сохранить</a>
                    <a href="#logout" className="logout-button" onClick={onSignOut}>Выйти из аккаунта</a>
                </div>
            </form>
            ) : (
                <form className="user-profile" onSubmit={handleSubmit} >
                <div className="personal-info-container">
                    <div className="info-card-name">
                        <p className="name-text">Имя</p>
                        <p className="name-paragraph" 
                            value={name} 
                             >{currentUser.name}</p>
                    </div>
                    <div className="info-card-mail">
                        <p className="name-text">E-mail</p>
                        <p className="name-paragraph"
                            value={email} 
                            >{currentUser.email}</p>
                    </div>
                </div>
                <div className="account-actions">
                    <button type="submit" className="edit-button" onClick={handleEditClick} >Редактировать</button>
                    <a href="#logout" className="logout-button" onClick={onSignOut}>Выйти из аккаунта</a>
                </div>
            </form>
            )}
        </section>
        )
}

export default Profile;