<template>
  <div class="little-title">
    <div class="first border">
      <svg-icon icon-class="module" class="first-icon"></svg-icon>
    </div>
    <div v-if="backLink" class="back border">
      <router-link :to="backLink" class="back-link">{{ backLinkName }}</router-link>
      <svg-icon icon-class="toRight2" class="back-link-svg"/>
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
    },
    backLink: {
      type: String
    },
    backLinkName: {
      type: String,
      default: '上一页'
    }
  },
}
</script>

<style scoped lang="scss">
.little-title {

  .back{
    .back-link{
      font-size: 20px;
      color: black;
    }

    .back-link-svg{
      width: 15px;
      height: 15px;
    }
  }

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
