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
  
    editApiProfile(name, email) {
      return this._sendRequest(`${this._url}/profile`, {
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
}

const api = new MainApi({
    url: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
});

export default api;