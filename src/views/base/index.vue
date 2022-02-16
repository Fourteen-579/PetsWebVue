<template>
  <div class="base-body" v-loading="listLoading">
    <div class="base-body-background">
      <el-image
        class="base-body-background-img"
        :src="backgroundPicUrl"
        fit="cover"></el-image>
    </div>
    <div class="base-info">
      <div class="base-info-img">
        <el-image
          v-if="baseInfo.photo"
          class="base-info-img-img"
          :src="baseInfo.photo"
          fit="cover"></el-image>
      </div>
      <div class="base-info-describe">
        <div class="base-info-describe-name">
          {{ baseInfo.nickName }}

        </div>
        <div
          style="background-color: #224842;
                color: #F7895D"
          class="base-info-describe-isAuth"
          v-if="baseInfo.isStartBase === 'YES'">
          <svg-icon icon-class="start"/>
          <span class="base-info-describe-isAuth-word">
              明星基地
            </span>
        </div>
        <div class="base-info-describe-isAuth">
          <svg-icon icon-class="auth" class="base-info-describe-isAuth-svg" v-if="baseInfo.isAuth === 'YES'"/>
          <span v-if="baseInfo.isAuth === 'YES'" class="base-info-describe-isAuth-word">
              该基地已通过认证
            </span>
          <span v-if="baseInfo.isAuth === 'WAIT'" class="base-info-describe-isAuth-word">
              该基地正在申请认证
            </span>
          <span v-if="baseInfo.isAuth === 'NO'||baseInfo.isAuth === 'NULL'" class="base-info-describe-isAuth-word">
              该基地暂无认证
            </span>
        </div>
        <div class="base-info-describe-slogan">
          {{ baseInfo.slogan }}
        </div>
      </div>
    </div>
    <div class="base-propaganda">
      <el-tabs
        style="line-height: 2em"
        v-model="activeName"
        :before-leave="changTab">
        <el-tab-pane label="基本信息" name="base">
          <div class="base-propaganda-info">
            <div class="base-propaganda-info-label">
              所在地：
            </div>
            <div class="base-propaganda-info-text" v-if="baseInfo.address != null && baseInfo.address != []">
              {{
                pcaa[86][baseInfo.address[0]]
              }}-
              {{
                pcaa[baseInfo.address[0]][baseInfo.address[1]]
              }}-
              {{
                pcaa[baseInfo.address[1]][baseInfo.address[2]]
              }}
            </div>
          </div>
          <div class="base-propaganda-info">
            <div class="base-propaganda-info-label">
              基地建立时间：
            </div>
            <div class="base-propaganda-info-text">
              {{ $moment(baseInfo.baseCreateTime).format('YYYY-MM-DD') }}
            </div>
          </div>
          <div class="base-propaganda-info">
            <div class="base-propaganda-info-label">
              联系邮箱：
            </div>
            <div class="base-propaganda-info-text">
              {{ baseInfo.email }}
            </div>
          </div>
          <div class="base-propaganda-info">
            <div class="base-propaganda-info-label">
              帮助过的动物数量：
            </div>
            <div class="base-propaganda-info-text">
              {{ baseInfo.adoptNum + baseInfo.rescueNum }}
            </div>
          </div>
          <div class="base-propaganda-info">
            <div class="base-propaganda-info-label">
              基地描述：
            </div>
            <div class="base-propaganda-info-text base-propaganda-info-describe">
              {{ baseInfo.describes }}
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="参与的救助" name="rescue">
          <PropagandaList :propaganda-list="basePropaganda"/>
        </el-tab-pane>
        <el-tab-pane label="参与的领养" name="adopt">
          <PropagandaList :propaganda-list="basePropaganda"/>
        </el-tab-pane>
        <el-tab-pane label="参与的资源对接" name="resource">
          <PropagandaList :propaganda-list="basePropaganda"/>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        v-if="activeName !== 'base'"
        class="page-component"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="param.page"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import {pcaa} from 'area-data';
import {getPropagandaList} from "@/api/propaganda"
import {queryById} from '@/api/user'
import Title from "@/components/Title/index"
import PropagandaList from "@/components/PropagandaList/index"

export default {
  name: "index",
  components: {
    Title,
    PropagandaList
  },
  mounted() {
    window.Vue = this
  },
  created() {
    this.baseId = this.$route.query.id
    if (this.baseId !== undefined && this.baseId !== null && this.baseId !== '') {
      this.param = {
        participantId: this.baseId,
        status: 'PUBLISHED',
        associationType: 'RESCUE',
        page: 1,
        pageSize: 10
      }
      this.getBasePropaganda(this.param)
      this.getBaseInfo(this.baseId)
    } else {
      this.$message.error('参数错误');
      this.$router.push({path: '/'})
    }
  },
  data() {
    return {
      //地区数据
      pcaa: pcaa,
      backgroundPicUrl: this.$store.state.settings.url + 'img/2.jpeg',
      activeName: 'base',
      //查询基地宣传信息参数
      param: {
        participantId: this.baseId,
        status: 'PUBLISHED',
        associationType: 'RESCUE',
        page: 1,
        pageSize: 10
      },
      listLoading: false,
      //基地id
      baseId: null,
      //基地信息
      baseInfo: null,
      //基地宣传信息
      basePropaganda: [],
      //基地宣传信息总数
      total: 0,
    }
  },
  methods: {
    //将富文本转化为普通文字
    strip(html) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    },
    // 获取基地数据
    getBaseInfo(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.baseInfo = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    //获取基地宣传信息
    getBasePropaganda(param) {
      this.listLoading = true
      let _that = this
      getPropagandaList(param).then(response => {
        _that.basePropaganda = response.data.records
        _that.total = response.data.total
        for (let i = 0; i < _that.basePropaganda.length; i++) {
          _that.basePropaganda[i].describes = _that.strip(_that.basePropaganda[i].describes)
        }
      }).finally(() => {
        _that.listLoading = false
      })
    },
    //修改tab之前
    changTab(active) {
      this.param.page = 1
      if (active === 'rescue') {
        this.param.associationType = 'RESCUE'
        this.getBasePropaganda(this.param)
      } else if (active === 'adopt') {
        this.param.associationType = 'ADOPT'
        this.getBasePropaganda(this.param)
      } else if (active === 'resource') {
        this.param.associationType = 'RESOURCE'
        this.getBasePropaganda(this.param)
      }
    },
    // 分页组件选页改变时调用函数
    currentChange(newPage) {
      this.param.page = newPage
      this.getBasePropaganda(this.param)
    }
  },
}
</script>

<style scoped lang="scss">
.base-body {
  width: 100%;
  position: relative;
  background: white;
  min-height: calc(100vh - 50px);

  .base-body-background {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 10em;

    .base-body-background-img {
      width: 100vw;
      height: 10em;
    }
  }

  .base-info {
    width: 25%;
    display: inline-block;
    vertical-align: top;

    .base-info-img {
      .base-info-img-img {
        border-radius: 50%;
        border: 1px solid #e3e6ec;
      }
    }

    .base-info-describe {
      line-height: 2em;

      .base-info-describe-name {
        font-size: 1.2em;

        font-weight: bolder;
      }

      .base-info-describe-isAuth {
        margin: 0.2em 0.2em 0 0;
        font-size: 0.9em;
        border-radius: 0.2em;
        padding: 0 0.2em;
        background-color: #355C5E;
        color: #EB8A34;
        display: table;

        .base-info-describe-isAuth-svg {

        }

        .base-info-describe-isAuth-word {

        }
      }

      .base-info-describe-slogan {
        font-size: 1em;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .base-propaganda {
    width: 75%;
    padding: 10em 1em 0 1em;
    display: inline-block;
    vertical-align: top;

    .base-propaganda-info {
      font-size: 1em;

      .base-propaganda-info-label {
        display: inline-block;
      }

      .base-propaganda-info-text {
        display: inline-block;
      }

      .base-propaganda-info-describe {
        text-indent: 2em;
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
</style>
