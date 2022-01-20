<template>
  <div class="adopt-block-main"
       @mouseover="show = true"
       @mouseleave="show = false"
  >
    <div class="adopt-block-main-l">
      <el-image
        class="main-img"
        :src="adoptItem.animal.beforAdoptPhoto"
        fit="fit"></el-image>
      <div v-show="!show" class="adopt-block-main-l-des">
        <div class="adopt-block-main-l-des-word">
          <div class="adopt-block-main-l-name" v-if="adoptItem.animal.name">
            我是{{ adoptItem.animal.name }}
          </div>
          <div class="adopt-block-main-l-name adopt-block-main-l-text">
            {{ adoptItem.beforSituation }}
          </div>
        </div>
      </div>
    </div>

    <transition name="el-fade-in-linear">
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
                    发布人：
                  </div>
                  <div class="adopt-block-animal-info-word">
                    {{ adoptItem.publisherName }}
                  </div>
                </div>
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-label">
                    所在地：
                  </div>
                  <div class="adopt-block-animal-location">
                    {{
                      pcaa[86][adoptItem.animal.location[0]]
                    }}-
                    {{
                      pcaa[adoptItem.animal.location[0]][adoptItem.animal.location[1]]
                    }}-
                    {{
                      pcaa[adoptItem.animal.location[1]][adoptItem.animal.location[2]]
                    }}
                  </div>

                </div>
                <div class="adopt-block-animal-info-text">
                  <div class="adopt-block-label">
                    发布时间：
                  </div>
                  <div class="adopt-block-animal-info-word">
                    {{ $moment(adoptItem.createTime).format('YYYY-MM-DD') }}
                  </div>
                </div>
                <div class="adopt-block-block adopt-block-button">
                  <el-button type="success" plain size="mini" round>我要领养它！</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详细信息">
              <div class="adopt-block-block adopt-block-adopt-info">
                <div class="adopt-block-adopt-info-text">
                  <div class="adopt-block-label">
                    现在的情况:
                  </div>
                  <div class="adopt-block-adopt-info-word">
                    {{ adoptItem.beforSituation }}
                  </div>
                </div>
                <div class="adopt-block-adopt-info-text">
                  <div class="adopt-block-label">
                    领养要求：
                  </div>
                  <div class="adopt-block-adopt-info-word">
                    {{ adoptItem.requirement }}
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
  name: "ToAdoptedBlock",
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
  //padding: 1em 0em 1em 0em;

  min-width: 20em;
  max-width: 20em;
  height: 12.36em;
  vertical-align: top;
  margin: 1em calc((100% - 20em * 3) / (3 * 2));
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
      height: 12.36em;
      background-color: rgba(0, 0, 0, 0.20);
      text-align: center;
      width: 100%;

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
    width: 20em;
    overflow: hidden;
    color: #3A4525;
    padding-top: 1em;

    .adopt-block-tabs {

      .adopt-block-label {
        display: inline-flex;
      }

      .adopt-block-block {
        padding: 0 1em 0 1em;

      }

      .adopt-block-animal-info {
        font-size: 15px;
        line-height: 17px;
        height: 100%;

        .adopt-block-animal-info-text {
          margin-bottom: 0.5em;
          position: relative;

          .adopt-block-animal-location {
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 0.5em;
          }

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
        font-size: 12px;
        height: 100%;

        .adopt-block-adopt-info-text {
          margin-bottom: 0.5em;
          height: 5.5em;

          .adopt-block-adopt-info-word {
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

  .adopt-block-img {
    text-align: center;

    .adopt-block-img-img {
      width: 4em;
      height: 4em;
      border-radius: 50%;
    }
  }


  .adopt-block-button {
    height: 2em;
    text-align: center;
    vertical-align: bottom;
  }

}

</style>

