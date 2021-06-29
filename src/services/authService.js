import axios from "../plugins/axios";
import store from "../store";

const authService = {
  login: (username, password) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .post("auth/login", { username, password })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  register: (username, password) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .post("auth/register", { username, password })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  changePassword: (username, password, newPassword) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .put("auth/change-password", { username, password, newPassword })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
};

export default authService;
