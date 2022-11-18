<template>
  <div id="main-wrapper" class="show">
    <Header />
    <sidebar />
    <div class="content-body">
      <div class="container">
        <!-- Setting page -->
        <div class="row" v-if="settings">
          <div class="col-xl-12">
            <page-title :pageName="pageName" />
          </div>
          <div class="col-xl-12">
            <setting-nav :activeSetting="activeSetting" />
            <slot />
          </div>
        </div>
        <!-- Without setting page -->
        <page-title :pageName="pageName" v-if="!settings" />
        <slot v-if="!settings" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
import PageTitle from "../PageTitle.vue";
import SettingNav from "../SettingNav.vue";
import Sidebar from "../Sidebar.vue";
export default {
  name: "DashboardLayout",
  components: { Header, Sidebar, PageTitle, SettingNav },
  props: {
    pageName: String,
    settings: Boolean,
    activeSetting: Number,
  },
  mounted() {
    document.querySelector("body").className = "dashboard";
  },
};
</script>
