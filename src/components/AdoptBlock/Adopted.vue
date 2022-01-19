<template>
  <div class="adopt-block-main"
       @mouseover="show = true"
       @mouseleave="show = false"
  >
    <div class="adopt-block-main-l">
      <el-image
        class="main-img"
        :src="adoptItem.animal.afterAdoptPhoto"
        fit="fit"></el-image>
      <div v-show="!show" class="adopt-block-main-l-des">
        <div class="adopt-block-main-l-des-word">
          <div class="adopt-block-main-l-name" v-if="adoptItem.animal.name">
            我是{{ adoptItem.animal.name }}
          </div>
          <div class="adopt-block-main-l-name adopt-block-main-l-text">
            {{ adoptItem.process }}
          </div>
        </div>

      </div>
    </div>

    <transition name="el-zoom-in-center">
      <div v-show="show">
        <div class="adopt-block-main-body transition-box">
          <el-tabs type="card" class="adopt-block-tabs">
            <el-tab-pane label="动物信息">
              <div class="adopt-block-block adopt-block-animal-info">
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-label">
                    昵称：
                  </div>
                  <div class="adopt-block-animal-info-word">
                    {{ adoptItem.animal.name }}
                  </div>
                  <svg-icon v-if="adoptItem.animal.sex === 'WOMAN'" icon-class="woman">{{
                      sexOptions.find(function (value) {
                        return value.value === adoptItem.animal.sex;
                      }).label
                    }}
                  </svg-icon>
                  <svg-icon v-if="adoptItem.animal.sex === 'MAN'" icon-class="man">{{
                      sexOptions.find(function (value) {
                        return value.value === adoptItem.animal.sex;
                      }).label
                    }}
                  </svg-icon>
                </div>
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-animal-info-type">
                    <svg-icon class="adopt-block-animal-info-type-svg" v-if="adoptItem.animal.type === 'SNACK'"
                              icon-class="snack">
                      {{
                        typeOptions.find(function (value) {
                          return value.value === adoptItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="adopt-block-animal-info-type-svg" v-if="adoptItem.animal.type === 'HAMSTER'"
                              icon-class="hamster">{{
                        typeOptions.find(function (value) {
                          return value.value === adoptItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="adopt-block-animal-info-type-svg" v-if="adoptItem.animal.type === 'RABBIT'"
                              icon-class="rabbit">
                      {{
                        typeOptions.find(function (value) {
                          return value.value === adoptItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="adopt-block-animal-info-type-svg" v-if="adoptItem.animal.type === 'DOG'"
                              icon-class="dog">{{
                        typeOptions.find(function (value) {
                          return value.value === adoptItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="adopt-block-animal-info-type-svg" v-if="adoptItem.animal.type === 'CAT'"
                              icon-class="cat">{{
                        typeOptions.find(function (value) {
                          return value.value === adoptItem.animal.type;
                        }).label
                      }}
                    </svg-icon>
                    <svg-icon class="adopt-block-animal-info-type-svg" v-if="adoptItem.animal.type === 'OTHER'"
                              icon-class="other">
                      {{
                        typeOptions.find(function (value) {
                          return value.value === adoptItem.animal.type;
                        }).label
                      }}
                    </svg-icon>

                  </div>
                </div>
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-label">
                    发布人:
                  </div>
                  <div class="adopt-block-animal-info-word">
                    {{ adoptItem.publisherName }}
                  </div>
                </div>
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-label">
                    领养人:
                  </div>
                  <div class="adopt-block-animal-info-word">
                    {{ adoptItem.adoptUserName }}
                  </div>
                </div>
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-label">
                    领养时间：
                  </div>
                  <div class="adopt-block-animal-info-word">
                    {{ $moment(adoptItem.adoptTime).format('YYYY-MM-DD') }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详细信息">
              <div class="adopt-block-block adopt-block-adopt-info">

                <div class="adopt-block-adopt-info-text">
                  <div class="adopt-block-label">
                    领养过程:
                  </div>
                  <div class="adopt-block-adopt-info-word">
                    {{ adoptItem.process }}
                  </div>
                </div>
                <div class="adopt-block-adopt-info-text">
                  <div class="adopt-block-label">
                    现在的情况：
                  </div>
                  <div class="adopt-block-adopt-info-word">
                    {{ adoptItem.afterSituation }}
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
  name: "AdoptedBlock",
  props: {
    adoptItem: {
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
.adopt-block-main {

  width: 20em;
  height: 12.36em;
  vertical-align: top;
  margin: calc((100% / 3 - 20em) / 2);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05),
  -5px -5px 15px rgba(0, 0, 0, 0.05);
  display: inline-block;
  position: relative;

  .adopt-block-main-l {
    color: white;

    .main-img {
      position: absolute;
      width: 20em;
      height: 12.36em;
      z-index: -1;
    }

    .adopt-block-main-l-des {
      background-color: rgba(0, 0, 0, 0.20);
      text-align: center;
      width: 100%;
      height: 12.36em;

      .adopt-block-main-l-des-word {

        padding: 4em 1em 0em 1em;

        .adopt-block-main-l-name {
          font-size: 1.5em;
        }

        .adopt-block-main-l-text {
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


  .adopt-block-main-body {
    background-color: #ffffff;
    height: 12.36em;
    padding-top: 1em;
    color: #3A4525;
    vertical-align: bottom;

    .adopt-block-tabs {


      .adopt-block-label {
        display: inline-flex;
      }

      .adopt-block-block {
        padding: 0 1em 0 1em;

      }

      .adopt-block-animal-info {
        font-size: 1em;
        height: 100%;

        .adopt-block-animal-info-text {
          margin-bottom: 1em;
          position: relative;

          .adopt-block-animal-info-type {
            position: absolute;
            right: 1em;
            top: -2em;

            .adopt-block-animal-info-type-svg {
              width: 3em;
              height: 3em;
            }

          }

          .adopt-block-animal-info-word {
            display: inline-flex;
          }

        }

      }

      .adopt-block-adopt-info {
        font-size: 0.8em;
        height: 100%;
        overflow-y: visible;

        .adopt-block-adopt-info-text {
          margin-bottom: 0.1em;
          height: 5em;

          .adopt-block-adopt-info-word {
            text-indent: 2em;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }

  }

  .adopt-block-button {
    position: absolute;
    right: 1em;
    bottom: 0.5em;
    z-index: 100;

    .adopt-block-button-svg {
      width: 3em;
      height: 3em;
    }

  }

}
</style>
