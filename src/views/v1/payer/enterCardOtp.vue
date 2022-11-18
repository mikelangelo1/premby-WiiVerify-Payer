<template>
  <auth-layout :title="'Verify your Payment Method'">
    <!--begin::Wrapper-->
    <div
      :class="$style.mainContainer"
      class="w-lg-500px bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <!--begin::Form-->
      <form
        class="form w-100"
        id="kt_login_signin_form"
        @submit.prevent="formSubmit"
      >
        <!--begin::Heading-->

        <!--begin::Heading-->

        <div class="mb-10 bg-light-info p-8 rounded">
          <div class="text-info text-center">
            Please input the 4 digit code on your card statement.<br />
            It should have a format of "CPAYCODE* 1234"
          </div>
        </div>
        <div class="d-flex align-items-center mb-10 mt-3">
          <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        </div>
        <div
          v-show="formValue.otp.errorMessage"
          :class="$style.errorMessage"
          class="alert alert-danger"
        >
          {{ formValue.otp.errorMessage }}
        </div>
        <!--begin::Input group-->
        <div class="fv-row mb-10">
          <!--begin::Wrapper-->
          <div class="d-flex flex-stack mb-2 mt-3">
            <!--begin::Label-->
            <label class="class-label">Enter Code</label>
            <!--end::Label-->
          </div>
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
        <div class="text-center custom-btn-height">
          <!--begin::Submit button-->
          <button
            type="submit"
            id="kt_sign_in_submit"
            class="btn btn-lg btn-primary w-100 mb-5"
            :disabled="!formValue.otp.value || formValue.otp.value == ''"
          >
            <span class="indicator-label"> Continue </span>
          </button>
          <div style="text-align: center" :class="$style.errorMessage">
            {{ submitError }}
          </div>

          <!--end::Submit button-->

          <!--end::Google link-->
        </div>
        <!--end::Actions-->
      </form>
      <b-modal ref="my-modal" hide-footer title="Signup Successful">
        <div class="d-block text-center">
          <h3>Your Account has been created successfully</h3>
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

<style scoped>
.text-info {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
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
      //
      submitError: undefined,
    };
  },
  mounted() {
    // redirect to signin if sscode is undefined
    let card_verification_key = this.$route.params.card_verification_key;

    if (!card_verification_key) {
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
        verification_key: this.$route.params.card_verification_key,
        sccode: this.$route.params.sccode,
      };

      const config = {
        headers: {
          "x-access-token": this.$store.state.user?.userData?.token,
        },
      };

      axios
        .post("v1/payer/payment/auth-verify", data, config)
        .then((res) => {
          if (res.data) {
            this.$swal?.fire({
              text: "Submitted successfully",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });
          }

          // Go to page after successfully login
          const routeParams = {
            ...this.$route?.params,
          };

          this.$router.push({
            path: `/payment/${this.$route.params.sccode}`,
            params: routeParams,
          });

          this.submitError = undefined;
        })
        .catch((err) => {
          console.log(err?.response?.data);

          this.$swal?.fire({
            text:
              err?.response?.data?.message ||
              err?.response?.data?.msg ||
              "Error verifying code",
            icon: "failure",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            customClass: {
              confirmButton: "btn fw-bold btn-primary",
            },
          });
        });
    },
  },
};
</script>
