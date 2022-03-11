<template>
  <div class="main-body" v-loading="listLoading">
    <el-steps :active="active" finish-status="success" process-status="process">
      <el-step title="步骤 1" description="认证身份"></el-step>
      <el-step title="步骤 2" description="查看详细信息"></el-step>
      <el-step title="步骤 3" description="双方沟通"></el-step>
      <el-step title="步骤 4" description="上传过程"></el-step>
      <el-step title="步骤 5" description="完成"></el-step>
    </el-steps>
    <div class="main-body-show">
      <div v-if="active===1">
        <div v-if="type==='rescue'">
          <rescue-info :info-id="infoId" :form="info" v-on:activeChange="activeChange($event)"/>
        </div>
        <div v-else-if="type==='adopt'">
          <adopt-info :info-id="infoId" :form="info" v-on:activeChange="activeChange($event)"/>
        </div>
        <div v-else-if="type==='resource'">
          <resource-info :info-id="infoId" :form="info" v-on:activeChange="activeChange($event)"/>
        </div>
      </div>
      <div v-else-if="active===2" class="main-body-step-2">
        <div class="main-body-step-2-talk">
          <div class="main-body-step-2-text">
            感谢您进行这次帮助！<br/>
            发布人：{{ acceptInfo.nickName }}({{ acceptInfo.realName }})<br/>
            联系方式：{{ acceptInfo.phoneNumber }}<br/>
            请您主动联系或者等待发布人联系！<br/>
          </div>
          <div class="main-body-step-2-button-two">
            <div class="main-body-step-2-button">
              <el-button plain type="success" @click="changeStatus('UPLOAD',1)">对接完成</el-button>
            </div>
            <div class="main-body-step-2-button" title="请慎重选择哦~">
              <el-button plain @click="changeStatus('WAITING',0)">放弃这次对接</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="active===3">
        <div v-if="type==='rescue'">
          <rescue-process :info-id="infoId" :active="active" v-on:activeChange="activeChange($event)"/>
        </div>
        <div v-else-if="type==='adopt'">
          <adopt-process :info-id="infoId" :active="active" v-on:activeChange="activeChange($event)"/>
        </div>
        <div v-else-if="type==='resource'">
          <resource-process :info-id="infoId" :active="active" v-on:activeChange="activeChange($event)"/>
        </div>
      </div>
      <div v-else-if="active===4" class="main-body-step-4">
        <svg-icon icon-class="finsh" class="main-body-step-4-svg"/>
        这次帮助小动物已经完成啦~感谢你的爱心~
        <svg-icon icon-class="catdog" class="main-body-step-4-svg-button"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { queryById } from '@/api/user'
  import adoptInfo from '@/components/AcceptBlock/adopt/adoptInfo'
  import rescueInfo from '@/components/AcceptBlock/rescue/rescueInfo'
  import resourceInfo from '@/components/AcceptBlock/resoure/resourceInfo'
  import { queryRescueById, updateRescue } from '@/api/resuce'
  import { queryAdoptById, updateAdopt } from '@/api/adopt'
  import { queryResourceById, updateResourceStatus } from '@/api/resource'
  import rescueProcess from '@/components/Form/rescue/rescueProcess'
  import adoptProcess from '@/components/Form/adopt/adoptProcess'
  import resourceProcess from '@/components/Form/resource/resourceProcess'

  export default {
    name: 'accept',
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
    created() {
      //获取当前用户数据
      this.fetchData(this.id)
      //获取跳转链接所带信息
      this.infoId = this.$route.query.infoId
      this.type = this.$route.query.typeStr
    },
    mounted() {
      document.getElementsByClassName('main-container')[0].style['background-color'] = '#f3f3f3'
    },
    data() {
      return {
        //当前进行到哪一步
        active: 0,
        //选择的信息id
        infoId: '',
        //选择的信息类型
        type: '',
        //页面加载变量
        listLoading: false,
        //当前用户信息
        userInfo: null,
        info: {},
        acceptInfo: {}
      }
    },
    watch: {
      active: {
        handler: function(newVal, oldVal) {
          if (newVal === 1) {
            this.getInfoById(this.infoId)
          } else if (newVal === 2) {
            //获取是否有对接人 如果有则获取对方联系方式
            let acceptUser = null
            if (this.type === 'rescue') {
              acceptUser = this.info.findUser
            } else if (this.type === 'adopt') {
              acceptUser = this.info.publisher
            } else {
              if (this.info.givee) {
                acceptUser = this.info.givee
              } else {
                acceptUser = this.info.donor
              }
            }
            if (acceptUser) {
              this.getAcceptUserInfo(acceptUser)
            }
          }
        }
      }
    },
    methods: {
      //如果有infoId则获取对应信息
      async getInfoById(param) {
        this.listLoading = true
        let response = null
        if (this.type === 'rescue') {
          await queryRescueById(param).then(res => {
            response = res
          })
        } else if (this.type === 'adopt') {
          await queryAdoptById(param).then(res => {
            response = res
          })
        } else {
          await queryResourceById(param).then(res => {
            response = res
          })
        }
        this.listLoading = false
        if (response.code == 200) {
          this.info = response.data
          if (this.info.status === 'WAITING') {
            this.active = 1
          } else if (this.info.status === 'TALKING') {
            this.active = 2
          } else if (this.info.status === 'UPLOAD') {
            this.active = 3
          } else {
            this.active = 4
          }
        } else {
          this.$message.error('获取失败')
        }
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
      activeChange(num) {
        this.active = num
      },
      // 获取用户数据
      fetchData(param) {
        this.listLoading = true
        queryById(param).then(response => {
          this.userInfo = response.data
          if (this.userInfo.isAuth === 'YES') {
            this.active = 1
          } else {
            this.$message({
              message: '请先认证!',
              type: 'error'
            })
            this.$router.push({
              path: '/auth/auth'
            })
          }
        }).finally(() => {
          this.listLoading = false
        })
      },
      //修改状态
      async changeStatus(status, flag) {
        let form = {
          id: this.infoId,
          status: status
        }
        let result = null
        if (this.type === 'rescue') {
          if (flag == 0) {
            form.rescueUser = ''
          }
          await updateRescue(form).then((res) => {
            result = res
          })
        } else if (this.type === 'adopt') {
          if (flag == 0) {
            form.adoptUser = ''
          }
          await updateAdopt(form).then((res) => {
            result = res
          })
        } else {
          if (flag == 0) {
            if (this.info.givee === this.userInfo.id) {
              form.donor = ''
            } else {
              form.givee = ''
            }
          }
          await updateResourceStatus(form).then((res) => {
            result = res
          })
        }
        if (result.code === 200) {
          if (status === 'WAITING') {
            this.active = 1
          } else if (status === 'UPLOAD') {
            this.active = 3
          }
        } else {
          this.$message.error('操作错误，请再次尝试！')
        }
      }
    },
    destroyed() {
      document.getElementsByClassName('main-container')[0].style['background-color'] = '#ffffff'
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
      position: relative;

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

      .main-body-step-4 {
        text-align: center;
        font-size: 2em;
        vertical-align: center;
        padding: 2em 0 0 0;

        .main-body-step-4-svg {
          width: 4em;
          height: 4em;
          display: block;
          margin: 0 calc(50% - 2em);
          padding: 1em 0;
        }

        .main-body-step-4-svg-button {
          width: 10em;
          height: 10em;
          display: block;
          position: absolute;
          right: 0em;
        }
      }
    }
  }
</style>
