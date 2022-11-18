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
            <div ref="cardElementRef"></div>
            <div style="display: flex; justify-content: space-between">
              <p class="errorMessage" v-if="cardErrorMessage.length > 0">
                {{ cardErrorMessage[0].invalidCard }}
              </p>
              <p
                style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: flex-end;
                "
                class="errorMessage"
                v-if="cardErrorMessage.length > 1"
              >
                {{ cardErrorMessage[1].invalidExpiryDate }}
              </p>
              <p
                class="errorMessage"
                v-if="
                  cardErrorMessage.length > 0 &&
                  cardErrorMessage[0].invalidExpiryDate
                "
              >
                {{ cardErrorMessage[0].invalidExpiryDate }}
              </p>
            </div>
            <div class="card-input">
              <label class="card-input__label">{{ $t("full_name") }}</label>
              <ValidationProvider rules="name:2" v-slot="{ errors }">
                <input
                  :tabindex="1"
                  type="text"
                  name="fullName"
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

            <div class="card-form__row">
              <div class="card-form__col -cvv">
                <div class="card-input">
                  <label for="cardCvv" class="card-input__label">{{
                    $t("address_line")
                  }}</label>
                  <ValidationProvider rules="address:10" v-slot="{ errors }">
                    <input
                      :tabindex="3"
                      type="text"
                      name="address"
                      class="card-input__input"
                      maxlength="40"
                      :class="{ 'has-error': formValue.address.errorMessage }"
                      v-model="formValue.address.value"
                      autocomplete="off"
                      required
                    />
                    <span class="errorMessage">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="card-form__col -postal-code">
                <div class="card-input">
                  <label for="cardCvv" class="card-input__label">{{
                    $t("zip_code")
                  }}</label>
                  <ValidationProvider rules="postalCode:5" v-slot="{ errors }">
                    <input
                      :tabindex="4"
                      type="text"
                      name="postalCode"
                      class="card-input__input"
                      maxlength="10"
                      v-model="formValue.postalCode.value"
                      autocomplete="off"
                      :class="{
                        'has-error': formValue.postalCode.errorMessage,
                      }"
                      required
                    />
                    <span class="errorMessage">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
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

extend("postalCode", {
  validate(value, { min }) {
    const postalCodeLength = value.length < min;
    return !postalCodeLength;
  },
  params: ["min"],
  message: "* Enter a valid zip code",
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

    this.getRevolutWidget();
  },
  methods: {
    trigger: function () {
      this.$refs.sendClick.click();
    },

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
    async callCaptcha() {
      // captcha
      const recaptcha = await load("6Lf0Y90eAAAAABdwhXJzYka0oWOTmwWsarI-tpqC");
      const token = await recaptcha.execute("submit");
      return token;
    },

    async getRevolutWidget() {
      RevolutCheckout(this.revolutPublicOrderId, "sandbox").then((RC) => {
        const paymentId = this.sccode?.replace("sccode=", "");

        const countryCode = this.countryCode;
        const regionCode = this.regionCode;
        const city = this.city;
        const cardErrors = this.cardErrors;
        const errors = this.errors;

        const router = this.$router;
        const swal = this.$swal;
        const _this = this;

        const newPayerUrl = "v1.1/payer/new/";

        var form = document.querySelector("form");
        const instance = RC.createCardField({
          target: this.$refs.cardElementRef,
          hidePostcodeField: true,
          styles: {
            default: {
              color: "#555",
              "::placeholder": {
                color: "#1a3b5d",
                fontWeight: "600",
              },
            },
            autofilled: {
              color: "#000",
            },
          },
          classes: {
            default: "card-input__input",
            focused: "rc-card-field--focused",
            invalid: "rc-card-field--invalid",
            empty: "rc-card-field--empty",
            autofilled: "rc-card-field--autofilled",
            completed: "rc-card-field--completed",
          },
          onValidation(messages) {
            let errors;
            errors = messages;
            _this.cardErrors = errors;
          },
          onSuccess() {
            router.push({
              name: "SuccessPage",
              query: {
                orderId: paymentId,
              },
            });
          },
          onError(error) {
            console.log(error);
            swal.fire({
              title: "An error occured",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Okay",
              customClass: {
                confirmButton: "btn fw-bold btn-danger",
              },
            });
            //
            // router.push({
            //   name: "SuccessPage",
            //   query: {
            //     orderId: paymentId,
            //   },
            // });
          },
          onCancel() {
            // renewOrder(order.id);
          },
        });

        form.addEventListener("submit", function (event) {
          // Prevent browser form submission. You need to submit card details first.
          event.preventDefault();

          const data = new FormData(form);

          const email = data.get("email");
          const address = data.get("address");
          const name = data.get("name");
          const postalCode = data.get("postalCode");

          const newPayer = {
            email: email,
            address: address,
            name: name,
          };

          instance.submit({
            name: data.get("name"),
            email: data.get("email"),
            savePaymentMethodFor: "customer",
            billingAddress: {
              countryCode: countryCode,
              region: regionCode,
              city: city,
              streetLine1: data.get("address"),
              postcode: data.get("postalCode"),
            },
          });

          const payerSignUp = axios
            .post(newPayerUrl, newPayer)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log("error", error);
            });

          console.log("payerSignUp", payerSignUp);
        });

        // return instance;
      });
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
