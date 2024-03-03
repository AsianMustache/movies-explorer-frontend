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
        if(!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message || `Ошибка: ${response.status}`);
          });
        };
      return response.json();
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
      });
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
    url: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
});

export default api;