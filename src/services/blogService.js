import axios from "../plugins/axios";
import store from "../store";

const blogService = {
  getBlogs: () => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .get("blogs")
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSingleBlog: (id) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .get(`blogs/${id}`)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addBlog: (formData) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .post("blogs", formData)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editBlog: (id, formData) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .put(`blogs/${id}`, formData)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteBlog: (id) => {
    store.dispatch("changeLoadingState");

    return new Promise((resolve, reject) => {
      axios
        .delete(`blogs/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default blogService;
