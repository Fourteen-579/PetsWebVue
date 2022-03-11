<template>
  <div class="resourceInfo-body" v-loading="listLoading">
    <div class="show-info">
      <div class="show-info-img" v-for="item in form.photos">
        <el-image
          class="show-info-img-img"
          fit="cover"
          :src="item.url"/>
      </div>

      <div class="show-info-base">
        <div class="show-info-text">
          <div class="show-info-item">
            <div class="show-info-label">
              标题：
            </div>
            <div class="show-info-desc">
              {{form.title}}
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              对接类型：
            </div>
            <div class="show-info-desc">
              <el-tag>{{
                typeOption.find(function (value) {
                return value.value === form.type
                }).label
                }}
              </el-tag>
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              物资类别：
            </div>
            <div class="show-info-desc">
              <el-tag>
                {{
                materialOptions.find(function (value) {
                return value.value === form.materialCategory
                }).label
                }}
              </el-tag>
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              金额|数量：
            </div>
            <div class="show-info-desc">
              {{form.amount}}
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              标签：
            </div>
            <div class="show-info-desc">
              <el-tag
                class="resource-label-item"
                v-for="id in form.label"
                :key="id"
                type="success">
                {{
                labelOption.find(function (value) {
                return value.id == id
                }).value
                }}
              </el-tag>
            </div>
          </div>
          <div class="show-info-item">
            <div class="show-info-label">
              地点：
            </div>
            <div class="show-info-desc">
              {{
              pcaa[86][form.location[0]]
              }}-
              {{
              pcaa[form.location[0]][form.location[1]]
              }}-
              {{
              pcaa[form.location[1]][form.location[2]]
              }}
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
        </div>
      </div>
      <div class="show-info-button">
        <el-button type="success" @click="commit">确认对接</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateResource } from '@/api/resource'
  import { mapGetters } from 'vuex'
  import { pcaa } from 'area-data'
  import { getLabelList } from '@/api/label'

  export default {
    name: 'resourceInfo',
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
        // 资源对接类型选择
        typeOption: [
          {
            value: 'DONATE',
            label: '捐献'
          },
          {
            value: 'DEMAND',
            label: '需求'
          }
        ],
        materialOptions: [
          {
            value: 'MONEY',
            label: '金钱'
          },
          {
            value: 'FOOD',
            label: '粮食'
          },
          {
            value: 'WARM',
            label: '保暖物品'
          },
          {
            value: 'OTHER',
            label: '其他'
          }
        ],
        labelOption: []
      }
    },
    created() {
      var search = {
        page: 1,
        pageSize: 999
      }
      this.getLabelOptions(search)
    },
    methods: {
      getLabelOptions(search) {
        getLabelList(search).then(response => {
          this.labelOption = response.data.records
        })
      },
      //点击确定按钮后
      commit() {
        let commitInfo = {
          id: this.infoId,
          status: 'TALKING'
        }
        if (this.form.givee) {
          commitInfo.donor = this.id
        } else {
          commitInfo.givee = this.id
        }
        updateResource(commitInfo).then((res) => {
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
  .resourceInfo-body {
    margin: 1em 0;

    .show-info {

      .show-info-img {
        float: right;

        .show-info-img-img {
          width: 10em;
          height: 10em;
        }

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
