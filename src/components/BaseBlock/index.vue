<template>
  <div class="base-block">
    <div class="block-item base-name base-text">
      <svg-icon v-if="item.isBase === 'YES'" class="base-time-svg" icon-class="start"/>
      {{ item.nickName }}
    </div>
    <div class="block-item base-slogan base-text">
      {{ item.slogan }}
    </div>
    <div class="block-item base-describes base-text">
      {{ item.describes }}
    </div>
    <div class="block-item base-time-location">
      <div class="base-time">
        <svg-icon class="base-time-svg" icon-class="timeCat"/>
        <div class="base-time-text">
          {{ $moment(item.baseCreateTime).format('YYYY-MM-DD') }}
        </div>
      </div>
      <div class="base-location base-time">
        <svg-icon class="base-location-svg" icon-class="location"/>
        <div class="base-address-text base-time-text">
          {{
            pcaa[86][item.address[0]]
          }}-
          {{
            pcaa[item.address[0]][item.address[1]]
          }}-
          {{
            pcaa[item.address[1]][item.address[2]]
          }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';

export default {
  name: "BaseBlock",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //地区数据
      pcaa: pcaa
    }
  }
}
</script>

<style scoped lang="scss">
.base-block {
  font-size: 15px;
  width: 15em;
  height: 9em;
  vertical-align: top;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #B8E4A5FF;
  display: inline-block;


  .block-item {
    margin-bottom: 15px;
    margin-left: 5px;
  }

  .base-text {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-top: 10px;
  }

  .base-name {
    font-weight: bolder;
  }

  .base-slogan {
  }

  .base-describes {
    -webkit-line-clamp: 2;
    font-size: 10px;
    color: #8c939d;
  }

  .base-time-location {
    display: inline-flex;

    .base-time-svg {
      width: 15px;
      height: 15px;
    }

    .base-location-svg {
      width: 15px;
      height: 15px;
    }

    .base-time {
      display: inline-flex;
      margin-left: 2px;

      .base-time-text {
        margin-left: 2px;
        font-size: 4px;
        color: #8c939d;
        vertical-align: top;
        line-height: 15px;
      }
    }
  }

  .base-label {
    .base-label-item {
      margin-right: 10px;
    }
  }

  .base-botton {
    text-align: center;
  }
}
</style>
