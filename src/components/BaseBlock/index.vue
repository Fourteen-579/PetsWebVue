<template>
  <div class="base-block">
    <div class="block-item base-title">
      {{ item.title }}
    </div>
    <div class="block-item base-text">
      {{ item.describes }}
    </div>
    <div class="block-item base-label">
      <el-tag
        class="base-label-item"
        v-for="id in item.label"
        :key="id"
        type="success">
        {{
          labelOption.find(function (value) {
            return value.id == id;
          }).value
        }}
      </el-tag>
    </div>
    <div class="block-item base-time-location">
      <div class="base-time">
        <svg-icon class="base-time-svg" icon-class="timeCat"/>
        <div class="base-time-text">
          {{ $moment(item.collectionTime).format('YYYY-MM-DD') }}
        </div>
      </div>
      <div class="base-location base-time">
        <svg-icon class="base-location-svg" icon-class="location"/>
        <div class="base-location-text base-time-text">
          {{
            pcaa[86][item.location[0]]
          }}-
          {{
            pcaa[item.location[0]][item.location[1]]
          }}-
          {{
            pcaa[item.location[1]][item.location[2]]
          }}
        </div>

      </div>
    </div>
    <div class="block-item base-botton">
      <el-button size="mini" round>{{ item.type != 'DONATE' ? '我需要它！' : '我要捐赠！' }}</el-button>
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';

export default {
  name: 'BaseBlock',
  props: {
    item: {
      type: Object,
      required: true
    },
    labelOption: {
      type: Array,
      required: true
    }
  },
  created() {

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
  width: 15em;
  height: 12em;
  vertical-align: top;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #B8E4A5FF;
  display: inline-block;

  .block-item {
    margin-bottom: 15px;
    margin-left: 5px;
  }

  .base-title {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 10px;
    font-weight: bolder;
  }

  .base-text {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 10px;
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
        font-size: 5px;
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
