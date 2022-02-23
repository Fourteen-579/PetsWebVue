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
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {queryById} from "@/api/user";
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
  created() {
    this.fetchData(this.id)
    this.type = this.$route.query.typeStr
    this.infoId = this.$route.query.infoId
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
      //选择的信息类型
      type: '',
      //页面加载变量
      listLoading: false,
      //当前用户信息
      userInfo: null,
    }
  },
  methods: {
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
          });
          this.$router.push({
            path: '/auth/auth'
          })
        }
      }).finally(() => {
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
}
</style>
