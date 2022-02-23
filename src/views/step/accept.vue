<template>
  <div class="main-body" v-load="listLoading">
    <el-steps :active="active">
      <el-step title="步骤 1" description="认证身份" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" description="确认详细信息" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" description="上传过程" icon="el-icon-picture"></el-step>
      <el-step title="步骤 4" description="完成" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {queryById} from "@/api/user";

export default {
  name: "accept",
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
    this.infoId = this.$route.query.infoId
    this.type = this.$route.query.typeStr
  },
  mounted() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
  },
  data() {
    return {
      //当前进行到哪一步
      active: 1,
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
  methods:{
    // 获取用户数据
    fetchData(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.userInfo = response.data
        if (this.userInfo.isAuth === 'YES') {
          this.active = 2
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

<style scoped>

</style>
