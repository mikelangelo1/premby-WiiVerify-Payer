<template>
  <auth-layout :title="'Pay Now'">
    <!--begin::Wrapper-->
    <div
      :class="$style.formContainer"
      class="bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <!--begin::Form-->
      <form
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        @submit.prevent="formSubmit"
        id="kt_login_signup_form"
      >
        <!--begin::Heading-->

        <!--end::Heading-->

        <!--begin::Separator-->

        <!--end::Separator-->
        <h3 class="mt-0">Pay with card</h3>
        <div v-if="loadingSetup">Initializing...</div>
        <div v-if="paymentMethod">
          <div style="font-weight: bold; text-transform: uppercase">
            {{ paymentMethod.card.brand }}
          </div>
          <div>**** **** **** {{ paymentMethod.card.last4 }}</div>
        </div>
        <div id="iframe-element">
          <!-- Elements will create form elements here -->
        </div>
        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
        <div :class="$style.errorMessage" id="error-message">
          {{ stripeError }}
        </div>
        <div :class="$style.section">
          <h3>Billing details</h3>
          <div v-for="(value, key) in billingDetails" v-bind:key="key">
            {{ value.label }}: {{ value.text }}
          </div>
        </div>
        <div id="stripe-error" :class="$style.errorMessage"></div>
        <button
          :disabled="loadingSetup || loadingSubmit"
          class="btn btn-lg btn-primary w-100 mb-1 mt-3"
          type="submit"
          id="submit"
        >
          Pay
        </button>

        <!--end::Col-->

        <!--begin::Col-->

        <!--end::Col-->
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
    </div>
  </auth-layout>

  <!--end::Wrapper-->
</template>

<style module>
.errorMessage {
  color: red;
}

.successMessage {
  color: #1652f0;
}

.button {
  margin-top: 20px;
  background: #1652f0;
}

.formContainer {
  max-width: 600px;
  margin: auto;
  padding: 56px 48px;
  margin-top: 15%;
}

.section {
  margin-top: 15px;
}
</style>

<script>
import axios from "../../../plugins/axios";

// const stripe = Stripe(
//   "pk_test_51KeeteFEG91NzsmGUkubEiaOzUfijRzUFuEmDy2L1drLtsyFdVAvM1TYRDaOrH5s9phTP36JKmif5gkCDhaazC19001g6Yc1Nc"
// );

export default {
  name: "payment",

  data() {
    return {
      elements: undefined,
      cardElement: undefined,
      clientSecret: undefined,
      cardToken: undefined,
      stripeAccountId: undefined,
      loading: false,
      //
      stripeError: undefined,
      stripe: undefined,
      //
      amount: undefined,
      currency: undefined,
      billingDetails: {},

      //
      loadingSetup: false,
      loadingSubmit: false,

      //
      paymentIntentDetails: undefined,
      paymentMethod: undefined,
      //
      paymentObjRes: undefined,
    };
  },
  created() {
    let url = this.$route.params.requestUrl;
    let env_key = this.$route.params.env_key;
    let data = this.$route.params.data;

    window.location.href = url;
  },
  mounted() {
    let url = this.$route.params.requestUrl;
    let env_key = this.$route.params.env_key;
    let data = this.$route.params.data;

    window.location.href = url;
  },
  methods: {
    async initializeStripe() {
      let sccode = this.$route.params.sccode;
      let body = {
        sccode,
      };

      const config = {
        headers: {
          "x-access-token": this.$store.state.user?.userData?.token,
        },
      };

      this.loadingSetup = true;
      axios
        .post("v1/payer/payment/retrieve-intent", body, config)
        .then((res) => {
          this.loadingSetup = false;
          this.paymentObjRes = res?.data;
          let paymentIntentDetails = res?.data?.paymentIntentDetails;
          let paymentMethod = res?.data?.paymentMethods[0];
          this.clientSecret = paymentIntentDetails?.client_secret;
          //
          let stripeAccountId = res?.data?.stripeAccountId;
          this.stripeAccountId = stripeAccountId;

          this.paymentIntentDetails = paymentIntentDetails;
          this.paymentMethod = paymentMethod;

          this.amount = (paymentIntentDetails?.amount / 100).toFixed(2);
          this.currency = paymentIntentDetails?.currency?.toUpperCase();
        })
        .catch((error) => {
          this.loadingSetup = false;
          this.stripeError = error.response.data?.message || error.message;
        });
    },
    async formSubmit() {
      const data = {
        paymentIntentId: this.paymentIntentDetails?.id,
        paymentMethod: this.paymentMethod?.id,
        sccode: this.$route.params.sccode,
      };

      const config = {
        headers: {
          "x-access-token": this.$store.state.user?.userData?.token,
        },
      };

      this.loadingSubmit = true;
      axios
        .post("v1/payer/payment/confirm-saved-card", data, config)
        .then((res) => {
          let status = res?.data?.status;
          let paymentIntent = res?.data;
          // this.clientSecret = paymentIntent?.client_secret;

          // loading should be set to false after 3ds auth
          if (status == "succeeded") {
            this.loadingSubmit = false;
            this.$swal?.fire({
              text: "Payment successful",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });
          }

          if (status == "requires_action") {
            var iframe = document.createElement("iframe");
            iframe.src = paymentIntent.next_action.redirect_to_url.url;
            iframe.width = 600;
            iframe.height = 400;
            document.body.querySelector("#iframe-element").innerHTML =
              undefined;
            document.body.querySelector("#iframe-element").appendChild(iframe);
          }
        })
        .catch((error) => {
          console.log("error in confirm ", error.response?.data);
          this.loadingSubmit = false;
          this.stripeError = error.response?.data?.message || error.message;
        });

      return;
    },
    on3DSComplete() {
      // Hide the 3DS UI
      // document.body.querySelector("#iframe-element").innerHTML = '<div></div>';

      // Check the PaymentIntent
      stripe.retrievePaymentIntent(this.clientSecret).then((result) => {
        const messageContainer = document.querySelector("#error-message");
        if (result.error) {
          document.body.querySelector("#iframe-element").innerHTML =
            "<div></div>";
          // PaymentIntent client secret was invalid
          messageContainer.textContent = "invalid client secret ";
        } else {
          let paymentIntent = result.paymentIntent;

          // if the intent still requires redirect after iframe, then redirect
          var action = paymentIntent.next_action;
          if (action && action.type === "redirect_to_url") {
            document.body.querySelector("#iframe-element").innerHTML =
              "<div></div>";
            window.location = action.redirect_to_url.url;
            this.loadingSubmit = false;
          }

          if (result.paymentIntent.status === "succeeded") {
            document.body.querySelector("#iframe-element").innerHTML =
              "<div></div>";
            this.loadingSubmit = false;
            // Show your customer that the payment has succeeded
            this.$swal?.fire({
              text: "Payment successful",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });

            this.$router.push({
              name: "SuccessPage",
              params: {
                paymentIntent,
                paymentObjRes: this.paymentObjRes,
              },
            });
          } else if (
            result.paymentIntent.status === "requires_payment_method"
          ) {
            this.loadingSubmit = false;
            document.body.querySelector("#iframe-element").innerHTML =
              "<div></div>";
            // Authentication failed, prompt the customer to enter another payment method
            messageContainer.textContent =
              "Payment failed, please try another payment method";
          }
        }
      });
    },
  },
};
</script>
