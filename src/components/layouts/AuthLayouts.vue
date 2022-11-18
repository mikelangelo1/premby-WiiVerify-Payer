<template>
  <div class="authincation">
<slot />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  props: {
    title: String,
    colXl4: Boolean,
    alert: Boolean,
  },
};
</script>
