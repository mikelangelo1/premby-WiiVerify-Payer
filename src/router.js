import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import NewPaylink from "./views/v1/payer/newPaylink";
// import LivePaylink from "./views/payer/livePaylink";
import DirectPay from "./views/v1/payer/directPay";
import HomePage from "./views/v1/Home";

// new flow
import EnterOtp from "./views/v1/payer/enterotp";
import MainPayment from "./views/v1/payer/mainPayment";

// old flow
import EnterCardOtp from "./views/v1/payer/enterCardOtp";
import PayerPayment from "./views/v1/payer/payment";
import AuthPayment from "./views/v1/payer/authPayment";
import ConfirmPayment from "./views/v1/payer/confirmPayment";

//v1.1 flow
import PayWithRevolut from "./views/v1.1/payer/payWithRevolut";
import SuccessPage from "./views/v1.1/payer/success";

//
import store from "./store";

import moment from "moment";

const routes = [
  // Settings
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/direct/:sccode",
    name: "DirectPay",
    component: DirectPay,
  },
  {
    path: "/v1.1/direct/:sccode",
    name: "PayWithRevolut",
    component: PayWithRevolut,
  },
  {
    path: "/automated/:sccode",
    name: "NewPaylink",
    component: NewPaylink,
    meta: { automated: true },
  },
  {
    path: "/enterotp",
    name: "EnterOtp",
    component: EnterOtp,
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: SuccessPage,
  },
  {
    path: "/payment/:sccode",
    name: "MainPayment",
    component: MainPayment,
    meta: {
      requiresAuth: true,
    },
  },
  /**
   * Old payment flow
   *
   */
  {
    path: "/cardotp",
    name: "CardOtp",
    component: EnterCardOtp,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/old-payment/:sccode",
    name: "PayerPayment",
    component: PayerPayment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth-payment/:sccode",
    name: "AuthPayment",
    component: AuthPayment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/confirm-payment",
    name: "Confirm",
    component: ConfirmPayment,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.state.user?.status?.loggedIn;
  const tokenExpiryDate = store.state.user?.userData?.tokenExpiryDate;

  // console.log('tokenExpiryDate ', tokenExpiryDate)
  let isAuth = to?.meta?.requiresAuth;

  let tokenExpired = false;
  if (tokenExpiryDate) {
    tokenExpired = moment(tokenExpiryDate).isBefore(moment());
  }

  if (tokenExpired && isAuth) {
    store.commit("user/logout");

    alert("Your current session has expired");
    return next({
      path: "/direct/sscode",
      query: { redirect: to.fullPath },
    });
  }

  if (!loggedIn && isAuth) {
    return next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  }

  next();
});

export default router;
