<template>
  <div>
    {{ this.info }}
  </div>
</template>

<script>
export default {
  name: "info",
  created() {
    this.info = this.$route.query.info
  },
  data() {
    return {
      //宣传信息详情
      info: null,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
