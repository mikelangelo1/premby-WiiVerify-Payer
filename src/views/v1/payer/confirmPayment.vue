<template>
  <auth-layout :title="'Checking Payment status'">
    <!--begin::Wrapper-->
    <div
      :class="$style.mainContainer"
      class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto"
    >
      <!--begin::Form-->
      <h2>...Checking</h2>
      <!--end::Form-->
      <div :class="$style.errorMessage" id="error-message"></div>
    </div>
  </auth-layout>

  <!--end::Wrapper-->
</template>

<style module>
.errorMessage {
  color: red;
}

.mainContainer {
  padding: 15px;
}
</style>

<script>
import AuthLayout from "../../../components/layouts/AuthLayouts.vue";

// const stripe = Stripe(
//   "pk_test_51KeeteFEG91NzsmGUkubEiaOzUfijRzUFuEmDy2L1drLtsyFdVAvM1TYRDaOrH5s9phTP36JKmif5gkCDhaazC19001g6Yc1Nc"
// );

export default {
  name: "confirm3dComplete",
  components: {
    AuthLayout,
  },
  data() {
    return {};
  },
  mounted() {

    //  send data via iframe to trigger payment status check
    // window.top.postMessage("3DS-authentication-complete");

    setTimeout(() => {
      this.checkUrlChange();
      // if after 4 seconds 3ds auth iframe has not closed,
      // then its probably not an iframe but a redirect
    }, 4000);
  },
  methods: {
    checkUrlChange() {
      let currentUrl = window.location.href;
      var url = new URL(currentUrl);
      var clientSecret = url.searchParams.get("data");
      console.log(clientSecret)
      if (!clientSecret) {
        return;
      }

      // stripe.retrievePaymentIntent(clientSecret).then((result) => {
      //   const messageContainer = document.querySelector("#error-message");
      //   if (result.error) {
      //     // PaymentIntent client secret was invalid
      //     messageContainer.textContent = "invalid client secret ";
      //   } else {
      //     if (result.paymentIntent.status === "succeeded") {
      //       // Show your customer that the payment has succeeded
      //       this.$swal?.fire({
      //         text: "Payment successful",
      //         icon: "success",
      //         buttonsStyling: false,
      //         confirmButtonText: "Ok, got it!",
      //         customClass: {
      //           confirmButton: "btn fw-bold btn-primary",
      //         },
      //       });
      //     } else if (
      //       result.paymentIntent.status === "requires_payment_method"
      //     ) {
      //       // Authentication failed, prompt the customer to enter another payment method
      //       messageContainer.textContent =
      //         "Payment failed, please try another payment method";
      //     }
      //   }
      // });
    },
  },
};
</script>
