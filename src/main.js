import { BootstrapVue } from "bootstrap-vue";
import Vue from "vue";
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";


import App from "./App.vue";
import "./assets/css/custome.css";
import "./assets/css/popup.css";
import "./assets/css/style.css";
import "./assets/css/inputTel.css";
import router from "./router.js";
import VueTelInput from "vue-tel-input";
import CountryFlag from "vue-country-flag";
import Vuelidate from "vuelidate";

import VueCompositionAPI from "@vue/composition-api";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import OtpInput from "@bachdgvn/vue-otp-input";

import store from "./store/index";
import i18n from "./i18n";

Vue.component("country-flag", CountryFlag);
Vue.component("v-otp-input", OtpInput);

Vue.use(VueTelInput);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(PerfectScrollbar);
Vue.use(VueCompositionAPI);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

  