const utils = JSON.parse(localStorage.getItem('utils'));

const initialState = {
    ...utils
}

export const utilsModule = {
  namespaced: true,
  state: initialState,
  mutations: {
    updateLocale(state, locale) {
      state.locale = locale

      localStorage.setItem('utils',JSON.stringify({
          locale
      }));
    },
  }
};