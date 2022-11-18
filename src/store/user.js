const user = JSON.parse(localStorage.getItem('user'));
const moment = require('moment')

const initialState = user
  ? { status: { loggedIn: true }, userData: user }
  : { status: { loggedIn: false }, userData: null };

export const userModule = {
  namespaced: true,
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      localStorage.setItem('user',JSON.stringify({
        ...user,
        tokenExpiryDate: moment().add('30','minutes')
      }))
      state.status.loggedIn = true;
      state.userData = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.userData = null;
    },
    logout(state) {
      localStorage.removeItem('user')
      state.status.loggedIn = false;
      state.userData = null;
    },
  }
};