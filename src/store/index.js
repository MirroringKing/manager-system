import Vue from "vue";
import Vuex from "vuex";
import {
  login,
  userInfo,
  logout
} from '../api/user'
import {
  setToken,
  getToken,
  getUserInfo,
  setUserInfo
} from '../utils/auth'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken() || "",
    userInfo: getUserInfo() || ""
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    }
  },
  actions: {
    async login({
      commit
    }, ruleForm) {
      try {
        const response = await login(ruleForm)
        commit('SET_TOKEN', response.token)
        return response.token
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleUserInfo({
      commit
    }) {
      try {
        const userinfo = await userInfo()
        commit("SET_USER_INFO", userinfo)
        return userinfo
      } catch (e) {
        console.log(e.message);
      }
    },
    async handleLogout({
      commit
    }) {
      const response = await logout()
      commit("SET_TOKEN", "")
      commit("SET_USER_INFO", "")
      return response
    }
  },
  modules: {},
});