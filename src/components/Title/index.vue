<template>
  <div class="little-title">
    <div class="first border">
      <svg-icon icon-class="module" class-name="first-icon"></svg-icon>
    </div>
    <div class="text border">
      {{ titleName }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Title',
  props: {
    titleName: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped lang="scss">
.little-title {

  .border {
    display: inline-block;
  }

}
</style>
