export class TokenContainer {
  isAuthenticated = () => {
    return this.getToken() !== null;
  };

  getAuthentication = () => {
    return {
      headers: { Authorization: "Bearer " + this.getToken() }
    };
  };

  storeToken = token => {
    sessionStorage.setItem("access_token", token);
  };

  storeRefreshToken = refreshToken => {
    sessionStorage.setItem("refresh_token", refreshToken);
  };

  clear = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  };

  getRefreshToken = () => {
    return sessionStorage.getItem("refresh_token");
  };

  getToken = () => {
    return sessionStorage.getItem("access_token");
  };
}
