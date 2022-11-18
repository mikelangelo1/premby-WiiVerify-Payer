<template>
  <div id="main-wrapper">
    <div class="header landing">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <nav class="navbar">
              <div class="brand-logo">
                <a href="https://swiftpay-home.vercel.app">
                  <img
                    src="../../assets/images/SwiftLogo.png"
                    style="width: 8em"
                    alt=""
                  />
                </a>
              </div>
              <div class="header-right">
                <div class="dark-light-toggle" onclick="themeToggle()">
                  <span class="dark"><i class="icofont-moon"></i></span>
                  <span class="light"><i class="icofont-sun-alt"></i></span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center"
      style="min-height: 80vh"
    >
      <div>
        <div class="mx-auto text-center">
          <img
            src="../../assets/images/welcome.svg"
            style="width: 15em"
            alt="Welcome"
          />
        </div>
        <h3>Welcome to SwiftPay Payment portal</h3>
        <h4 style="text-align: center">
          Please visit a Payment Link to get started
        </h4>
      </div>
    </div>
  </div>
</template>
