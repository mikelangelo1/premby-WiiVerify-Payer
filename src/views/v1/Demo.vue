<template>
  <div id="main-wrapper">
    <div class="header landing">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <nav class="navbar">
              <div class="brand-logo">
                <router-link to="#">
                  <img src="../assets/images/SwiftLogo.png" alt="" />
                </router-link>
              </div>
              <div class="header-right">
                <div class="dark-light-toggle" onclick="themeToggle()">
                  <span class="dark"><i class="icofont-moon"></i></span>
                  <span class="light"><i class="icofont-sun-alt"></i></span>
                </div>
                <a href="https://themeforest.net/item/intez-payment-dashboard-vue-app/32008020" class="btn btn-primary">Buy</a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="intro" id="intro" data-scroll-index="0">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <div class="col-xl-6 col-md-6">
            <div class="intro-content my-5">
              <h1>Swiftpay - Online payment management dashboard</h1>
              <p>
                SwiftPay is the The storefront for freelancers. Here
                included balance, bill, invoice, and all user setting pages
                including profile, application, activity, payment method, api,
                sign in & sign up etc.
              </p>
              <!-- <div class="intro-btn">
                                <a href="#" class="btn btn-primary me-3" data-scroll-nav="1">View Demo</a>
                                <a href="#" class="btn btn-outline-primary">Buy</a>
                            </div> -->
            </div>
          </div>
          <div class="col-xl-5 col-md-6 py-md-5">
            <div class="intro-demo_img">
              <img
                src="../assets/images/demo/intez.jpg"
                alt=""
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="demo section-padding">
      <div class="container">
        <div class="row py-lg-5 justify-content-center">
          <div class="col-xl-7">
            <div class="section-title text-center">
              <h2>Pages</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/dashboard.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Dashboard</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/balance" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/wallet.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Wallet</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/bill" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/payment.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Payment</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/invoice" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/invoice.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Link</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/create-invoice" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/create-invoice.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Create a Payment Link</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/notification" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/notification.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Notification</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/settings-profile" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/profile.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Profile Settings</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/profile" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/profile.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>User Profile</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/settings-application" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/settings-application.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Application</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/settings-security" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/settings-security.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Security</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/settings-activity" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/settings-activity.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Activity</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/settings-payment-method" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/settings-payment-method.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Payment Method(s)</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/settings-api" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/settings-api.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Api</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/signin" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/signin.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Sign in Page</h4>
            </div>
          </div>
          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/signup" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/signup.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Sign up page</h4>
            </div>
          </div>

          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/lock" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/locked.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Locked Page</h4>
            </div>
          </div>

          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/otp-1" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/otp-1.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>1 of 2-Step-Verification</h4>
            </div>
          </div>

          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/otp-2" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/otp-2.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>2 of 2-Step-Verification</h4>
            </div>
          </div>

          <div class="col-xl-4 col-md-4 col-sm-6">
            <div class="demo_img">
              <router-link to="/verify-email" target="_blank">
                <div class="img-wrap">
                  <img
                    src="../assets/images/demo/email-verification.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </router-link>
              <h4>Email Verification</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
