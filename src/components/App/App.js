import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
      <>
      <Header />
      <Routes>
        <Route path="/movies" element={(
          <Movies />
        )} />
        <Route path="/" element={(
        <Main />
        )} />
      </Routes>
      <Footer />
      </>
  );
}

export default App;
