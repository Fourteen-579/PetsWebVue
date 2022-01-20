<template>
  <div class="resource-block">
    <div class="block-item resource-title">
      {{ item.title }}
    </div>
    <div class="block-item resource-text">
      {{ item.describes != null && item.describes != '' ? item.describes : '该资源对接暂无描述' }}
    </div>
    <div class="block-item resource-label">
      <el-tag
        class="resource-label-item"
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
    <div class="block-item resource-time-location">
      <div class="resource-time">
        <svg-icon class="resource-time-svg" icon-class="timeCat"/>
        <div class="resource-time-text">
          {{ $moment(item.collectionTime).format('YYYY-MM-DD') }}
        </div>
      </div>
      <div class="resource-location resource-time">
        <svg-icon class="resource-location-svg" icon-class="location"/>
        <div class="resource-location-text resource-time-text">
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
    <div class="block-item resource-botton">
      <el-button type="success" plain size="mini" round>{{ item.type != 'DONATE' ? '我需要它！' : '我要捐赠！' }}</el-button>
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';

export default {
  name: 'RescourceBlock',
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
.resource-block {
  width: 16.1em;
  height: 11em;
  vertical-align: top;
  margin: 0.5em calc((100% - 16.1em * 4) / (4 * 2));
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
  -5px -5px 15px rgba(0, 0, 0, 0.05);
  display: inline-block;

  .block-item {
    margin-bottom: 0.5em;
    margin-left: 5px;
  }

  .resource-title {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 10px;
    font-weight: bolder;
    font-size: 18px;
  }

  .resource-text {
    height: 1em;
    line-height: 1em;
    font-weight: lighter;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin-top: 10px;
  }

  .resource-time-location {
    display: inline-flex;
    height: 30px;

    .resource-time-svg {
      width: 15px;
      height: 15px;
    }

    .resource-location-svg {
      width: 15px;
      height: 15px;
    }

    .resource-time {
      display: inline-flex;
      margin-left: 2px;

      .resource-time-text {
        margin-left: 2px;
        font-size: 5px;
        color: #8c939d;
        vertical-align: top;
        line-height: 15px;
      }
    }
  }

  .resource-label {
    .resource-label-item {
      margin-right: 10px;
    }
  }

  .resource-botton {
    text-align: center;
  }
}
</style>
