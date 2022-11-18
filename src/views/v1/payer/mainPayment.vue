<template>
  <auth-layout :title="'Authorization'">
    <!--begin::Wrapper-->
    <div
      :class="$style.formContainer"
      class="bg-white rounded-3 shadow-sm p-10 p-lg-15 mx-auto"
    >
      <!--begin::Form-->
      <form
        class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
        novalidate
        action="https://secure.mobilpay.ro/en"
        method="POST"
        id="mobilePay"
      >
        <input type="hidden" name="env_key" :value="this.env_key" />
        <input type="hidden" name="data" :value="this.data" />
        <div :class="$style.errorMessage" id="error-message">
          {{ stripeError }}
        </div>

        <div id="stripe-error" :class="$style.errorMessage"></div>
        <button
          :disabled="loadingPay || loadingSetup"
          class="btn btn-lg btn-primary w-100 rounded-0 fw-1 fs-5 mb-4 mt-3"
          type="submit"
          id="submit"
        >
          Submit
        </button>
      </form>
      <footer class="">
        <div class="text-center">
          <p class="footer-class ml-5 mt-1">
            Powered by
            <a href="https://swiftpay-home.vercel.app/">SwiftPay</a> |
            <a class="footer-terms" href="#">Terms</a>
            &times;
            <a class="footer-terms" href="#">Privacy</a>
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
      url: undefined,
      env_key: undefined,
      data: undefined,

      //
      billingDetails: {},
      // card_verification_key: undefined,
      //
      loadingSetup: false,
      loadingPay: false,
      //
      //
      paymentObjRes: undefined,
    };
  },
  mounted() {
    this.initializeStripe();

    // Assign the nonce value to the hidden form field
    // document.getElementById("env_key").value = this.env_key;
    // document.getElementById("data").value = this.data;

    // POST the nonce form to the payment processing page
    document.getElementById("mobilePay").submit();

    let billingDetails = {};

    let userData = this.$store.state.user.userData?.userData;

    billingDetails["fullName"] = {
      text: userData?.fullname,
      label: "Full Name",
    };
    billingDetails["phone_number"] = {
      text: userData?.phone_number,
      label: "Phone number",
    };
    billingDetails["email"] = {
      text: userData?.email,
      label: "Email",
    };
    billingDetails["address"] = {
      text: userData?.address,
      label: "Address",
    };

    this.billingDetails = billingDetails;
  },
  methods: {
    async initializeStripe() {
      let body = {
        sccode: this.$route.params.sccode,
      };

      console.log("this.$store.state.user ", this.$store.state.user);

      const config = {
        headers: {
          "x-access-token": this.$store.state.user?.userData?.token,
        },
      };

      this.loadingSetup = false;

      this.url = this.$store.state.user.userData.request.url;
      this.env_key = this.$store.state.user.userData.request.env_key;
      this.data = this.$store.state.user.userData.request.data;

      // axios
      //   .post("v1/payer/payment/retrieve-intent", body, config)
      //   .then((res) => {
      //     this.loadingSetup = false;
      //     let paymentIntentDetails = res?.data?.paymentIntentDetails;
      //     //
      //     this.paymentObjRes = res?.data;

      //   this.amount = (paymentIntentDetails?.amount / 100).toFixed(2);
      //     this.currency = paymentIntentDetails?.currency?.toUpperCase();

      //     this.stripe = Stripe(
      //       "pk_test_51KeeteFEG91NzsmGUkubEiaOzUfijRzUFuEmDy2L1drLtsyFdVAvM1TYRDaOrH5s9phTP36JKmif5gkCDhaazC19001g6Yc1Nc"
      //     );

      //     const options = {
      //       clientSecret: res?.data?.paymentIntentDetails?.client_secret,
      //     };
      //     this.clientSecret = options.clientSecret;

      //     // // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
      //     const elements = this.stripe.elements(options);
      //     this.elements = elements;

      //     // Create and mount the Payment Element
      //     const paymentElement = elements.create("payment", options);

      //     paymentElement.mount("#payment-element");
      //     this.paymentElement = paymentElement;
      //   })
      //   .catch((error) => {
      //     console.log('error ',error?.response?.data)
      //     this.loadingSetup = false;
      //     this.stripeError =error.response?.data?.message || error.message
      //   });
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
            this.$router.push({
              name: "SuccessPage",
              params: {
                paymentIntent,
                paymentObjRes: this.paymentObjRes,
              },
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
