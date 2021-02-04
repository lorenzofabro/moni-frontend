import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: '',
  },
  mutations: {
    getUser(state, payload) {
      state.token = payload;
      if (payload === '') {
        state.user = ''
      } else {
        state.user = decode(payload);
        router.push({ name: 'Home' })
      }
    }
  },
  actions: {
    saveUser({ commit }, payload) {
      localStorage.setItem('token', payload);
      commit('getUser', payload)
    },
    logout({ commit }) {
      commit('getUser', '');
      localStorage.removeItem('token');
      router.push({ name: 'Login' });
    },
    readToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('getUser', token);
      } else {
        commit('getUser', '');
      }
    }
  },
  getters: {
    isActive: state => !!state.token
  }
})
