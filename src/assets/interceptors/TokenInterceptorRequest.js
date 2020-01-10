import axios from "../../axios";

export default {
  setupInterceptor: tokenContainer => {
    axios.interceptors.request.use(config => {
      const token = tokenContainer.getToken();
      if (token && config.url.indexOf("/token") === -1) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    });
  }
};
