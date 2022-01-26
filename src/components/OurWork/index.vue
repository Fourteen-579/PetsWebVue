<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "OurWork",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    svgName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      color: '#E8332C',
    }
  }
}
</script>

<style scoped lang="scss">

</style>
