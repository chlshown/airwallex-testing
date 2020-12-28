<template>
  <div class="wrapper">
    <v-head></v-head>
    <router-view class="content"></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vFooter from './Footer.vue'
export default {
  data() {
    return {}
  },
  components: {
    vHead,
    vFooter,
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  .content {
    background-image: linear-gradient(112deg, #ffb14c -17%, #f4542e 95%);
  }
}
</style>
