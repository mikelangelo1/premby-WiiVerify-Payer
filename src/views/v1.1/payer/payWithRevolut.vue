<template>
  <auth-layout :title="'Create your payment'">
    <div class="wrapper" id="app">
      <ValidationObserver ref="form">
        <form class="card-form">
          <div class="card-list">
            <router-link class="mini-logo" to="/"
              ><img
                src="../../../assets/images/SwiftLogo.png"
                alt=""
                class="logo"
            /></router-link>
          </div>
          <div class="card-form__inner">
            <div class="mb-12 text-center">
              <h1 class="text-dark mb-12">
                {{ currency }} {{ this.amount }} USD
              </h1>
              <p>
                {{ $t("completed_before") }}:
                <strong>{{ getExpiryDate(this.createdAt) }}</strong>
              </p>
              <div v-if="loadingDetails">...Loading Payment details</div>
              <!--end::Link-->
            </div>
          
            <div class="card-input">
              <label class="card-input__label">{{ $t("Card Number") }}</label>
              <ValidationProvider rules="cardNumber:16" v-slot="{ errors }">
                <input
                  :tabindex="1"
                  type="number"
                  name="card-input"
                  class="card-input__input"
                  placeholder="2344 2334 5567 2334"
                  v-model="formValue.cardNumber.value"
                  autocomplete="off"
                  required
                />
                <span class="errorMessage">{{ errors[0] }}</span>
              </ValidationProvider>
              
              <div class="card-form__row">
              <div class="card-form__col -cvv">
                <div class="card-input">
                  <label  class="card-input__label">{{
                    $t("Expiry month")
                  }}</label>
                  <ValidationProvider rules="expiryMonth:2" v-slot="{ errors }">
                    <input
                      :tabindex="3"
                      type="text"
                      name="expiry month"
                      class="card-input__input"
                      placeholder="09"
                      maxlength="2"
                      :class="{ 'has-error': formValue.expiryMonth.errorMessage }"
                      v-model="formValue.expiryMonth.value"
                      autocomplete="off"
                      required
                    />
                    <span class="errorMessage">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="card-form__col -postal-code">
                <div class="card-input">
                  <label  class="card-input__label">{{
                    $t("Expiry Year")
                  }}</label>
                  <ValidationProvider rules="expiryYear:2" v-slot="{ errors }">
                    <input
                      :tabindex="4"
                      type="text"
                      name="expiry year"
                      placeholder="26"
                      class="card-input__input"
                      maxlength="2"
                      v-model="formValue.expiryYear.value"
                      autocomplete="off"
                      :class="{
                        'has-error': formValue.expiryYear.errorMessage,
                      }"
                      required
                    />
                    <span class="errorMessage">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              
              <div class="card-form__col -postal-code">
                <div class="card-input">
                  <label  class="card-input__label">{{
                    $t("CVV")
                  }}</label>
                  <ValidationProvider rules="cardCvv:3" v-slot="{ errors }">
                    <input
                      :tabindex="4"
                      type="number"
                      name="cardCvv"
                      placeholder="234"
                      class="card-input__input"
                      maxlength="3"
                      v-model="formValue.cardCvv.value"
                      autocomplete="off"
                      :class="{
                        'has-error': formValue.cardCvv.errorMessage,
                      }"
                      required
                    />
                    <span class="errorMessage">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>

              <label class="card-input__label">{{ $t("full_name") }}</label>
              <ValidationProvider rules="name:2" v-slot="{ errors }">
                <input
                  :tabindex="1"
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  class="card-input__input"
                  v-model="formValue.fullName.value"
                  autocomplete="off"
                  required
                />
                <span class="errorMessage">{{ errors[0] }}</span>
              </ValidationProvider>
              <label class="card-input__label">{{ $t("email") }}</label>
              <ValidationProvider rules="email" v-slot="{ errors }">
                <input
                  :tabindex="2"
                  type="email"
                  name="email"
                  class="card-input__input"
                  v-model="formValue.email.value"
                  autocomplete="off"
                  :class="{ 'has-error': formValue.email.errorMessage }"
                  required
                />
                <span class="errorMessage">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                v-model="termsAgreed"
                @keyup.enter="trigger()"
                @click="trigger()"
                required
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                <div>
                  <span>{{ $t("read_agreements_1") }}</span>
                  <a
                    href="#"
                    class="text-primary"
                  >
                    <span>{{ $t("read_agreements_2") }}</span>
                  </a>
                </div>
              </label>
            </div>
            <button
              id="kt_sign_up_submit"
              class="card-form__button"
              type="submit"
              ref="sendClick"
              :disabled="!submitButton || loading"
            >
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
              <span class="indicator-label" v-else>
                {{ $t("confirm_payment") }}
              </span>
            </button>
            <div
              style="text-align: center"
              v-html="submitErrorHtml"
              :class="$style.errorMessage"
            ></div>
          </div>
        </form>
      </ValidationObserver>
      <div>
        <button
          :class="$style['translate-button']"
          @click="switchLocale()"
          class="btn btn-lg btn-primary"
        >
          {{ $i18n.locale == "en" ? "RO" : "EN" }}
        </button>
      </div>
      <footer class="">
        <img class="pci-center" :src="pciImage" />
        <div class="text-center">
          <p class="footer-class ml-5 mb-2 mt-4">
            Powered by <a href="https://swiftpay-home.vercel.app/">Swiftpay</a> |
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

      <!-- backgroundImage="https://images.unsplash.com/photo-1572336183013-960c3e1a0b54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" -->
    </div>
    <!--begin::Wrapper-->
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
  /* /* display: flex; */
  margin: auto;
  width: 50px;
  margin-left: 80%;
  margin-bottom: 20px;
  /* margin-top: -200px;
  align-items: center;
  justify-content: center;   */
}
</style>

<script>
import axios from "../../../plugins/axios";
import { VueTelInput } from "vue-tel-input";
import { load } from "recaptcha-v3";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import validator from "validator";
import RevolutCheckout from "@revolut/checkout";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import "vue-tel-input/dist/css/sprite.css"; // Flags styles
import "vue-tel-input/dist/css/component.css"; // Component styles
import AuthLayout from "../../../components/layouts/AuthLayouts.vue";

import { v4 as uuidv4 } from "uuid";

import pciImage from "../../../assets/images/pci-final.png";

const BASE_URL = "http://localhost:5000";

extend("name", {
  validate(value, { min }) {
    let totalName = value?.split(" ");
    const totalLength = totalName.length < min;
    return !totalLength;
  },
  params: ["min"],
  message: "* Full name must include first name and last name",
});

extend("address", {
  validate(value, { min }) {
    const addressCharacterLength = value.length < min;
    return !addressCharacterLength;
  },
  params: ["min"],
  message: "* Address must be more than 8 characters",
});

extend("email", {
  validate(value) {
    if (validator.isEmail(value)) {
      return true;
    }
  },
  message: "* Enter a valid email address",
});

extend("expiryYear", {
  validate(value, { min }) {
    const expiryYearLength = value.length < min;
    return !expiryYearLength;
  },
  params: ["min"],
  message: "* Enter a valid expiry year",
});

extend("expiryMonth", {
  validate(value, { min }) {
    const expirtyMonthLength = value.length < min;
    return !expirtyMonthLength;
  },
  params: ["min"],
  message: "* Enter a valid expiry month",
});

extend("cardCvv", {
  validate(value, { min }) {
    const cardCvvLength = value.length < min;
    return !cardCvvLength;
  },
  params: ["min"],
  message: "* Enter a valid cvv",
});

extend("cardNumber", {
  validate(value, { min }) {
    const CardNumberLength = value.length < min;
    return !CardNumberLength;
  },
  params: ["min"],
  message: "* Enter a valid card number",
});
export default {
  name: "newpaylink",
  components: {
    VueTelInput,
    AuthLayout,
    ValidationProvider,
    ValidationObserver,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      pciImage: pciImage,
      cardErrors: [],
      cardErrorMessage: "",
      firstName: "",
      lastName: "",
      formValue: {
        address: {
          value: "",
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
        postalCode: {
          value: "",
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
        fullName: {
          value: "",
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
        cardNumber: {
          value: undefined,
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
       expiryMonth: {
          value: undefined,
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
        expiryYear: {
          value: undefined,
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
        cardCvv: {
          value: undefined,
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
        email: {
          value: "",
          errorMessage: undefined,
          errors: [],
          valid: false,
        },
      },
      termsAgreed: true,
      paymentId: undefined,
      //
      amount: undefined,
      currency: undefined,
      //Revolut public_id
      revolutPublicOrderId: undefined,
      // Ip address
      countryCode: undefined,
      regionCode: undefined,
      city: undefined,
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
      //
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

  },
  methods: {

    async getPaymentIntent(sccode) {
      let payload = {
        sccode,
      };

      this.loadingDetails = true;
      return axios
        .post("/v1.1/payer/payment/sscode-details", payload)
        .then((res) => {
          this.loadingDetails = false;
          let { data } = res;
          let { amount, currency, createdAt, revolutPublicOrderId } = data;
          this.createdAt = createdAt;
          this.revolutPublicOrderId = revolutPublicOrderId;

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
    splitFullName(name) {
      let fullName = name.split(" ");
      return fullName;
    },
    submitButton() {
      return (
        this.formValue.fullName.value &&
        this.formValue.postalCode.value &&
        this.formValue.address.value &&
        this.termsAgreed
      );
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

        let countryCode = res?.data?.countryCode;
        this.regionCode = res?.data?.region;
        this.city = res?.data?.city;
        this.countryCode = countryCode;
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
  watch: {
    cardErrors: {
      deep: true,
      handler: function (newVal, oldVal) {
        let i = 0;
        this.cardErrorMessage = [];
        for (i; i < newVal.length; i++) {
          if (newVal[i]["type"] == "validation.card.number.invalid") {
            this.cardErrorMessage.push({
              invalidCard: "Invalid card number",
            });
          }
          if (newVal[i]["type"] == "validation.card.expiry.expired") {
            this.cardErrorMessage.push({
              invalidExpiryDate: "Invalid card expiry date",
            });
          }
        }
        // this.cardErrorMessage = newVal;
        // console.log(this.cardErrorMessage);
      },
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/css/newStyle.scss";
</style>
