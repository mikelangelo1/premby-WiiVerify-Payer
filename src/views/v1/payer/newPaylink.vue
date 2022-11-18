<template>
  <auth-layout :title="'Create your payment'">
    <!--begin::Wrapper-->
    <div
      :class="$style.mainContainer"
      class="bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <!--begin::Form-->
      <form
        method="post"
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        @submit.prevent="formSubmit"
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
        <div class="d-flex align-items-center mb-10 mt-3">
          <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        </div>
        <!--end::Separator-->

        <!--begin::Input group-->
        <!--<div class="row fv-row mb-7 mt-3"> -->
        <div class="form-group">
          <!--begin::Col-->

          <!--end::Col-->
          <div class="row">
            <div class="col-xl-6" tabindex="1">
              <label class="form-label"> {{ $t("email") }}</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="email"
                name="email"
                autocomplete="off"
                v-model="formValue.email.value"
                @input="handleTextChange($event, 'email')"
              />
              <div :class="$style.errorMessage">
                {{ formValue.email.errorMessage }}
              </div>
      
              <label class="form-label"> Full Name</label>
              <input
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="name"
                autocomplete="off"
                v-model="formValue.name.value"
                @input="handleTextChange($event, 'name')"
              />
              <div :class="$style.errorMessage">
                {{ formValue.name.errorMessage }}
             
            </div>


            </div>

          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row fv-row mb-7">
                         <div class="col-xl-12" tabindex="3">
              <label class="form-label"> Phone Number </label>
              <vue-tel-input
               class="form-control form-control-lg form-control-solid"
                type="text"
                name="phone"
                autocomplete="off"
                v-model="phone"
              >
                
              </vue-tel-input>
       
          </div>
          <!--end::Col-->

          <!--begin::Col-->
      
          <!--end::Input group-->

          <!--begin::Input group-->

          <!--end::Wrapper-->
        </div>
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
          <div class="form-check form-switch" tabindex="5">
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
        <div class="text-center" style="margin-top: 20px" tabindex="6">
          <button
            id="kt_sign_up_submit"
            type="submit"
            class="btn btn-lg btn-primary"
            ref="sendClick"
          >
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
            <span class="indicator-label" v-else> {{ $t("next_page") }} </span>
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
        <div class="text-center">
          <p class="footer-class ml-5 mb-2 mt-4">
            Powered by <a href="https://swiftpay-home.vercel.app/">SwiftPay</a> |
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
      <!-- netopia form starts -->
      <form
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        novalidate
        action="https://secure.mobilpay.ro/en"
        method="POST"
        id="mobilePay"
      >
        <input type="hidden" name="env_key" :value="this.env_key" />
        <input type="hidden" name="data" :value="this.netopia_data" />
      </form>
      <!-- netopia form ends -->
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
  /* height: 30px;
  font-size: 14px;
  min-width: 10px !important;
  max-width: 10px !important;
  border-radius: 4px;
  padding: 0.5rem 1rem !important; */
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
import validator from "validator";
import useVuelidate from "@vuelidate/core";
import "vue-tel-input/dist/css/sprite.css"; // Flags styles
import "vue-tel-input/dist/css/component.css"; // Component styles
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import AuthLayout from "../../../components/layouts/AuthLayouts";
import moment from "moment";

// buildwatchers
let keysToWatch = [, "phone"];

let watchers = {};
keysToWatch.forEach((key) => {
  watchers[key] = function (newVal, previousVal) {
    this.checkFormCompleteness();
  };
});

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
}

export default {
  name: "newpaylink",
  components: {
    VueTelInput,
    AuthLayout,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      Props: {
        disabledFormatting: false,
        autoHideDialCode: false,
        enabledCountryCode: true,
        separateDialCode: true,
        mode: "international",
        disabledFetchingCountry: false,
      },
      form: {
        firstName: "",
        lastName: "",
        email: "",
        name: "",
      },
      formValue: {
        email: {
          value: "",
          errorMessage: undefined,
          valid: false,
        },
        name: {
          value: "",
        },
        phone: {
          value: "",
        },
      },
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      name: "",
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
      //
      createdAt: undefined,
      loadingDetails: false,
      //
      env_key: undefined,
      netopia_data: undefined,
      phone: undefined,
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
      },
    };
  },
  mounted() {
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

      this.getPaymentIntent(instanceId);
    }
  },
  methods: {
    trigger: function () {
      // console.log("clicked");
      this.$refs.sendClick.click();
    },
    handleTextChange(event, key) {
      let value = event?.target?.value?.trim();

      if (value == "" || !value) {
        this.formValue[key].errorMessage = `${key} cannot be empty`;
      }

      // email validation
      if (key == "email") {
        if (!validator.isEmail(value)) {
          this.formValue.email.errorMessage = "Please input a valid email";
          this.formValue.email.valid = false;
        } else {
          this.formValue.email.errorMessage = undefined;
          this.formValue.email.valid = true;
        }
      }

      if (key == "phone") {
        if (validator.isEmpty(value)) {
          this.formValue.phone.errors.push("Phone number cannot be empty");
        }
      }

      if (key == "name") {
        if (validator.isEmpty(value)) {
          this.formValue.phone.errors.push("Name cannot be empty");
        }
      }



    },
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
    formSubmit() {
      let parsePhone = this.phone.replace(/\s+/g, "");
      const data = {


        email: this.formValue.email.value,
        name: this.formValue.name.value,
        // zip_code: this.zip_code,
        phone_number: parsePhone,
        sccode: this.sccode,
      };

      this.loading = true;
      const automated = this.$route.meta?.automated;
      let newPayerUrl = "v1/payer/new/";
      if (automated) {
        newPayerUrl = "v1/payer/automated/new/";
      }
      console.log("automated ", automated);

      axios
        .post(newPayerUrl, data)
        .then((res) => {
          this.submitError = undefined;
          this.loading = false;

          this.env_key = res.data?.request?.env_key;
          this.netopia_data = res?.data?.request?.data;

          // trigger submission of netopia form programmatically
          setTimeout(() => {
            document.getElementById("mobilePay").submit();
          }, 1200);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
          let errorMssg = error?.response?.data
            ? error?.response?.data?.message
            : "Error encountered in submission";

          let errorText = `<div>${errorMssg}</div>`;

          this.submitErrorHtml = errorText;
        });
    },
    async getPaymentIntent(sccode) {
      let payload = {
        sccode,
      };

      this.loadingDetails = true;
      axios
        .post("v1/payer/  /sscode-details", payload)
        .then((res) => {
          this.loadingDetails = false;
          let { data } = res;
          let { amount, currency, createdAt } = data;
          this.createdAt = createdAt;

          let AmountWithComma = amount.toFixed(2).toLocaleString("en-US");
          this.currency = currency?.toUpperCase();

          AmountWithComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          this.amount = AmountWithComma;
        })
        .catch((err) => {
          console.log("error res ", err.response.data);
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
        });
    },
    checkFormCompleteness() {
      let formValid = true;

      // check formValue obj

      // check vue data
      let dataKeys = ["firstName", "lastName", "address", "phone", "zip_code", "name"];

      dataKeys.forEach((key) => {
        if (!this[key] || this[key]?.trim() == "") {
          formValid = formValid && false;
        }
      });

      // check formValue object
      for (let key in this.formValue) {
        if (!this.formValue[key].valid) {
          formValid = formValid && false;
        }
      }

      if (!this.termsAgreed) {
        formValid = formValid && false;
      }

      this.formComplete = formValid;
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
  },

  watch: {
    ...watchers,
  },
};
</script>
