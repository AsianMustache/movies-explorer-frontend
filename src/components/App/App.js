import './App.css';
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../404/404';
import api from "../../utils/MainApi";
// import { setToken } from "../../utils/token";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute';
import { setToken, getToken, removeToken } from "../../utils/token";
import Preloader from '../Preloader/Preloader';


// function App() {
//   const navigate = useNavigate();
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

//   const updateUserProfile = (name, email) => {
//     api.editApiProfile(name, email)
//       .then((data) => {
//         if (data) {
//           setCurrentUser({ ...currentUser, name: data.name, email: data.email });
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка при обновлении профиля:", error);
//       });
//   };

//   useEffect(() => {
//     if (loggedIn) {
//       api.getApiUserInfo()
//         .then((data) => {
//           setCurrentUser(data);
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [loggedIn]);

//   const handleRegister = (email, password, name, setMessage) => {
//     return api
//       .register(email, password, name)
//       .then((data) => {
//         if (data) {
//           setMessage("Вы успешно зарегистрировались!");
//           navigate("/signin", { replace: true });
//         }
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 409) {
//             throw new Error("Ошибка при регистрации");
//         } else {
//             throw new Error("Ошибка при регистрации" || "Произошла ошибка при регистрации.");
//         }
//     });
//   };

//   const handleLogin = async (email, password) => {
//     try {
//       const data = await api.authorize(email, password);
//       if (data.token) {
//         setToken(data.token);
//         setLoggedIn(true);
//         setUserEmail(email);
//         localStorage.setItem("loggedIn", true);
//         navigate("/movies");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const onSignOut = () => {
//     setToken("")
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     navigate("/signin");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       api
//         .checkToken(token)
//         .then((res) => {
//           if (res) {
//             setLoggedIn(true);
//             setUserEmail(res.email);
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   }, []);

//   // useEffect(() => {
//   //   if (loggedIn) navigate("/movies");
//   // }, [loggedIn, navigate]);

//   return (
//     <CurrentUserContext.Provider value={{ currentUser, updateUserProfile }}>
//         <>
//         <Header onSignOut={onSignOut}
//             loggedIn={loggedIn}
//             userEmail={userEmail}/>
//         <Routes>
//           <Route path="/movies" element={(
//             <ProtectedRoute component={Movies} loggedIn={loggedIn} />
//           )} />
//           <Route path="/saved-movies" element={( <ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />)} />
//           <Route path="/profile" element={( <ProtectedRoute component={Profile} onSignOut={onSignOut} loggedIn={loggedIn} /> )} />
//           <Route path="/signup" element={( <Register onRegister={handleRegister}/> )} />
//           <Route path="/signin" element={( <Login onLogin={handleLogin} /> )} />
//           <Route path="/" element={(
//           <Main />
//           )} />
//           <Route path="*" element={( <NotFound /> )} />
//         </Routes>
//         <Footer />
//         </>
//       </CurrentUserContext.Provider>
//   );
// }

// export default App;
function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);


  // useEffect(() => {
  //   const token = getToken();
  //   if (token) {
  //     api.checkToken(token)
  //       .then((userData) => {
  //         if (userData) {
  //           setCurrentUser(userData);
  //           setLoggedIn(true);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         setLoggedIn(false);
  //         navigate("/signin");
  //       });
  //   }
  // }, [navigate]);
  useEffect(() => {
    const token = getToken();
    if (token) {
        api.checkToken(token)
            .then((userData) => {
                setCurrentUser(userData);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.error(err);
                removeToken();
            })
            .finally(() => {
                setIsAuthChecking(false);
            });
    } else {
        setIsAuthChecking(false);
    }
  }, [navigate]);


  const handleRegister = (email, password, name, setMessage) => {
  return api
    .register(email, password, name)
    .then((data) => {
      if (data) {
        setMessage("Вы успешно зарегистрировались!");
        navigate("/signin", { replace: true });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
          throw new Error("Ошибка при регистрации");
      } else {
          throw new Error("Ошибка при регистрации" || "Произошла ошибка при регистрации.");
      }
    });
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await api.authorize(email, password);
      if (data.token) {
        setToken(data.token);
        setLoggedIn(true);
        setCurrentUser({ ...currentUser, email: email }); // Обновляем текущего пользователя
        localStorage.setItem("loggedIn", true); // Сохраняем состояние аутентификации в localStorage
        navigate("/movies");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    removeToken(); // Удаление токена
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    navigate("/signin");
  };

  if (isAuthChecking) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/movies" element={<ProtectedRoute component={Movies} loggedIn={loggedIn} />} />
          <Route path="/saved-movies" element={<ProtectedRoute component={SavedMovies} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;