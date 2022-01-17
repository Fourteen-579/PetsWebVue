<template>
  <div>
    <Rescued :rescue-item="item" v-for="item in rescuedList"/>
  </div>
</template>

<script>
import Rescued from "@/components/RescueBlock/Rescued";
import {getRescueList} from "@/api/resuce";

export default {
  name: "rescued",
  components: {
    Rescued
  },
  props: {
    pageSize: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      // 数据
      rescuedList: [],
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
      this.listLoading = true
      const _that = this
      let search = {
        page: 1,
        pageSize: _that.pageSize,
        status: 'END'
      }
      getRescueList(search).then(response => {
        this.rescuedList = response.data.records
      }).finally(() => {
        this.listLoading = false
      })

    },

  }
}
</script>

<style scoped>

</style>
