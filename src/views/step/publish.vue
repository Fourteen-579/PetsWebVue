<template>
  <div class="main-body" v-loading="listLoading">
    <el-steps :active="active" finish-status="success" process-status="process">
      <el-step title="步骤 1" description="认证身份"></el-step>
      <el-step title="步骤 2" description="上传详细信息"></el-step>
      <el-step title="步骤 3" description="等待对接人"></el-step>
      <el-step title="步骤 4" description="上传过程"></el-step>
      <el-step title="步骤 5" description="完成"></el-step>
    </el-steps>
    <div class="main-body-show">
      <div v-if="active===1">
        <div v-if="type==='rescue'">
          <rescue-info :info-id="infoId"/>
        </div>
        <div v-else-if="type==='adopt'">

        </div>
        <div v-else-if="type==='resource'">

        </div>
      </div>
      <div v-else-if="active===2" class="main-body-step-2">
        <div v-if="acceptInfo" class="main-body-step-2-talk">
          <div class="main-body-step-2-text">
            恭喜找到对接人！<br/>
            对接人：{{ acceptInfo.nickName }}({{ acceptInfo.realName }})<br/>
            联系方式：{{ acceptInfo.phoneNumber }}<br/>
            请等待对接人联系或者您主动联系！<br/>
          </div>
          <div class="main-body-step-2-button-two">
            <div class="main-body-step-2-button">
              <el-button plain type="success">对接完成</el-button>
            </div>
            <div class="main-body-step-2-button" title="请慎重选择哦~">
              <el-button plain>放弃这次对接</el-button>
            </div>
          </div>
        </div>
        <div v-else class="main-body-step-2-wait">
          <svg-icon icon-class="wait" class="main-body-step-2-svg"/>
          <div class="main-body-step-2-text">
            你的信息已经审核通过啦,请等待对接人!
          </div>
          <div class="main-body-step-2-button" title="请慎重选择哦~">
            <el-button plain>重新提交信息</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {queryRescueById} from "@/api/resuce";
import {queryById} from "@/api/user"
import rescueInfo from "@/components/Form/rescue/rescueInfo";
import rescueProcess from "@/components/Form/rescue/rescueProcess";
import adoptInfo from "@/components/Form/adopt/adoptInfo";
import adoptProcess from "@/components/Form/adopt/adoptProcess";
import resourceInfo from "@/components/Form/resource/resourceInfo";
import resourceProcess from "@/components/Form/resource/resourceProcess";


export default {
  name: "publish",
  components: {
    rescueInfo,
    rescueProcess,
    adoptInfo,
    adoptProcess,
    resourceInfo,
    resourceProcess
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  async created() {
    await this.fetchData(this.id)
    this.type = this.$route.query.typeStr
    this.infoId = this.$route.query.infoId
    if (this.infoId !== null && this.infoId !== undefined && this.infoId != '=') {
      await this.getInfoById(this.infoId)
    }
  },
  mounted() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
  },
  data() {
    return {
      //当前进行到哪一步
      active: 0,
      //选择的信息id
      infoId: '',
      //获取的信息
      info: null,
      //选择的信息类型
      type: '',
      //页面加载变量
      listLoading: false,
      //当前用户信息
      userInfo: null,
      //对接用户信息
      acceptInfo: null,
    }
  },
  methods: {
    // 获取用户数据
    fetchData(param) {
      this.listLoading = true
      return queryById(param).then(response => {
        this.userInfo = response.data
        if (this.userInfo.isAuth === 'YES') {
          this.active = 1
        } else {
          this.$message({
            message: '请先认证!',
            type: 'error'
          });
          this.$router.push({
            path: '/auth/auth'
          })
        }
      }).finally((response) => {
        this.listLoading = false
      })
    },
    // 获取用户数据
    getAcceptUserInfo(param) {
      this.listLoading = true
      return queryById(param).then(response => {
        this.acceptInfo = response.data
      }).finally((response) => {
        this.listLoading = false
      })
    },
    //如果有infoId则获取对应信息
    getInfoById(param) {
      this.listLoading = true
      queryRescueById(param).then(response => {
        if (response.code == 200) {
          this.info = response.data
          if (this.info.status === 'UNCOMMIT' || this.info.status === 'UNAPPROVED') {
            this.active = 1
          } else if (this.info.status === 'WAITING' || this.info.status === 'TALKING') {
            this.active = 2
            //获取是否有对接人 如果有则获取对方联系方式
            if (this.info.rescueUser) {
              this.getAcceptUserInfo(this.info.rescueUser)
            }
          } else if (this.info.status === 'UPLOAD') {
            this.active = 3
          } else {
            this.active = 4
          }
          console.log(this.active)
        } else {
          this.$message.error('获取失败');
        }
        this.listLoading = false
      })
    },
  },
  destroyed() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.main-body {
  background-color: white;
  padding: 1em 3em;
  min-height: calc(100vh - 50px);
  margin-bottom: 5px;

  .main-body-show {
    .main-body-step-2 {
      .main-body-step-2-talk {
        .main-body-step-2-text {
          margin: 1em;
          text-align: center;
          font-size: 1em;
          font-weight: bolder;
          line-height: 1.5em;
        }

        .main-body-step-2-button-two {
          display: block;
          text-align: center;

          .main-body-step-2-button {
            display: inline-block;
            margin: 1em 2em;
          }
        }
      }

      .main-body-step-2-wait {
        margin-bottom: 5px;
        width: 100%;
        position: relative;
        text-align: center;
        font-size: 2em;
        vertical-align: center;

        .main-body-step-2-text {
          position: relative;
        }

        .main-body-step-2-svg {
          width: 4em;
          height: 4em;
          display: block;
          margin: 0 calc(50% - 2em);
          padding: 1em 0;
        }

        .main-body-step-2-button {
          margin-top: 1em;
        }
      }

    }
  }
}
</style>
