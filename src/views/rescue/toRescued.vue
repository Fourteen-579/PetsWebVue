<template>
  <div>
    <ToRescueBlock :rescue-item="item" v-for="item in toRescuedList"/>
  </div>
</template>

<script>
import ToRescueBlock from "@/components/RescueBlock/toRescued"
import {getRescueList} from "@/api/resuce";

export default {
  name: "toRescued",
  components: {
    ToRescueBlock
  },
  props: {
    pageSize: {
      type: Number,
      default:8
    }
  },
  data() {
    return {
      // 数据
      toRescuedList: [],
      // 加载变量
      listLoading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      const _that = this
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: _that.pageSize,
        status: 'WAITING'
      }
      getRescueList(search).then(response => {
        this.toRescuedList = response.data.records
      }).finally(() => {
        this.listLoading = false
      })
    },
  }
}
</script>

<style scoped>

</style>
