import axios from "../plugins/axios";

const dashboardService = {
  getUsersCount: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("dashboard/users-count")
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  getProjectsCount: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("dashboard/projects-count")
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  getBlogsCount: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("dashboard/blogs-count")
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
};

export default dashboardService;
