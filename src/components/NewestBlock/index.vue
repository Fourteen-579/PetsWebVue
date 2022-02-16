<template>
  <div class="newest-main">
    <div class="newest-img newest-block">
      <el-image
        v-if="imgUrl"
        class="newest-img-img"
        :src="imgUrl[0].url"
        fit="cover"></el-image>
    </div>
    <div class="newest-title newest-block">
      {{ title }}
    </div>
    <div class="newest-text newest-block">
      {{ description }}
    </div>
    <div class="newest-button newest-block">
      <router-link :to="{
      path:'/propagate/propagate',
      query:{id:item.id}}">
        <el-button type="success" plain>了解更多</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newest",
  props: {
    item: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgUrl: {
      type: Array,
      required: true
    }
  },
  created() {
    this.description = this.strip(this.description)
  },
  data() {
    return {}
  },
  methods: {
    strip(html) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
  }

}
</script>

<style scoped lang="scss">
.newest-main {
  text-align: center;
  width: 33.333%;
  padding: 1em;
  display: inline-block;

  .newest-block {
    margin-bottom: 0.5em;
  }

  .newest-img {
    height: 0;
    width: 100%;
    padding-bottom: 100%;
    position: relative;

    .newest-img-img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
    }
  }

  .newest-title {
    font-weight: bolder;
    font-size: 1.5em;
  }

  .newest-text {
    height: 3.5em;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 1em;
  }

  .newest-button {

  }
}
</style>
