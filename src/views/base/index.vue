<template>
  <div class="base-body" v-loading="listLoading">
    <div class="base-info">

    </div>
    <div class="base-describe">
      <Title titleName="基地信息"/>

    </div>
    <div class="base-propaganda">
      <Title titleName="基地动态"/>
    </div>
  </div>
</template>

<script>
import {getPropagandaList} from "@/api/propaganda"
import {queryById} from '@/api/user'
import Title from "@/components/Title/index"

export default {
  name: "index",
  components: {
    Title
  },
  mounted() {
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
    // 获取基地数据
    getBaseInfo(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.baseInfo = response.data
        let now = new Date()
        let createTime = new Date(this.userInfo.isBase === 'YES' ? this.userInfo.baseCreateTime : this.userInfo.createTime)
        this.userInfo.days = parseInt((now.getTime() - createTime.getTime()) / 86400000)
      }).finally(() => {
        this.listLoading = false
      })
    },
    //获取基地宣传信息
    getBasePropaganda(param) {
      this.listLoading = true
      getPropagandaList(param).then(response => {
        this.basePropaganda = response.data.records
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },
    //修改tab之前
    changTab(active, old) {
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
  }
}
</script>

<style scoped lang="scss">

</style>
