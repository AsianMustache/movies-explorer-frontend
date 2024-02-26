import './App.css';
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


function App() {
  const navigate = useNavigate();
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

  return (
      <>
      <Header />
      <Routes>
        <Route path="/movies" element={(
          <Movies />
        )} />
        <Route path="/saved-movies" element={( <SavedMovies />)} />
        <Route path="/profile" element={( <Profile /> )} />
        <Route path="/signup" element={( <Register onRegister={handleRegister}/> )} />
        <Route path="/signin" element={( <Login /> )} />
        <Route path="/" element={(
        <Main />
        )} />
        <Route path="*" element={( <NotFound /> )} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;
