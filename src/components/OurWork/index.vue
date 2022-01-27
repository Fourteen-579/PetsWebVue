<template>
  <div class="our-work-main"
       @mouseover="show = true"
       @mouseleave="show = false"
  >
    <div class="main-hover" v-show="show">
      <svg-icon class="main-hover-svg" :icon-class="svgName"/>
      <div class="main-hover-body">
        <div class="main-hover-body-title">
          {{ title }}
        </div>
        <el-divider></el-divider>
        <div class="main-hover-body-text">
          {{ description }}
        </div>
      </div>
    </div>
    <div class="main-unhover">
      <div class="main-unhover-body-img">
        <el-image
          class="main-unhover-img"
          :src="imgUrl"
          fit="cover"></el-image>
      </div>
      <div class="main-unhover-body">
        <svg-icon class="main-unhover-svg" :icon-class="svgName+'-red'"/>
        <span class="main-unhover-title">
          {{ title }}
        </span>
      </div>
    </div>
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
  created() {
  },
  data() {
    return {
      show: false,
    }
  }
}
</script>

<style scoped lang="scss">

.our-work-main {
  width: 33em;
  height: 20em;
  margin: 1em;
  display: inline-block;
  box-shadow: 1px 1px 5px #888888;
  position: relative;

  .main-hover {
    background-color: rgba(232, 51, 44, 0.85);
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 20em;

    .main-hover-svg {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20em;
      height: 20em;
    }

    .main-hover-body {
      color: white;
      width: 50%;
      position: absolute;
      left: 3em;
      top: 3em;

      .main-hover-body-title {
        font-size: 1.5em;
        font-weight: bolder;
      }

      .main-hover-body-text {
        font-size: 1.3em;
      }
    }

  }

  .main-unhover {
    .main-unhover-body-img {
      .main-unhover-img {
        height: 17.5em;
        width: 100%;
      }
    }

    .main-unhover-body {
      height: 2.5em;
      line-height: 2.5em;

      .main-unhover-svg {
        width: 2.4em;
        height: 2.4em;
      }

      .main-unhover-title {
        vertical-align: top;
        font-size: 1.5em;
      }
    }
  }
}

</style>
