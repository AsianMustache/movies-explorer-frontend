class MainApi {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }
    _sendRequest(url, options) {
      return fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
    
          const error = new Error("Error");
          error.status = response.status;
          throw error;
        })
        .catch(error => {
          console.error("Ошибка при выполнении запроса:", error.message);
          if (error.status === 401) {
            console.error("Ошибка 401: пользователь не авторизован");
            window.location.href = '/';
          }
          throw error;
        });
    }
    

    setUserInfo(name, email, token) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }).then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            const error = new Error(json.message || `Ошибка: ${response.status}`);
            error.status = response.status;
            throw error;
          });
        }
        return response.json();
      })
      .catch(error => {
        console.error("Ошибка при обновлении профиля:", error.message);
        if (error.status === 401) {
          window.location.href = '/';
        }
        throw error;
      });
    }
  
    getUserInfo(token) {
      console.log(`Отправка запроса с токеном: ${token}`);
      return fetch(`${this._url}/users/me`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      }).then((response) => {
          if (!response.ok) {
              throw new Error("Не удалось получить данные пользователя");
          }
          return response.json();
      })
  }

    editApiProfile(name, email) {
      return this._sendRequest(`${this._url}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error("Ошибка при обновлении профиля:", error);
        if (error.status === 401) {
          window.location.href = '/';
        }
        throw error;
      });
    }

    register(email, password, name) {
        return fetch(`${this._url}/signup`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            email: email,
            name: name,
          }),
        }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((json) => {
              throw new Error(json.message || "Ошибка при регистрации");
            });
          });
    };

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            email: email,
          }),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((json) => {
            throw new Error(json.message || "Ошибка при авторизации");
          });
        });
    };

    likeMovie(token, movie) {
      const movieData = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };
      return fetch(`${this._url}/movies`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(movieData)
      })
    .then(async response => {
      if (!response.ok) {
        const errorBody = await response.json();
        console.log('Ответ сервера на ошибку:', errorBody);
        const error = new Error(`Ошибка валидации: ${errorBody.message || 'Неизвестная ошибка'}`);
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .catch(error => {
      console.error("Ошибка при сохранении/загрузке фильма:", error.message);
      if (error.status === 401) {
        window.location.href = '/';
      }
      throw error;
    });
  }

    dislikeMovie(movieId, token) {
      return fetch(`${this._url}/movies/${movieId}`,{
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
    .then(async response => {
      if (!response.ok) {
        const errorBody = await response.json();
        console.log('Ответ сервера на ошибку:', errorBody);
        const error = new Error(`Ошибка валидации: ${errorBody.message || 'Неизвестная ошибка'}`);
        error.status = response.status;
        throw error;
      }
      return response.json();
    })
    .catch(error => {
      console.error("Ошибка при сохранении/загрузке фильма:", error.message);
      if (error.status === 401) {
        window.location.href = '/';
      }
      throw error;
    });
  }

    getMovies() {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/movies`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((json) => {
          throw new Error(json.message || `Ошибка: ${response.status}`);
          });
      })
    }

    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((json) => {
          throw new Error(json.message || "Ошибка при входе");
        });
      });
    };


}

const api = new MainApi({
    // url: "https://api.diplomafan.nomoredomainsmonster.ru",
    url: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
});

export default api;