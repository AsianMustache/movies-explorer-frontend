import "../Profile/Profile.css"

function Profile() {
    return (
        <section className="profile-card">
            <p className="greeting-heading">Привет, Александр!</p>
            <div className="user-profile">
                <div className="personal-info-container">
                    <div className="info-card-name">
                        <p className="name-text">Имя</p>
                        <p className="name-paragraph">Александр</p>
                    </div>
                    
                    <div className="info-card-mail">
                        <p className="name-text">E-mail</p>
                        <p className="name-paragraph">pochta@yandex.ru</p>
                    </div>
                </div>
                <div className="account-actions">
                    <a href="#edit" className="edit-button">Редактировать</a>
                    <a href="#logout" className="logout-button">Выйти из аккаунта</a>
                </div>
            </div>
        </section>
    );
}

export default Profile;