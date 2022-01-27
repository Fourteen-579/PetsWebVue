<template>
  <div class="base-block">
    <div class="block-item base-name base-text">
      <svg-icon v-if="item.isBase === 'YES'" class="base-time-svg" icon-class="start"/>
      {{ item.nickName }}
    </div>
    <div class="block-item base-slogan base-text">
      {{ item.slogan != null && item.slogan != '' ? item.slogan : '该基地暂无口号' }}
    </div>
    <div class="block-item base-describes base-text">
      {{ item.describes != null && item.describes != '' ? item.describes : '该基地暂无描述' }}
    </div>
    <div class="block-item base-nums">
      <div class="base-nums-rescue base-text">
        <svg-icon icon-class="rescue"/>
        已救助动物数量：{{ item.rescueNum }}
      </div>
      <div class="base-nums-adopt base-text">
        <svg-icon icon-class="adopt"/>
        已被领养动物数量：{{ item.adoptNum }}
      </div>
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
        <div v-if="item.address != null && item.address != []" class="base-address-text base-time-text">
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
  created() {
    // console.log(this.item)
  },
  data() {
    return {
      //地区数据
      pcaa: pcaa,
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.base-block {

  width: 15em;
  height: 15em;
  vertical-align: top;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
  -5px -5px 15px rgba(0, 0, 0, 0.05);
  display: inline-block;


  .block-item {
    margin-bottom: 15px;
    margin-left: 5px;
  }

  .base-text {
    font-size: 15px;
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
    font-size: 18px;
  }

  .base-slogan {
    font-weight: lighter;
    font-size: 15px;
  }

  .base-describes {
    height: 5.5em;
    -webkit-line-clamp: 4;
    font-size: 10px;
    color: #8c939d;
  }

  .base-nums {
    font-weight: lighter;
    font-size: 15px;
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
      margin-left: 1px;

      .base-time-text {
        margin-left: 2px;
        font-size: 3px;
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
