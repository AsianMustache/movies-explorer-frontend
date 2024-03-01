class MainApi {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }
  
    _sendRequest(url, options) {
      return fetch(url, options).then((response) => {
        if (response.ok) {
          return response.json();
        }
  
        throw new Error("Error");
      });
    }
  
    getApiUserInfo() {
      return this._sendRequest(`${this._url}/profile`, {
        method: "GET",
        credentials: "include",
        headers: this._headers,
      });
    }
  
    // editApiProfile(name, email) {
    //   return this._sendRequest(`${this._url}/profile`, {
    //     method: "PATCH",
    //     credentials: "include",
    //     headers: this._headers,
    //     body: JSON.stringify({
    //       name: name,
    //       email: email,
    //     }),
    //   });
    // }
    editApiProfile(name, email) {
      return fetch(`${this._url}/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          ...this._headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }).then((response) => {
        if (response.ok) {
          return response.json(); // Возвращает обновленные данные пользователя
        }
        // Если сервер возвращает ошибку, преобразовываем ответ в JSON и далее генерируем ошибку
        return response.json().then((json) => {
          throw new Error(json.message || "Ошибка при обновлении профиля");
        });
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

    checkToken(token) {
      return fetch(`${this._url}/movies`, {
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

    changeLikeStatus(cardId, isLiked) {
      const method = isLiked ? "PUT" : "DELETE";
      const url = `${this._url}/movies/${cardId}/likes`;
  
      return fetch(url, {
        method: method,
        credentials: "include",
        headers: this._headers,
      }).then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      });
    }
}

const api = new MainApi({
    url: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
});

export default api;