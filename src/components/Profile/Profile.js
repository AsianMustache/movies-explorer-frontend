import "../Profile/Profile.css"
import React, { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";

// function Profile({ onSignOut }) {
//     const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//     const [name, setName] = useState(currentUser.name);
//     const [email, setEmail] = useState(currentUser.email);
//     const [isEdited, setIsEdited] = useState(false);
//     const [editMode, setEditMode] = useState(false);

//     const handleEdit = () => {
//         setEditMode(true);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // updateUserProfile(name, email);
//         setEditMode(false);
//       };

//     return (
//         <section className="profile-card">
//             <p className="greeting-heading">Привет, {name}!</p>
//             <form className="user-profile" onSubmit={handleSubmit} >
//                 <div className="personal-info-container">
//                     <div className="info-card-name">
//                         <p className="name-text">Имя</p>
//                         <input className="name-paragraph">{name}</input>
//                     </div>
                    
//                     <div className="info-card-mail">
//                         <p className="name-text">E-mail</p>
//                         <input className="name-paragraph">{email}</input>
//                     </div>
//                 </div>
//                 <div className="account-actions">
//                     <a href="#edit" className="edit-button">Редактировать</a>
//                     <a href="#logout" className="logout-button">Выйти из аккаунта</a>
//                 </div>
//             </form>
//         </section>
//     );
// }
// return (
//     <section className="profile-card">
//       <p className="greeting-heading">Привет, {currentUser.name}!</p>
//       <form onSubmit={handleSubmit}>
//         <div className="user-profile">
//           <div className="personal-info-container">
//             {editMode ? (
//               <>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </>
//             ) : (
//               <>
//                 <div className="info-card-name">
//                   <p className="name-text">Имя</p>
//                   <p className="name-paragraph">{currentUser.name}</p>
//                 </div>
//                 <div className="info-card-mail">
//                   <p className="name-text">E-mail</p>
//                   <p className="name-paragraph">{currentUser.email}</p>
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="account-actions">
//             {editMode ? (
//               <>
//                 <button type="submit">Сохранить</button>
//                 <button type="button" className="logout-button" onClick={onSignOut}>Выйти из аккаунта</button>
//               </>
//             ) : (
//               <>
//                 <button type="button" className="edit-button" onClick={handleEdit}>Редактировать</button>
//                 <button type="button" className="logout-button" onClick={onSignOut}>Выйти из аккаунта</button>
//               </>
//             )}
//           </div>
//         </div>
//       </form>
//     </section>
//   );
// }

// useEffect(() => {
//     setName(currentUser.name);
//     setEmail(currentUser.email);
//   }, [currentUser]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     api.editApiProfile(name, email)
//       .then((updatedUser) => {
//         setCurrentUser(updatedUser);
//         setIsEdited(false);
//         alert('Профиль успешно обновлён');
//       })
//       .catch((err) => {
//         console.error(`Ошибка при обновлении профиля: ${err}`);
//         alert('Произошла ошибка при обновлении профиля');
//       });
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     setIsEdited(true);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setIsEdited(true);
//   };

//   return (
//     <section className="profile-card">
//       <h1 className="greeting-heading">Привет, {currentUser.name}!</h1>
//       <form onSubmit={handleSubmit} className="personal-info-container">
//         {/* <input
//           type="text"
//           value={name}
//           onChange={handleNameChange}
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           required
//         /> */}
//         <>
//             <div className="info-card-name">
//                 <p className="name-text">Имя</p>
//                 <input type="text"
//                     value={name}
//                     onChange={handleNameChange}
//                     required 
//                     className="name-paragraph">
//                     {currentUser.name}
//                 </input>
//             </div>
//             <div className="info-card-mail">
//                 <p className="name-text">E-mail</p>
//                 <input className="name-paragraph" type="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     required>
//                     {currentUser.email}
//                 </input>
//             </div>
//         </>
//       </form>
//       <div className="account-actions">
//         <button type="submit" disabled={!isEdited} className="edit-button">Редактировать</button>
//       <button onClick={onSignOut} className="logout-button">Выйти из аккаунта</button>
//       </div>
//     </section>
//   );
// }

function Profile({ onSignOut }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isDataEdited, setIsDataEdited] = useState(false);

    const handleEditClick = () => {
        setIsDataEdited(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.editApiProfile(name, email)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                setIsDataEdited(false);
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
                            value={name} 
                            onChange={(e) => setName(e.target.value)} >{currentUser.name}</input>
                    </div>
                    <div className="info-card-mail">
                        <p className="name-text">E-mail</p>
                        <input className="name-paragraph"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} >{currentUser.email}</input>
                    </div>
                </div>
                <div className="account-actions">
                    <a href="#edit" className="save-button" onClick={handleEditClick} >Сохранить</a>
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
                    <button type="submit" className="edit-button">Редактировать</button>
                    <a href="#logout" className="logout-button" onClick={onSignOut}>Выйти из аккаунта</a>
                </div>
            </form>
            )}
        </section>
        )
}

export default Profile;