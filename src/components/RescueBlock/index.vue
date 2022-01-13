<template>
  <div class="rescue-block-main">
    <div class="rescue-block-block rescue-block-img">
      <el-image
        style="width: 100px; height: 50px"
        :src="rescueItem.animal.beforRescuePhoto"
        fit="fit"></el-image>
    </div>
    <div class="rescue-block-block rescue-block-animal-info">
      <div class="">
        昵称：{{ rescueItem.animal.name }}
      </div>
      <div class="">
        种类：
        <svg-icon style="width: 15px;height: 15px" v-if="rescueItem.animal.type === 'SNACK'" icon-class="snack">{{
            typeOptions.find(function (value) {
              return value.value === rescueItem.animal.type;
            }).label
          }}
        </svg-icon>
        <svg-icon style="width: 15px;height: 15px" v-if="rescueItem.animal.type === 'HAMSTER'" icon-class="hamster">{{
            typeOptions.find(function (value) {
              return value.value === rescueItem.animal.type;
            }).label
          }}
        </svg-icon>
        <svg-icon style="width: 15px;height: 15px" v-if="rescueItem.animal.type === 'RABBIT'" icon-class="rabbit">{{
            typeOptions.find(function (value) {
              return value.value === rescueItem.animal.type;
            }).label
          }}
        </svg-icon>
        <svg-icon style="width: 15px;height: 15px" v-if="rescueItem.animal.type === 'DOG'" icon-class="dog">{{
            typeOptions.find(function (value) {
              return value.value === rescueItem.animal.type;
            }).label
          }}
        </svg-icon>
        <svg-icon style="width: 15px;height: 15px" v-if="rescueItem.animal.type === 'CAT'" icon-class="cat">{{
            typeOptions.find(function (value) {
              return value.value === rescueItem.animal.type;
            }).label
          }}
        </svg-icon>
        <svg-icon style="width: 15px;height: 15px" v-if="rescueItem.animal.type === 'OTHER'" icon-class="other">{{
            typeOptions.find(function (value) {
              return value.value === rescueItem.animal.type;
            }).label
          }}
        </svg-icon>
      </div>
      <div class="">
        性别：
        <svg-icon v-if="rescueItem.animal.sex === 'WOMAN'" icon-class="woman">{{
            sexOptions.find(function (value) {
              return value.value === rescueItem.animal.sex;
            }).label
          }}
        </svg-icon>
        <svg-icon v-if="rescueItem.animal.sex === 'MAN'" icon-class="man">{{
            sexOptions.find(function (value) {
              return value.value === rescueItem.animal.sex;
            }).label
          }}
        </svg-icon>
      </div>

    </div>
    <div class="rescue-block-block rescue-block-rescue-info">
      <div class="">
        {{ rescueItem.findLocation }}
      </div>
      <div class="">
        {{ rescueItem.findSituation }}
      </div>
      <div class="">
        {{ rescueItem.neededItems }}
      </div>
    </div>
    <div class="rescue-block-block rescue-block-button">
      <el-button type="success" plain size="mini" round>我要救助它！</el-button>
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';

export default {
  name: "RescueBlock",
  props: {
    rescueItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 动物种类选择
      typeOptions: [
        {
          value: 'CAT',
          label: '猫咪'
        },
        {
          value: 'DOG',
          label: '狗子'
        },
        {
          value: 'RABBIT',
          label: '兔子'
        },
        {
          value: 'HAMSTER',
          label: '仓鼠'
        },
        {
          value: 'SNAKE',
          label: '蛇'
        },
        {
          value: 'OTHER',
          label: '其他'
        }
      ],
      //性别选择
      sexOptions: [
        {
          value: 'MAN',
          label: '♂'
        },
        {
          value: 'WOMAN',
          label: '♀'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.rescue-block-main {
  width: 15em;
  height: 20em;
  vertical-align: top;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #B8E4A5FF;
  display: inline-block;

  .rescue-block-block {
    text-align: center;
  }

  .rescue-block-animal-info{
    font-size: 15px;
  }
}

</style>
