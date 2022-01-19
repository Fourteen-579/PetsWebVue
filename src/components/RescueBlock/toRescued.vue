<template>
  <div class="rescue-block-main"
       @mouseover="show = true"
       @mouseleave="show = false"
  >
    <div class="rescue-block-main-l">
      <el-image
        class="main-img"
        :src="rescueItem.animal.beforRescuePhoto"
        fit="fit"></el-image>
      <div v-show="!show" class="rescue-block-main-l-des">
        <div class="rescue-block-main-l-des-word">
          <div class="rescue-block-main-l-name" v-if="rescueItem.animal.name">
            我是{{ rescueItem.animal.name }}
          </div>
          <div class="rescue-block-main-l-name rescue-block-main-l-text">
            {{ rescueItem.findSituation }}
          </div>
        </div>
      </div>
    </div>

    <svg-icon v-if="rescueItem.isEmergency === 'YES'" class="emergency-icon" icon-class="emergency2"/>

    <transition name="el-fade-in-linear">
      <div v-show="show">
        <div class="rescue-block-main-body transition-box">
          <el-tabs type="card" class="rescue-block-tabs">
            <el-tab-pane label="动物信息">
              <div class="rescue-block-block rescue-block-animal-info">
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    昵称：
                  </div>
                  <div class="rescue-block-animal-info-word">
                    {{ rescueItem.animal.name }}
                  </div>
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
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-animal-info-type">
                    <svg-icon class="rescue-block-animal-info-type-svg" v-if="rescueItem.animal.type === 'SNACK'"
                              icon-class="snack">
                      {{
                        typeOptions.find(function (value) {
                          return value.value === rescueItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="rescue-block-animal-info-type-svg" v-if="rescueItem.animal.type === 'HAMSTER'"
                              icon-class="hamster">{{
                        typeOptions.find(function (value) {
                          return value.value === rescueItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="rescue-block-animal-info-type-svg" v-if="rescueItem.animal.type === 'RABBIT'"
                              icon-class="rabbit">
                      {{
                        typeOptions.find(function (value) {
                          return value.value === rescueItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="rescue-block-animal-info-type-svg" v-if="rescueItem.animal.type === 'DOG'"
                              icon-class="dog">{{
                        typeOptions.find(function (value) {
                          return value.value === rescueItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="rescue-block-animal-info-type-svg" v-if="rescueItem.animal.type === 'CAT'"
                              icon-class="cat">{{
                        typeOptions.find(function (value) {
                          return value.value === rescueItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="rescue-block-animal-info-type-svg" v-if="rescueItem.animal.type === 'OTHER'"
                              icon-class="other">
                      {{
                        typeOptions.find(function (value) {
                          return value.value === rescueItem.animal.type;
                        }).label
                      }}
                    </svg-icon>

                  </div>
                </div>
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    发布人：
                  </div>
                  <div class="rescue-block-animal-info-word">
                    {{ rescueItem.findUserName }}
                  </div>
                </div>
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    所在地：
                  </div>
                  <div class="rescue-block-animal-location">
                    {{
                      pcaa[86][rescueItem.animal.location[0]]
                    }}-
                    {{
                      pcaa[rescueItem.animal.location[0]][rescueItem.animal.location[1]]
                    }}-
                    {{
                      pcaa[rescueItem.animal.location[1]][rescueItem.animal.location[2]]
                    }}-
                    {{ rescueItem.findLocation }}
                  </div>

                </div>
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    发布时间：
                  </div>
                  <div class="rescue-block-animal-info-word">
                    {{ $moment(rescueItem.createTime).format('YYYY-MM-DD') }}
                  </div>
                </div>
                <div class="rescue-block-block rescue-block-button">
                  <el-button type="success" plain size="mini" round>我要救助它！</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详细信息">
              <div class="rescue-block-block rescue-block-rescue-info">
                <div class="rescue-block-rescue-info-text">
                  <div class="rescue-block-label">
                    发现时情况:
                  </div>
                  <div class="rescue-block-rescue-info-word">
                    {{ rescueItem.findSituation }}
                  </div>
                </div>
                <div class="rescue-block-rescue-info-text">
                  <div class="rescue-block-label">
                    需要的物品：
                  </div>
                  <div class="rescue-block-rescue-info-word">
                    {{ rescueItem.neededItems }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {pcaa} from 'area-data';

export default {
  name: "ToRescueBlock",
  props: {
    rescueItem: {
      type: Object,
      required: true
    }
  },
  mounted() {

  },
  data() {
    return {
      show: false,
      pcaa: pcaa,
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
  //padding: 1em 0em 1em 0em;

  min-width: 20em;
  max-width: 20em;
  height: 12.36em;
  vertical-align: top;
  margin: 1em calc((100% / 3 - 20em) / 2);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
  -5px -5px 15px rgba(0, 0, 0, 0.05);
  display: inline-block;
  position: relative;

  .rescue-block-main-l {
    color: white;

    .main-img {
      position: absolute;
      width: 20em;
      height: 12.36em;
      z-index: -1;
    }

    .rescue-block-main-l-des {
      height: 12.36em;
      background-color: rgba(0, 0, 0, 0.20);
      text-align: center;
      width: 100%;

      .rescue-block-main-l-des-word {
        padding: 4em 1em 0em 1em;

        .rescue-block-main-l-name {
          font-size: 1.5em;
        }

        .rescue-block-main-l-text {
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          font-size: 1em;
          margin-top: 0.5em;
        }
      }


    }
  }


  .emergency-icon {
    width: 4em;
    height: 4em;
    position: absolute;
    top: -2em;
    right: -1em;
  }

  .rescue-block-main-body {
    background-color: #ffffff;
    height: 12.36em;
    width: 20em;
    overflow: hidden;
    color: #3A4525;
    padding-top: 1em;

    .rescue-block-tabs {

      .rescue-block-label {
        display: inline-flex;
      }

      .rescue-block-block {
        padding: 0 1em 0 1em;

      }

      .rescue-block-animal-info {
        font-size: 15px;
        line-height: 17px;
        height: 100%;

        .rescue-block-animal-info-text {
          margin-bottom: 0.3em;
          position: relative;

          .rescue-block-animal-location {
            height: 34px;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 0.3em;
          }

          .rescue-block-animal-info-type {
            position: absolute;
            right: 1em;
            top: -2em;

            .rescue-block-animal-info-type-svg {
              width: 3em;
              height: 3em;
            }
          }

          .rescue-block-animal-info-word {
            display: inline-flex;
          }
        }


      }

      .rescue-block-rescue-info {
        font-size: 12px;
        height: 100%;

        .rescue-block-rescue-info-text {
          margin-bottom: 0.5em;
          height: 5.5em;

          .rescue-block-rescue-info-word {
            text-indent: 24px;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }

        }
      }
    }

  }

  .rescue-block-img {
    text-align: center;

    .rescue-block-img-img {
      width: 4em;
      height: 4em;
      border-radius: 50%;
      //border: 1px solid white;
    }
  }


  .rescue-block-button {
    height: 2em;
    text-align: center;
    vertical-align: bottom;
  }

}

</style>

<style>
.el-tabs__header {
  margin: 0 0 10px;
}

.el-tabs__item {
  height: 1em;
  line-height: 1em;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
  text-align: center;
  width: 100%;
}

.el-tabs--card > .el-tabs__header {
  border-bottom: none;
}
</style>
