class MovieApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
      }
    
      _sendRequest(url, options) {
        return fetch(url, options).then((response) => {
          if (response.ok) {
            return response.json();
          }
    
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        });
      }
    
      getAllMovies() {
        return fetch(`${this._url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(this._checkResponse)
        .catch(this._handleNetworkError);
      }

      _checkResponse(response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    
      _handleNetworkError(error) {
        console.error(`Ошибка сети: ${error.message}`);
        return Promise.reject(error);
      }
}

const moviesApi = new MovieApi({
    url: "https://api.nomoreparties.co/beatfilm-movies"
  });
  
  export default moviesApi;