import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../404/404';

function App() {
  return (
      <>
      <Header />
      <Routes>
        <Route path="/movies" element={(
          <Movies />
        )} />
        <Route path="/saved-movies" element={( <SavedMovies />)} />
        <Route path="/profile" element={( <Profile /> )} />
        <Route path="/signup" element={( <Register /> )} />
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
