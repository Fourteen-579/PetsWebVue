<template>
  <div class="app-container">
    <div class="main-block to-rescued">
      <Title titleName="待救助动物" link="/rescued/rescued"/>
      <to-rescued page-size="8"/>
    </div>
    <div class="main-block rescued">
      <Title title-name="已救助动物" link="/toRescued/toRescued"/>
      <rescued page-size="6"/>
    </div>
  </div>
</template>

<script>
import toRescued from "@/views/rescue/toRescued";
import rescued from "@/views/rescue/rescued";
import Title from "@/components/Title/index"

export default {
  components: {
    toRescued,
    Title,
    rescued
  },

  data() {
    return {}
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

.main-block {
  width: calc(100%);
}

</style>
