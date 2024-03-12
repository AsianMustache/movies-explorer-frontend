import React from "react";

const CurrentUserContext = React.createContext({
    currentUser: {}, // Данные пользователя
    savedMovies: []  // Список сохраненных фильмов
  });

export default CurrentUserContext;
