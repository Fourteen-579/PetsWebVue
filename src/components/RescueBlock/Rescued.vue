<template>
  <div class="rescue-block-main"
       @mouseover="show = true"
       @mouseleave="show = false"
  >
    <div class="rescue-block-main-l">
      <el-image
        class="main-img"
        :src="rescueItem.animal.afterRescuePhoto"
        fit="fit"></el-image>
      <div v-show="!show" class="rescue-block-main-l-des">
        <div class="rescue-block-main-l-name" v-if="rescueItem.animal.name">
          我是{{ rescueItem.animal.name }}
        </div>
        <div class="rescue-block-main-l-name rescue-block-main-l-word">
          谢谢好心人的救助！
        </div>
        <div class="rescue-block-main-l-name rescue-block-main-l-text">
          {{ rescueItem.process }}
        </div>
      </div>
    </div>

    <transition name="el-zoom-in-center">
      <div v-show="show">
        <div class="rescue-block-block rescue-block-img">
          <div class="rescue-block-img-block">
            <el-image
              class="rescue-block-img-img"
              :src="rescueItem.animal.beforRescuePhoto"
              fit="fit"></el-image>
          </div>
          <div class="rescue-block-img-block">
            <svg-icon class="rescue-block-img-svg-svg" icon-class="toRight"/>
          </div>
          <div class="rescue-block-img-block">
            <el-image
              class="rescue-block-img-img"
              :src="rescueItem.animal.afterRescuePhoto"
              fit="fit"></el-image>
          </div>

        </div>
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
                    性别：
                  </div>
                  <div class="rescue-block-animal-info-word">
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
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    发布人:
                  </div>
                  <div class="rescue-block-animal-info-word">
                    {{ rescueItem.findUserName }}
                  </div>
                </div>
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    救助人:
                  </div>
                  <div class="rescue-block-animal-info-word">
                    {{ rescueItem.rescueUserName }}
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
                    }}
                  </div>

                </div>
                <div class="rescue-block-animal-info-text">
                  <div class="rescue-block-label">
                    救助时间：
                  </div>
                  <div class="rescue-block-animal-info-word">
                    {{ $moment(rescueItem.rescueTime).format('YYYY-MM-DD') }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详细信息">
              <div class="rescue-block-block rescue-block-rescue-info">

                <div class="rescue-block-rescue-info-text">
                  <div class="rescue-block-label">
                    救助过程:
                  </div>
                  <div class="rescue-block-rescue-info-word">
                    {{ rescueItem.process }}
                  </div>
                </div>
                <div class="rescue-block-rescue-info-text">
                  <div class="rescue-block-label">
                    现在的情况：
                  </div>
                  <div class="rescue-block-rescue-info-word">
                    {{ rescueItem.afterSituation }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="rescue-block-block rescue-block-button" v-if="rescueItem.animal.status==='TOBEADOPTED'">
            <el-button type="success" plain size="mini" round>我要领养它！</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {pcaa} from 'area-data';

export default {
  name: "Rescued",
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

  width: 20em;
  height: 25em;
  vertical-align: top;
  margin: calc((100% / 3 - 20em) / 2);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
  -5px -5px 15px rgba(0, 0, 0, 0.05);
  display: inline-block;
  position: relative;

  .rescue-block-main-l {
    color: black;
    text-shadow: 1.5px 1.5px 3px white;

    .main-img {
      position: absolute;
      width: 20em;
      height: 25em;
      z-index: -1;

      //-webkit-filter: blur(2px); /* Chrome, Opera */
      //-moz-filter: blur(2px);
      //-ms-filter: blur(2px);
      //filter: blur(2px);
    }

    .rescue-block-main-l-des {
      background-color: rgba(255, 255, 255, 0.70);
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }

    .rescue-block-main-l-name {
      font-size: 1.5em;
    }

    .rescue-block-main-l-word {
      font-size: 1.5em;
    }

    .rescue-block-main-l-text {
      height: 8em;
      width: 100%;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      font-size: 1em;
      margin-top: 1em;
    }

  }


  .rescue-block-main-body {
    background-color: #ffffff;
    border-radius: 1em 1em 0em 0em;
    height: 21em;
    padding-top: 1em;
    color: #3A4525;
    vertical-align: bottom;

    .rescue-block-tabs {


      .rescue-block-label {
        display: inline-flex;
      }

      .rescue-block-block {
        padding: 0 1em 0 1em;

      }

      .rescue-block-animal-info {
        font-size: 1em;
        height: 16em;


        .rescue-block-animal-info-text {
          margin-bottom: 1em;
          position: relative;

          .rescue-block-animal-info-type {
            position: absolute;
            right: 1em;
            top: -2em;

            .rescue-block-animal-info-type-svg {
              width: 3em;
              height: 3em;
            }

          }

          .rescue-block-animal-location {
            display: inline-flex;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .rescue-block-animal-info-word {
            display: inline-flex;
          }

        }


      }

      .rescue-block-rescue-info {
        font-size: 1em;
        height: 16em;

        .rescue-block-rescue-info-text {
          margin-bottom: 0.5em;
          height: 8em;

          .rescue-block-rescue-info-word {
            text-indent: 24px;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }
        }

        .rescue-block-rescue-info-user {
          height: 2.5em;
          margin-right: 2em;
          display: inline-block;
          margin-bottom: 0.5em;
        }
      }
    }

  }

  .rescue-block-img {
    text-align: center;

    .rescue-block-img-block {
      width: 4em;
      height: 4em;
      display: inline-block;
      vertical-align: bottom;

      .rescue-block-img-svg-svg {
        width: 2em;
        height: 4em;
        vertical-align: center;
      }

      .rescue-block-img-img {
        width: 4em;
        height: 4em;
        border-radius: 50%;
        display: inline-block;
      }
    }
  }

  .rescue-block-button {
    height: 2em;
    text-align: center;
    vertical-align: bottom;
  }

}
</style>
