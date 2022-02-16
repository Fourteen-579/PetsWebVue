<template>
  <div>

    <div v-for="item in propagandaList" class="info-item">
      <router-link :to="{
      path:'/propagate/propagate',
      query:{id:item.id}}">
        <div class="info-item-img">
          <el-image
            v-if="item.photos"
            class="info-item-img-img"
            :src="item.photos[0].url"
            fit="cover"></el-image>
        </div>
        <div class="info-item-show">
          <div class="info-item-title">
            {{ item.title }}
          </div>
          <div class="info-item-text">
            {{ item.describes }}
          </div>
          <div class="info-item-other">
          <span class="info-item-other-item">
            <svg-icon icon-class="like" class="info-item-other-item-svg"/>
            <span class="info-item-other-item-text">
              {{ item.user !== null && item.user !== undefined ? item.user.length : 0 }}个喜欢
            </span>
          </span>
            <span class="info-item-other-item">
            <svg-icon icon-class="comment" class="info-item-other-item-svg"/>
            <span class="info-item-other-item-text">
              {{ item.comment !== null && item.comment !== undefined ? item.comment.length : 0 }}条评论
            </span>
          </span>
            <span class="info-item-other-item">
            <svg-icon icon-class="timeCat" class="info-item-other-item-svg"/>
            <span class="info-item-other-item-text">
              {{ $moment(item.updateTime).format('YYYY-MM-DD') }}
            </span>
          </span>
          </div>
        </div>
        <div/>
      </router-link>
    </div>

  </div>

</template>

<script>
export default {
  name: "PropagandaList",
  props: {
    propagandaList: {
      required: true,
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.info-item {
  height: 10em;
  padding: 0.5em 0;
  border-bottom: 1px solid #9a9a9a;
  position: relative;

  .info-item-img {
    display: inline-block;
    width: 20%;

    .info-item-img-img {
      height: 9em;
      width: 9em;
      border-radius: 5px;
    }
  }

  .info-item-show {
    width: 80%;
    height: 9em;
    display: inline-block;
    vertical-align: top;

    .info-item-title {
      font-size: 1.5em;
      line-height: 1.5em;
      height: 1.5em;
      margin-bottom: 0.2em;
    }

    .info-item-text {
      text-indent: 2em;
      margin-bottom: 0.3em;
      font-size: 1em;
      height: 4.8em;
      line-height: 1.2em;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    .info-item-other {
      float: right;
      margin-right: 1em;
      vertical-align: bottom;
      height: 1.2em;
      padding-top: 0.2em;

      .info-item-other-item {
        margin-right: 1em;

        .info-item-other-item-svg {
          width: 1em;
          height: 1em;
        }

        .info-item-other-item-text {

        }
      }
    }
  }
}
</style>
