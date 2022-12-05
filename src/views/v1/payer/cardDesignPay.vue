<template>
  <auth-layout :title="'Create your payment'">
    <div class="wrapper" id="app">
    <CardForm
      :form-data="formData"
      @input-card-number="updateCardNumber"
      @input-card-name="updateCardName"
      @input-card-month="updateCardMonth"
      @input-card-year="updateCardYear"
      @input-card-cvv="updateCardCvv"
    />
    <!-- backgroundImage="https://images.unsplash.com/photo-1572336183013-960c3e1a0b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" -->
  </div>
    <!--begin::Wrapper-->

    <div
      :class="$style.mainContainer"
      class="form-wrapper bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <div v-html="iframeHtml"></div>
      <!--begin::Form-->
      <form
        v-if="!iframeHtml"
        method="post"
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        @submit.prevent="submitForm"
        id="kt_login_signup_form"
      >
        <!--begin::Heading-->
        <div class="mb-10 text-center">
          <!--begin::Title-->
          <h1 class="text-dark mb-3">{{ currency }} {{ this.amount }} USD</h1>
          <!--end::Title-->
          <p>
            {{ $t("completed_before") }}:
            <strong>{{ getExpiryDate(this.createdAt) }}</strong>
          </p>
          <!--begin::Link-->
          <!-- <div class="text-gray-400 fw-bold fs-4">
            Powered by

            <router-link to="/" class="link-primary fw-bolder">
             
            </router-link>
          </div> -->
          <div v-if="loadingDetails">...Loading Payment details</div>
          <!--end::Link-->
        </div>
        <!--end::Heading-->

        <!--begin::Separator-->
        <!-- <div class="d-flex align-items-center mb-10 mt-3">
          <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        </div> -->
        <!--end::Separator-->

        <!--begin::Input group-->
        <!--<div class="row fv-row mb-7 mt-3"> -->
        <div class="form-group">
          <!--begin::Col-->

          <!--end::Col-->
          <div class="row">
            <div class="col-xl-12">
              <section>
                <label class="form-label"> {{ $t("email") }}</label>
                <input
                  :tabindex="1"
                  autofocus
                  type="email"
                  name="email"
                  autocomplete="off"
                  v-model="form.email"
                  :class="{ input_invalid: v$.form.email.$invalid }"
                />
                <div v-if="v$.form.email.$error">Name field has an error.</div>
              </section>
              <div>
                <section>
                  <label for="cc-number">Card number</label>
                  <input
                    :tabindex="2"
                    id="cc-number"
                    name="cc-number"
                     autocomplete="cc-number"
                    inputmode="numeric"
                    v-model="form.ccNumber"
                    @input="formatCardNum"
                    :class="{ input_invalid: v$.form.ccNumber.$invalid }"
                    required
                  />
                </section>

                <section id="cc-exp-csc">
                  <div>
                    <label for="cc-exp-month">Expiry month</label>
                    <input
                      :tabindex="3"
                      id="cc-exp-month"
                      name="cc-exp-month"
                      autocomplete="cc-exp"
                      placeholder="MM"
                      value="07"
                      maxlength="5"
                      v-model="form.ccMonth"
                      :class="{ input_invalid: v$.form.ccMonth.$invalid }"
                      required
                    />
                  </div>
                  <div>
                    <label for="cc-exp-year">Expiry year</label>
                    <input
                      id="cc-exp-year"
                      name="cc-exp-year"
                      autocomplete="cc-exp"
                      placeholder="YY"
                      value="25"
                      :tabindex="4"
                      maxlength="5"
                      v-model="form.ccYear"
                      :class="{ input_invalid: v$.form.ccYear.$invalid }"
                      required
                    />
                  </div>
                  <div>
                    <label for="cc-csc">Security code</label>
                    <input
                      id="cc-csc"
                      placeholder="CVV"
                      name="cc-csc"
                      autocomplete="cc-csc"
                      inputmode="numeric"
                      value="722"
                      maxlength="3"
                      :tabindex="5"
                      v-model="form.ccCode"
                      :class="{ input_invalid: v$.form.ccCode.$invalid }"
                      required
                    />
                  </div>
                </section>

                <label for="cc-name">Full Name</label>
                <input
                  :tabindex="6"
                  required
                  autocomplete="off"
                  id="cc-name"
                  v-model="form.name"
                  :class="{ input_invalid: v$.form.name.$invalid }"
                  type="text"
                />
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
        </div>
        <div v-if="this.invalidLink">
          <b-button variant="danger" @click="makeToast('danger')" class="mb-2"
            >Invalid Link</b-button
          >
        </div>
        <!--end::Input group--->
        <!--begin::Input group-->

        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="col-12">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              v-model="termsAgreed"
              @keyup.enter="trigger()"
              @click="trigger()"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              {{ $t("read_agreements_1") }}
              <a
                href="#"
                class="text-primary"
              >
                {{ $t("read_agreements_2") }}</a
              >
            </label>
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Actions-->
        <div class="text-center" style="margin-top: 20px">
          <button
            id="kt_sign_up_submit"
            type="submit"
            class="btn btn-lg btn-primary"
            ref="sendClick"
            :disabled="v$.$invalid || loading"
          >
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
            <span class="indicator-label" v-else> Confirm Payment </span>
          </button>
          <div
            style="text-align: center"
            v-html="submitErrorHtml"
            :class="$style.errorMessage"
          ></div>
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
      <footer class="">
        <img style="max-width: 20%" :src="pciImage" />
        <img style="max-width: 40%" :src="verifiedCardsImage" />
        <div class="text-center">
          <p class="footer-class ml-5 mb-2 mt-4">
            Powered by <a href="https://swiftpay-home.vercel.app">SwiftPay</a> |
            <a
              class="footer-terms"
              href="#"
              >Terms</a
            >
            &times;
            <a
              class="footer-terms"
              href="#"
              >Privacy</a
            >
          </p>
        </div>
      </footer>
      <button
        :class="$style['translate-button']"
        @click="switchLocale()"
        class="btn btn-lg btn-primary"
      >
        {{ $i18n.locale == "en" ? "RO" : "EN" }}
      </button>
    </div>
  </auth-layout>

  <!--end::Wrapper-->
</template>

<style module>
.errorMessage {
  color: red;
}

.mainContainer {
  padding: 56px 48px;
}

.translate-button {
  display: flex;
  /* margin: auto; */
  margin-top: 36px;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import axios from "../../../plugins/axios";
import { VueTelInput } from "vue-tel-input";
import { load } from "recaptcha-v3";
import moment from "moment";
import useVuelidate from "@vuelidate/core";

import "vue-tel-input/dist/css/sprite.css"; // Flags styles
import "vue-tel-input/dist/css/component.css"; // Component styles
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import AuthLayout from "../../../components/layouts/AuthLayouts";

// import "../../assets/css/form.css";

import cardValidator from "card-validator";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

import { getGeneratedPageURL } from "../../../utils/generateIframeUrl";

import pciImage from "../../../assets/images/pci.png";
import verifiedCardsImage from "../../../assets/images/vbvmcsc.png";

import CardForm from '../../../components/CardForm'

const BASE_URL = "https://swift-pay.onrender.com/";

const getPaymentDetails = async (options) => {
  const paymentId = options?.paymentId;

  const data = {
    paymentLinkInstanceId: paymentId,
  };

  const url = `${BASE_URL}/api/v1/payer/getPaymentDetails`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => err);

  return res;
};

function getSeonBase64() {
  return new Promise((resolve, reject) => {
    seon.getBase64Session(function (data) {
      if (data) {
        // this.session = data;
        resolve(data);
      } else {
        reject();
        // console.log("Failed to retrieve session data.");
      }
    });
  });
}

const validateHTML = (htmlString) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlString, "application/xml");
  let errorNode = doc.querySelector("parsererror");

  if (errorNode) {
    return {
      valid: false,
      error: errorNode,
    };
  } else {
    return { valid: true };
  }
};

const ssCodeCheck = { interval: undefined };

export default {
  name: "newpaylink",
  components: {
    VueTelInput,
    AuthLayout,
    CardForm,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
            formData: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
      },
      pciImage: pciImage,
      verifiedCardsImage: verifiedCardsImage,
      Props: {
        disabledFormatting: false,
        autoHideDialCode: false,
        enabledCountryCode: true,
        separateDialCode: true,
        mode: "international",
        disabledFetchingCountry: false,
      },
      form: {
        name: "",
        email: "",
        ccNumber: "",
        ccCode: "",
        ccMonth: "",
        ccYear: "",
      },
      // zip_code: "",
      termsAgreed: true,
      //
      amount: undefined,
      currency: undefined,
      //
      formComplete: false,
      submitError: undefined,
      submitErrorHtml: undefined,
      //
      loading: false,
      paymentIntent: undefined,
      // client_secret: undefined,
      invalidLink: false,
      toastCount: 0,
      //
      sccode: undefined,
      createdAt: undefined,
      loadingDetails: undefined,
      //
      session_id: undefined,
      session_count: 1,
      session: undefined,
      recaptchaToken: undefined,
      encryptionKey: undefined,
      //
      iframeHtml: undefined,
    };
  },
  validations() {
    return {
      form: {
        name: {
          required,
          isValid: (value) => cardValidator.cardholderName(value).isValid,
        },
        email: { required, email },
        ccNumber: {
          required,
          isValid: (value) => cardValidator.number(value).isValid,
        },
        ccCode: {
          required,
          isValid: (value) => cardValidator.cvv(value).isValid,
        },
        ccMonth: {
          required,
          isValid: (value) => cardValidator.expirationMonth(value).isValid,
          isValidExpiration: (value) => {
            return this.isValidExpiration(value);
          },
        },
        ccYear: {
          required,
          isValid: (value) => cardValidator.expirationYear(value).isValid,
          isValidExpiration: (value) => {
            return this.isValidExpiration(value);
          },
        },
      },
      termsAgreed: { required, isValid: (val) => val == true },
    };
  },
  async mounted() {
    setTimeout(() => {
      this.$refs.focusMe?.focus();
    }, 300);

    this.detectUserCountry();
    let params = this.$route.params;

    if (params.sccode == ":sccode" || null || undefined) {
      this.invalidLink = true;
    } else {
      let instanceId = params.sccode;
      this.sccode = instanceId;

      await this.getPaymentIntent(instanceId);
    }

    if (this.amount) {
      const session_id = await this.setupSeon();
      this.initializeSession(session_id);
    }
  },
  methods: {
        updateCardNumber (val) {
    },
    updateCardName (val) {
    },
    updateCardMonth (val) {
    },
    updateCardYear (val) {
    },
    updateCardCvv (val) {
    },
    trigger: function () {
      this.$refs.sendClick.click();
    },
    setupSeon() {
      const session_id = uuidv4();
      return new Promise((resolve, reject) => {
        seon.config({
          host: "seondf.com",
          session_id: session_id,
          audio_fingerprint: true,
          canvas_fingerprint: true,
          webgl_fingerprint: true,
          onSuccess: (message) => {
            this.session_id = session_id;
            resolve(session_id);
          },
          onError: function (message) {
            reject(message);
          },
        });
      });
    },
    async initializeSession(session_id) {
      const data = {
        session_id,
        session_count: this.session_count,
      };

      const url = BASE_URL + "/api/v1/payer/payment/initialize";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((err) => err);

      if (!res?.key) {
        this.$swal?.fire({
          title: "Payment could not be initialized",
          text: "Please try again later",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
          },
        });
        return;
      }

      const encryptionKey = res?.key;
      this.encryptionKey = encryptionKey;
    },
    async getPaymentIntent(sccode) {
      let payload = {
        sccode,
      };

      this.loadingDetails = true;
      return axios
        .post("v1/payer/payment/sscode-details", payload)
        .then((res) => {
          this.loadingDetails = false;
          let { data } = res;
          let { amount, currency, createdAt } = data;
          this.createdAt = createdAt;

          let AmountWithComma = amount.toFixed(2).toLocaleString("en-US");
          this.currency = currency?.toUpperCase();

          AmountWithComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          this.amount = AmountWithComma;
          return;
        })
        .catch((err) => {
          this.loadingDetails = false;

          this.$swal?.fire({
            text:
              err?.response?.data?.message ||
              err.message ||
              "Error getting payment details",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Okay",
            customClass: {
              confirmButton: "btn fw-bold btn-danger",
            },
          });
          return;
        });
    },
    async callCaptcha() {
      // captcha
      const recaptcha = await load("6Lf0Y90eAAAAABdwhXJzYka0oWOTmwWsarI-tpqC");
      const token = await recaptcha.execute("submit");
      return token;
    },
    async submitForm() {
      this.loading = true;

      if (!this.amount) {
        this.loading = false;
        this.$swal?.fire({
          text: "Payment details could not be retrieved completely",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
          },
        });
        return;
      }
      const recaptchaToken = await this.callCaptcha();
      const session = await getSeonBase64();

      const paymentId = this.sccode?.replace("sccode=", "");
      const ccExpiry = `${this.form.ccMonth}/${this.form.ccYear}`;

      const onlyCCnum = this.form.ccNumber?.replace(/[^\d]/g, "");

      // encrypt card data
      const cardData = {
        ccNumber: onlyCCnum,
        ccExpiry,
        ccCode: this.form.ccCode,
        ccName: this.form.name,
        email: this.form.email,
        user_name: this.form.name,
        transaction_currency: "USD",
        transaction_amount: this.amount,
      };

      const cardToken = CryptoJS.AES.encrypt(
        JSON.stringify(cardData),
        this.encryptionKey
      ).toString();

      const seonRequest = {
        session_id: this.session_id,
        session: session,
      };

      // data for payment
      const formData = {
        sccode: paymentId,
        recaptchaToken: recaptchaToken,
        seonRequest,
        payToken: cardToken,
        session_count: this.session_count,
      };

      const url = BASE_URL + "/api/v1/payer/automated/pay";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.text())
        .catch((err) => err);

      // check response string , to know if its meant to be converted to an object
      if (res?.includes('"success":false')) {
        const resObj = JSON.parse(res);
        this.$swal?.fire({
          title: resObj?.message,
          text: "Please try again later",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
          },
        });
        this.loading = false;
        return;
      }

      let htmlString = res;

      if (!validateHTML(htmlString)) {
        this.$swal?.fire({
          title: "Server could not get valid response",
          text: "Please try again later",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
          },
        });
        this.loading = false;
        return;
      }

      // start checking payment status every 1.5 seconds
      const maxTimeout = 1000 * 120; //2minutes timeout
      var paymentDetails;
      ssCodeCheck.interval = setInterval(async () => {
        const opts = {
          paymentId: paymentId,
        };
        const detailsRes = await getPaymentDetails(opts);
        paymentDetails = detailsRes?.paymentDetails;

        if (!paymentDetails.status) {
          console.log("paymentDetails bad format", paymentDetails);
        }

        if (paymentDetails?.status !== "pending") {
          this.loading = false;
          this.$router.push({
            name: "SuccessPage",
            query: {
              orderId: paymentId,
            },
          });
          if (paymentDetails?.status == "completed") {
          }

          if (paymentDetails?.status == "failed") {
          }
          clearInterval(ssCodeCheck.interval);
        }
      }, 1.5 * 1000);

      setTimeout(() => {
        clearInterval(ssCodeCheck.interval);
        // clear time out if payment details is not retrieved or still pending
        if (!paymentDetails || paymentDetails.status == "pending") {
          this.$swal?.fire({
            title: "Process timed out",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Okay",
            customClass: {
              confirmButton: "btn fw-bold btn-danger",
            },
          });
          //
          this.loading = false;
          this.$router.push({
            name: "SuccessPage",
            query: {
              orderId: paymentId,
            },
          });
        }
      }, maxTimeout);

      const iframeUrl = getGeneratedPageURL({
        html: htmlString,
        js: 'console.log("iframe loaded")',
      });

      const ifrme = `<div class="iframe-container"><iframe
      src=${iframeUrl}
      id="cycopay-3ds-iframe"
      title="Swift Iframe"
    ></iframe></div>`;

      this.iframeHtml = ifrme;
    },
    formatCardNum(event) {
      const value = event?.target?.value;
      let newValue;

      const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
      const onlyNumbers = value.replace(/[^\d]/g, "");

      newValue = onlyNumbers.replace(regex, (regex, $1, $2, $3, $4, $5) =>
        [$1, $2, $3, $4, $5].filter((group) => !!group).join(" ")
      );

      this.form.ccNumber = newValue;
    },
    isValidExpiration() {
      const expiry = `${this.form.ccMonth}/${this.form.ccYear}`;

      const momentNow = moment();
      const currentMonth1 = `${momentNow.format("MM")}/${momentNow.format(
        "YY"
      )}`;
      const currentMonth2 = `${parseInt(
        momentNow.format("MM")
      )}/${momentNow.format("YY")}`;
      const result = cardValidator.expirationDate(expiry);

      if (
        !result.isValid ||
        expiry == currentMonth1 ||
        expiry == currentMonth2
      ) {
        return false;
      }

      return true;
    },
    getExpiryDate(date) {
      if (!date) {
        return;
      }

      return moment(date).add(30, "minutes").format("hh:mm a[,] DD/MM/YYYY");
    },
    detectUserCountry() {
      axios.get("http://ip-api.com/json").then((res) => {
        if (!res?.data?.countryCode) {
          return;
        }

        let countryCode = res?.data?.countryCode?.toLowerCase();
        let codesForRO = ["ro", "md"];

        if (codesForRO.some((code) => code == countryCode)) {
          this.$i18n.locale = "ro";
          this.$store.commit("utils/updateLocale", "ro");
        } else {
          this.$i18n.locale = "en";
          this.$store.commit("utils/updateLocale", "en");
        }
      });
    },
    switchLocale() {
      let currentLocale = this.$i18n.locale;
      if (currentLocale == "en") {
        this.$i18n.locale = "ro";
        this.$store.commit("utils/updateLocale", "ro");
      } else {
        this.$i18n.locale = "en";
        this.$store.commit("utils/updateLocale", "en");
      }
    },
    async checkFormValidity() {
      return await this.v$.$validate();
    },
  },
};
</script>


<style lang="scss">
@import '../../../assets/css/newStyle.scss';
</style>
