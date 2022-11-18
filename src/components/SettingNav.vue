<template>
  <div class="settings-menu">
    <router-link to="settings-profile" :class="activeSetting === 1 && 'active'"
      >Settings</router-link
    >
    <router-link
      to="settings-application"
      :class="activeSetting === 2 && 'active'"
      >Application</router-link
    >
    <router-link to="settings-security" :class="activeSetting === 3 && 'active'"
      >Security</router-link
    >
    <router-link to="settings-activity" :class="activeSetting === 4 && 'active'"
      >Activity</router-link
    >
    <!-- <router-link to="settings-privacy" :class="activeSetting === 1 && 'active'">Privacy</router-link> -->
    <router-link
      to="settings-payment-method"
      :class="activeSetting === 5 && 'active'"
      >Payment Method(s)</router-link
    >
    <router-link to="settings-api" :class="activeSetting === 6 && 'active'"
      >API</router-link
    >
    <!-- <router-link to="settings-fees">Fees</router-link> -->
  </div>
</template>

<script>
export default {
  name: "SettingNav",
  props: {
    activeSetting: Number,
  },
};
</script>
