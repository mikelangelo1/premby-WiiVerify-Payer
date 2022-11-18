<template>
  <auth-layout :title="'Authorization'">
    <!--begin::Wrapper-->
    <div
      :class="$style.formContainer"
      class="bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <h6 style="text-align: center" class="class-label">
        Your card will be authorized an amount of 0.50 USD. <br />
        After which you will be required to input the code sent to your card
        statement.
      </h6>
      <!--begin::Form-->
      <form
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        @submit.prevent="formSubmit"
        id="kt_login_signup_form"
      >
        <!--begin::Heading-->
        <div class="mb-10 text-center">
          <!--begin::Title-->
          <h1 class="text-dark mb-3">{{ amount }} {{ currency }}</h1>
          <!--end::Title-->

          <!--begin::Link-->

          <!--end::Link-->
        </div>
        <!--end::Heading-->

        <!--begin::Separator-->
        <div class="d-flex align-items-center mb-10 mt-3">
          <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        </div>
        <!--end::Separator-->
        <h3>Card details</h3>
        <div id="payment-element">
          <!-- Elements will create form elements here -->
        </div>
        <div :class="$style.errorMessage" id="error-message">
          {{ stripeError }}
        </div>

        <div id="stripe-error" :class="$style.errorMessage"></div>
        <button
          :disabled="loadingPay || loadingSetup"
          class="btn btn-lg btn-primary w-100 mb-4 mt-3"
          type="submit"
          id="submit"
        >
          Submit
        </button>

        <!--end::Col-->

        <!--begin::Col-->

        <!--end::Col-->
        <!--end::Actions-->
      </form>
      <footer class="">
        <div class="text-center">
          <p class="footer-class ml-5 mt-1">
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
      <!--end::Form-->
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
  margin-top: 5%;
}

.section {
  margin-top: 15px;
}
</style>

<script>
import axios from "../../../plugins/axios";

export default {
  name: "payment",

  data() {
    return {
      elements: undefined,
      cardElement: undefined,
      clientSecret: undefined,
      cardToken: undefined,
      // stripeAccountId: undefined,
      loading: false,
      //
      stripeError: undefined,
      stripe: undefined,
      //
      amount: undefined,
      currency: undefined,
      //
      billingDetails: {},
      card_verification_key: undefined,
      //
      loadingSetup: false,
      loadingPay: false,
    };
  },
  created() {
    let url = this.$route.params.requestUrl;
    let env_key = this.$route.params.env_key;
    let data = this.$route.params.data;

    window.location.href = url;
  },
  // mounted() {
  //   this.initializeStripe();

  //   let billingDetails = {};

  //   let userData = this.$store.state.user.userData?.userData;

  //   billingDetails["fullName"] = {
  //     text: userData?.fullname,
  //     label: "Full Name",
  //   };
  //   billingDetails["phone_number"] = {
  //     text: userData?.phone_number,
  //     label: "Phone number",
  //   };
  //   billingDetails["email"] = {
  //     text: userData?.email,
  //     label: "Email",
  //   };
  //   billingDetails["address"] = {
  //     text: userData?.address,
  //     label: "Address",
  //   };

  //   this.billingDetails = billingDetails;
  // },
  methods: {
    async initializeStripe() {
      let body = {
        sccode: this.$route.params.sccode,
      };

      const config = {
        headers: {
          "x-access-token": this.$store.state.user?.userData?.token,
        },
      };

      this.loadingSetup = true;
      axios
        .post("v1/payer/payment/get-auth-intent", body, config)
        .then((res) => {
          this.loadingSetup = false;
          let paymentIntentDetails = res?.data?.paymentIntentDetails;
          //

          let card_verification_key = res?.data?.verification_key;
          this.card_verification_key = card_verification_key;

          this.amount = (paymentIntentDetails?.amount / 100).toFixed(2);
          this.currency = paymentIntentDetails?.currency?.toUpperCase();

          this.stripe = Stripe(
            "pk_test_51KeeteFEG91NzsmGUkubEiaOzUfijRzUFuEmDy2L1drLtsyFdVAvM1TYRDaOrH5s9phTP36JKmif5gkCDhaazC19001g6Yc1Nc"
          );

          const options = {
            clientSecret: res?.data?.paymentIntentDetails?.client_secret,
          };
          this.clientSecret = options.clientSecret;

          // // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
          const elements = this.stripe.elements(options);
          this.elements = elements;

          // Create and mount the Payment Element
          const paymentElement = elements.create("payment", options);

          paymentElement.mount("#payment-element");
          this.paymentElement = paymentElement;
        })
        .catch((error) => {
          this.loadingSetup = false;
          this.stripeError = error.message;
        });
    },
    async formSubmit() {
      if (!this.stripe) {
        this.stripeError = "payment gateway not initialized";
        return;
      }
      let userData = this.$store.state.user.userData?.userData;
      let metadata = {
        payerId: userData?._id,
      };

      this.loadingPay = true;
      const response = await this.stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/paymentsuccess`,
          payment_method_data: {
            billing_details: {
              address: this.billingDetails.address.text,
              email: this.billingDetails.email.text,
              name: this.billingDetails.fullName.text,
              phone: this.billingDetails.phone_number.text,
            },
            metadata,
          },
        },
        redirect: "if_required",
      });

      this.loadingPay = false;

      const { error } = response;
      if (error) {
        const messageContainer = document.querySelector("#error-message");

        switch (error.code) {
          case "payment_intent_unexpected_state":
            messageContainer.textContent =
              "Error occured, this invoice might have been paid before";
            break;
          default:
            messageContainer.textContent = error.message;
        }
      } else {
        const paymentIntent = response?.paymentIntent;
        const messageContainer = document.querySelector("#error-message");

        switch (paymentIntent.status) {
          case "succeeded":
            this.$swal?.fire({
              text: "Authorization successful. \nNow input the code from your card debit statement",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });

            const routeParams = {
              ...this.$route?.params,
              card_verification_key: this.card_verification_key,
            };

            this.$router.push({
              name: `CardOtp`,
              params: routeParams,
            });

            break;

          case "processing":
            messageContainer.textContent =
              "Payment processing. We'll update you when payment is received.";
            break;

          case "requires_payment_method":
            messageContainer.textContent =
              "Payment failed. Please try another payment method.";
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            break;

          default:
            messageContainer.textContent = "Something went wrong.";
            break;
        }
      }
    },
  },
};
</script>
