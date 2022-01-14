<template>
  <div class="little-title">
    <div class="first border">
      <svg-icon icon-class="module" class="first-icon"></svg-icon>
    </div>
    <div class="text border">
      {{ titleName }}
    </div>
    <div v-if="description" class="text-small border">
      {{ description }}
    </div>
    <div v-if="link" class="text-link border">
      <router-link :to="link">{{ linkName }}</router-link>
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
    },
    description: {
      type: String
    },
    link: {
      type: String
    },
    linkName: {
      type: String,
      default: '更多'
    }
  },
}
</script>

<style scoped lang="scss">
.little-title {

  .first {
    .first-icon {
      width: 20px;
      height: 20px;
    }
  }

  .text {
    font-size: 20px;
  }

  .text-small {
    font-size: 10px;
    color: #8c939d;
    margin-left: 15px;
  }

  .text-link {
    font-size: 12px;
    margin-left: 15px;
    color: blue;
  }

  .border {
    display: inline-block;
  }

}
</style>
