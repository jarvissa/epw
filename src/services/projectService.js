import axios from "../plugins/axios";
import store from "../store";

const projectService = {
  getProjects: () => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .get("projects")
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleProject: (id) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .get(`projects/${id}`)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addProject: (formData) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .post(`projects`, formData)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editProject: (id, formData) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .put(`projects/${id}`, formData)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteProject: (id) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .delete(`projects/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default projectService;
