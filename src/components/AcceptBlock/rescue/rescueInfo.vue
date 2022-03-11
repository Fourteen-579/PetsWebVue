<template>
  <div class="rescueInfo-body" v-loading="listLoading">
    <div class="show-info">
      <div class="emergency-item" v-if="form.isEmergency==='YES'">
        <svg-icon icon-class="emergency3"/>
        当前情况为紧急情况，
        <span v-if="form.isApproved==='YES'">
          已经通过审核，请放心救助！
        </span>
        <span v-else>
          暂未通过审核，请仔细辨别信息真伪！
        </span>
      </div>

      <div class="show-info-base">
        <div class="show-info-img">
          <el-image
            class="show-info-img-img"
            fit="cover"
            :src="form.animal.beforRescuePhoto"/>
        </div>
        <div class="show-info-text">
          <div class="show-info-item">
            <div class="show-info-label">
              昵称：
            </div>
            <div class="show-info-desc">
              {{form.animal.name}}
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              种类：
            </div>
            <div class="show-info-desc">
              <svg-icon class="show-info-desc-svg"
                        :icon-class="form.animal.type.toLowerCase()"/>
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              性别：
            </div>
            <div class="show-info-desc">
              <svg-icon :icon-class="form.animal.sex.toLowerCase()"/>
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              年龄：
            </div>
            <div class="show-info-desc">
              {{form.animal.age}}
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              所在地：
            </div>
            <div class="show-info-desc">
              {{
              pcaa[86][form.animal.location[0]]
              }}-
              {{
              pcaa[form.animal.location[0]][form.animal.location[1]]
              }}-
              {{
              pcaa[form.animal.location[1]][form.animal.location[2]]
              }}
            </div>
          </div>
        </div>

      </div>

      <div class="show-info-item">
        <div class="show-info-label">
          发现时情况：
        </div>
        <div class=" show-info-more">
          {{form.findSituation}}
        </div>
      </div>
      <div class="show-info-item">
        <div class="show-info-label">
          描述：
        </div>
        <div class=" show-info-more">
          {{form.describes}}
        </div>
      </div>
      <div class="show-info-item">
        <div class="show-info-label">
          需要的物品：
        </div>
        <div class=" show-info-more">
          {{form.neededItems}}
        </div>
      </div>

      <div class="show-info-button">
        <el-button type="success" @click="commit">确认救助</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateRescue } from '@/api/resuce'
  import { mapGetters } from 'vuex'
  import { pcaa } from 'area-data'

  export default {
    name: 'rescueInfo',
    props: {
      infoId: {
        type: String,
        default: ''
      },
      form: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    data() {
      return {
        pcaa: pcaa,
        listLoading: false,
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
        ],
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
        ]
      }
    },
    methods: {
      //点击确定按钮后
      commit() {
        let commitInfo = {
          id: this.infoId,
          status: 'TALKING',
          rescueUser: this.id
        }
        updateRescue(commitInfo).then((res) => {
          if (res.code === 200) {
            this.$emit('activeChange', 2)
          } else {
            this.$message({
              message: '发生错误，请再次尝试!',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .rescueInfo-body {
    margin: 1em 0;

    .show-info {

      .emergency-item{
        color: #ff0000;
        text-align: center;
      }

      .show-info-base {
        display: inline-block;

        .show-info-text {
          display: inline-block;
          margin: 0 1em;
        }

        .show-info-img {
          box-shadow: 1px 1px 5px #888888;
          display: inline-block;

          .show-info-img-img {
            width: 10em;
            height: 10em;
          }
        }
      }

      .show-info-item {
        margin: 1em 0;

        .show-info-label {
          display: inline-flex;
          font-weight: bolder;
          font-size: 1em;
        }

        .show-info-desc {
          display: inline-flex;
          font-size: 1em;
        }

        .show-info-more {
          text-indent: 3em;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }

      .show-info-button {
        text-align: center;
      }

    }
  }
</style>
