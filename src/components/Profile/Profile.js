import "../Profile/Profile.css"

function Profile() {
    return (
        <div className="profile-card">
            <p className="greeting-heading">Привет, Александр!</p>
            <div className="user-profile">
                <div className="personal-info-container">
                    <div className="info-card">
                        <p className="name-text">Имя</p>
                        <p className="name-paragraph">Александр</p>
                    </div>
                    <div className="horizontal-divider" />
                    <div className="info-card">
                        <p className="name-text">E-mail</p>
                        <p className="name-paragraph">pochta@yandex.ru</p>
                    </div>
                </div>
                <div className="account-actions">
                    <p className="edit-button">Редактировать</p>
                    <p className="logout-button">Выйти из аккаунта</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;