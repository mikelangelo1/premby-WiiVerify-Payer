<template>
  <div class="page-title">
    <div class="row align-items-center justify-content-between">
      <div class="col-xl-4">
        <div class="page-title-content">
          <h3>{{ pageName }}</h3>
          <p class="mb-2">
            SwiftPay | {{ pageName }}
            {{ pageName === "Your Dashboard" ? "" : "page" }}
          </p>
        </div>
      </div>
      <div class="col-auto">
        <div class="breadcrumbs">
          <a href="/">Home </a><span><i class="ri-arrow-right-s-line"></i></span
          ><a href="#">{{ pageName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    pageName: String,
  },
};
</script>
