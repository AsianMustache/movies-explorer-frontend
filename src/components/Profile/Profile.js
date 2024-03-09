import "../Profile/Profile.css"
import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onSignOut, onUpdateUser, setCurrentUser }) {
    const {currentUser} = useContext(CurrentUserContext)
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isDataEdited, setIsDataEdited] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const isDataChanged = name !== currentUser.name || email !== currentUser.email;

    const handleEditClick = (e) => {
        e.preventDefault()
        setIsDataEdited(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isDataChanged) return;

        onUpdateUser({ name, email })
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                setIsDataEdited(false);
                setSuccessMessage("Профиль успешно обновлён!");
                setTimeout(() => setSuccessMessage(""), 5000);
            })
            .catch((err) => {
                console.error("Ошибка при обновлении профиля:", err);
                setSuccessMessage("Ошибка при обновлении профиля.");
            });
    };

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    const handleCancelEdit = () => {
        setIsDataEdited(false);
        setName(currentUser.name);
        setEmail(currentUser.email);
    }

    return (
        <section className="profile-card">
            <h1 className="greeting-heading">Привет, {currentUser.name}!</h1>
            {successMessage && <p className="profile-update-message">{successMessage}</p>}
            {isDataEdited ? (
            <form className="user-profile" onSubmit={handleSubmit} >
                <div className="personal-info-container">
                    <div className="info-card-name">
                        <p className="name-text">Имя</p>
                        <input className="name-paragraph" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            disabled={!isDataEdited}
                            />
                    </div>
                    <div className="info-card-mail">
                        <p className="name-text">E-mail</p>
                        <input className="name-paragraph"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            disabled={!isDataEdited}
                            />
                    </div>
                </div>
                <div className="account-actions">
                   {isDataChanged ? (<button className="save-button" type="submit" >Сохранить</button>) : (<button type="button" className="cancel-button" onClick={handleCancelEdit}>Закрыть</button>)}
                    <button className="logout-button" onClick={onSignOut}>Выйти из аккаунта</button>
                </div>
            </form>
            ) : (
                <form className="user-profile" onSubmit={handleSubmit} >
                <div className="personal-info-container">
                    <div className="info-card-name">
                        <p className="name-text">Имя</p>
                        <p className="name-paragraph" 
                            value={name}
                            disabled={!isDataEdited}
                             >{currentUser.name}</p>
                    </div>
                    <div className="info-card-mail">
                        <p className="name-text">E-mail</p>
                        <p className="name-paragraph"
                            value={email}
                            disabled={!isDataEdited}
                            >{currentUser.email}</p>
                    </div>
                </div>
                <div className="account-actions">
                    <button type="submit" className="edit-button" onClick={handleEditClick} >Редактировать</button>
                    <button className="logout-button" onClick={onSignOut}>Выйти из аккаунта</button>
                </div>
            </form>
            )}
        </section>
        )
}

export default Profile;