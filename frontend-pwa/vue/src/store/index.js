import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {loggedIn: true  , firstName: user.userDTO.firstName, token: user.token, role: user.userDTO.role }
  : {loggedIn: false , firstName: null, token: null, role: null };
export default new Vuex.Store({
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      state.loggedIn = true;
      state.firstName = user.userDTO.firstName;
      state.token = user.token;
      state.role = user.userDTO.role;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.role = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      state.role = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
