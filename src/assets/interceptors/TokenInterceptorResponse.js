import axios from "../../axios";
import { Promise } from "es6-promise";

const url = "http://localhost:52393/token";

export default {
  setupInterceptor: tokenContainer => {
    axios.interceptors.response.use(
      response => {
        if (response.config.url.indexOf("/token") > 0) {
          tokenContainer.storeToken(response.data.access_token);
          tokenContainer.storeRefreshToken(response.data.refresh_token);
        }
        return response;
      },
      error => {
        if (error.response.status !== 401) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        // Logout user if token refresh didn't work or user is disabled
        if (error.config.url.indexOf("/token") > 0) {
          tokenContainer.clear();
          window.location.href = "/login";
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }

        // Try request again with new token
        return axios
          .post(
            url,
            `grant_type=${"refresh_token"}&refresh_token=${tokenContainer.getRefreshToken()}`
          )
          .then(response => {
            tokenContainer.storeToken(response.data.access_token);
            tokenContainer.storeRefreshToken(response.data.refresh_token);

            const config = error.config;
            config.headers[
              "Authorization"
            ] = `Bearer ${tokenContainer.getToken()}`;

            return new Promise((resolve, reject) => {
              axios
                .request(config)
                .then(response => {
                  resolve(response);
                })
                .catch(error => {
                  reject(error);
                });
            });
          })
          .catch(error => {
            Promise.reject(error);
          });
      }
    );
  }
};
