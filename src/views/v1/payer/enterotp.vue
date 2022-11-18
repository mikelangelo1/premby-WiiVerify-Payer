<template>
  <auth-layout :title="'Verify your Phone number'">
    <!--begin::Wrapper-->
    <div
      :class="$style.mainContainer"
      class="w-lg-500px bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <!--begin::Form-->
      <!--begin::Heading-->
      <div class="text-center mb-7">
        <!--begin::Title-->
        <h1 class="class-amount">{{ this.amount }} USD</h1>
        <!--end::Title-->

        <!--begin::Link-->

        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info mt-2 text-center">
          {{ $t("code_sent_message") }}
        </div>
      </div>
      <div class="d-flex align-items-center mb-10 mt-3">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>
      <div
        class="alert alert-danger"
        v-show="formValue.otp.errorMessage"
        :class="$style.errorMessage"
      >
        {{ formValue.otp.errorMessage }}
      </div>
      <div class="fv-row mb-10">
        <!--end::Wrapper-->

        <!--begin::Input
          <input
            class="form-control form-control-lg form-control-solid"
            type="number"
            name="otp"
            v-model="formValue.otp.value"
            :class="$style.inputWrapper"
          /> -->
        <div class="otp_display d-flex justify-content-center">
          <v-otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleComplete"
          />
        </div>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--<button
            type="submit"
            id="kt_sign_in_submit"
            class="btn rounded-0 py-3 px-5 btn-primary  mb-5"
            :disabled="
              !formValue.otp.value || formValue.otp.value == '' || loading || otpVerified
            "
          >
            <span class="indicator-label"> Continue </span>
          </button> -->
        <div style="text-align: center" :class="$style.errorMessage">
          {{ submitError }}
        </div>
      </div>
      <!--end::Actions-->

      <!-- netopia form starts -->
      <form
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        novalidate
        action="https://secure.mobilpay.ro/en"
        method="POST"
        id="mobilePay"
      >
        <input type="hidden" name="env_key" :value="this.env_key" />
        <input type="hidden" name="data" :value="this.data" />
      </form>
      <!-- netopia form ends -->

      <!-- main otp form starts-->
      <form
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        novalidate
      >
        <div id="stripe-error" :class="$style.errorMessage"></div>
        <button
          :disabled="!otpVerified"
          class="btn btn-primary auth-btn justify-content-center align-items-center px-5 mb-4 mt-3"
          type="submit"
          id="submit"
        >
          {{ $t("pay") }}
        </button>
      </form>

      <b-modal ref="my-modal" hide-footer title="Signup Successful">
        <div class="d-block text-center">
          <h3>{{ $t("account_created") }}</h3>
        </div>
      </b-modal>
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
    </div>
    <!--end::Wrapper-->
  </auth-layout>
</template>

<style module>
.errorMessage {
  color: red;
}
.mainContainer {
  padding: 56px 48px;
}
.inputWrapper {
  margin-bottom: 13px;
}
</style>

<style>
.otp-input {
  width: 3.5rem;
  height: 3.5rem;
  padding: 5px;
  margin: 0 0px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.otp_display {
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 980px) {
  .otp-input {
    width: 2rem;
    height: 2rem;
  }
  .otp_display {
    justify-content: center;
  }
}

@media screen and (max-width: 820px) {
  .otp-input {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>

<script>
import axios from "../../../plugins/axios";
import AuthLayout from "../../../components/layouts/AuthLayouts";
export default {
  name: "enterotp",
  components: {
    AuthLayout,
  },
  data() {
    return {
      formValue: {
        otp: {
          value: "",
          errorMessage: undefined,
          valid: false,
        },
      },
      amount: this.$route.params.amount,
      phone_number: this.$route.params.phonenumber,
      client_secret: this.$route.params.client_secret,
      verificationKey: this.$route.params.verification_key,
      otpVerified: false,
      loadingSetup: false,
      loadingPay: false,
      env_key: undefined,
      data: undefined,

      //
      submitError: undefined,
      //
      loading: false,
    };
  },
  mounted() {
    // redirect to signin if sscode is undefined
    let sccode = this.$route.params.sccode;
    if (!sccode) {
      this.$router.back();
    }
  },
  methods: {
    handleOnChange(e) {
      this.formValue.otp.value = e;
    },
    handleComplete(val) {
      this.formValue.otp.value = val;
      this.formSubmit();
    },
    formSubmit() {
      const data = {
        otp: this.formValue.otp.value,
        email: this.$route.params.email,
        verification_key: this.$route.params.verification_key,
        phone_number: this.$route.params.phone_number,
        sccode: this.$route.params.sccode,
      };
      this.loading = true;
      axios
        .post("v1/payer/verify/phone-otp", data)
        .then((res) => {
          this.$store.commit("user/loginSuccess", res?.data);
          this.loading = false;
          if (res.data) {
            console.log("data", res.data);
            this.otpVerified = true;

            this.env_key = res.data?.request?.env_key;
            this.data = res?.data?.request?.data;

            this.$swal?.fire({
              text: "Submitted successfully.\n Please complete the payment process.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });

            // trigger submission of netopia form programmatically
            setTimeout(() => {
              document.getElementById("mobilePay").submit();
            }, 1200);
          }

          this.submitError = undefined;
        })
        .catch((err) => {
          console.log(err?.response?.data);
          this.loading = false;
          this.$swal?.fire({
            text:
              "Error validating your otp, \n" + err?.response?.data?.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
        });
    },
  },
};
</script>
