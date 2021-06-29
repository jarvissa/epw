import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    user,
    token,
  },
  mutations: {
    changeLoadingState(state) {
      state.isLoading = !state.isLoading;
    },
    setUser(state, { user = null, token = null }) {
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
  },
  actions: {
    changeLoadingState({ commit }) {
      commit("changeLoadingState");
    },
    setUser({ commit }, payload) {
      commit("setUser", payload);
    },
    logout({ commit }) {
      commit("changeLoadingState");
      commit("setUser", {});

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  getters: {
    returnLoadingState(state) {
      return state.isLoading;
    },
    returnUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      try {
        const decoded = jwt_decode(state.token);
        return decoded;
      } catch (err) {
        return false;
      }
    },
  },
  modules: {},
});
