<template>
  <auth-layout :title="''">
    <!--begin::Wrapper-->
    <div class="wrapper" id="app">
      <div id="preloader" v-show="isLoading">
        <i>.</i>
        <i>.</i>
        <i>.</i>
      </div>
      <div class="card-form" v-show="!isLoading">
        <div class="card-success__inner">
          <router-link to="/"
            ><img
              src="../../../assets/images/logonew.png"
              alt=""
              class="logo-success"
          /></router-link>
          <div v-if="status == 'completed'">
            <div class="card-success__logo">
              <b-icon-check2-circle
                class="text-success fs-1"
                style="width: 100px; height: 100px"
              ></b-icon-check2-circle>
            </div>
            <h2
              style="
                font-weight: 700;
                display: flex;
                justify-content: center;
                padding-top: 15px;
              "
            >
              {{ $t("thank_you") }}
            </h2>
            <h3>
              {{ $t("your_payment_of") }} <strong>{{ amount }} USD</strong>
              {{ $t("successfully_received") }}
            </h3>
            <p></p>
            <div>{{ $t("ref_id") }}: {{ paymentId }}</div>
            <br />
            <br />
            <hr />
          </div>
          <div v-if="status != 'completed'">
            <div class="card-success__logo">
              <b-icon-x-circle
                class="text-danger fs-1"
                style="width: 100px; height: 100px"
              ></b-icon-x-circle>
            </div>
            <h2
              style="
                font-weight: 700;
                display: flex;
                justify-content: center;
                padding-top: 15px;
              "
            >
              {{ $t("tx_failed") }}
            </h2>
            <h3>
              {{ $t("your_payment_of") }} <strong>{{ amount }} USD</strong>
              {{ $t("unable_complete") }}
            </h3>
            <p></p>
            <div>{{ $t("ref_id") }}: {{ paymentId }}</div>
            <br />
            <br />
            <hr />
          </div>
          <div class="my-custom-class">
            <div v-if="webhookURL || successURL">
              <button
                id="kt_sign_up_submit"
                type="submit"
                class="btn btn-lg btn-primary"
              >
                <a
                  @click="returnToMerchant()"
                  style="color: white !important"
                  >{{ $t("return_to_merchant") }}</a
                >
              </button>
            </div>
          </div>
        </div>
        <footer class="">
          <div class="text-center">
            <p class="footer-class ml-5 mb-2 mt-4">
              Powered by
              <a href="https://swiftpay-home.vercel.app/">SwiftPay</a> |
              <a class="footer-terms" href="#">Terms</a>
              &times;
              <a class="footer-terms" href="#">Privacy</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </auth-layout>

  <!--end::Wrapper-->
</template>

<style module>
.mainContainer {
  padding: 56px 48px;
}
</style>

<script>
import AuthLayout from "../../../components/layouts/AuthLayouts.vue";
import axios from "../../../plugins/axios";

import { BIconCheck2Circle, BIconXCircle } from "bootstrap-vue";

export default {
  name: "Success",
  components: {
    AuthLayout,
    BIconCheck2Circle,
    BIconXCircle,
  },
  data() {
    return {
      isLoading: true,
      amount: undefined,
      paymentId: undefined,
      status: undefined,
      successURL: undefined,
      failureUrl: undefined,
      webhookURL: undefined,
      paymentDetails: undefined,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      this.getPaymentDetails();
    }, 20000);
  },
  methods: {
    async getPaymentDetails() {
      this.paymentId = this.$route.query?.orderId;
      let body = {
        paymentLinkInstanceId: this.$route.query?.orderId,
      };

      const interval = 1.5 * 1000; // 1.5 seconds
      const getPaymentStatus = setInterval(async () => {
        await axios.post("v1.1/payer/getPaymentDetails", body).then((res) => {
          this.amount = res?.data?.paymentDetails.amount;
          this.status = res?.data?.paymentDetails.status;
          this.successURL = res?.data?.paymentDetails?.successURL;
          this.failureUrl = res?.data?.paymentDetails?.failureURL;
          this.paymentDetails = res?.data?.paymentDetails;

          // only merchant plugin created links have webhook urls
          this.webhookURL = res?.data?.paymentDetails?.webhookURL;

          if (this.webhookURL) {
            setTimeout(() => {
              this.returnToMerchant();
            }, 2000);
          }
        });

        if (this.status === "completed") {
          this.isLoading = false;
          clearInterval(getPaymentStatus);
        }

        clearInterval(getPaymentStatus);
      }, interval);
    },
    returnToMerchant() {
      const status = this.status;
      const successURL = this.successURL;
      const failureUrl = this.failureUrl;

      const paymentDetails = this.paymentDetails;

      const type = paymentDetails?.metadata?.type;

      if (type == "popup") {
        const message = {
          paymentDetails,
        };

        window.parent.postMessage(JSON.stringify(message), "*");

        return;
      } else {
        if (status == "completed") {
          window.location.replace(successURL);
        } else {
          window.location.replace(failureUrl);
        }
      }
    },
  },
};
</script>
