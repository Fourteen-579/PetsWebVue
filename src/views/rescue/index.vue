<template>
  <div class="app-container">
    <div class="main-block to-rescued">
      <Title titleName="待救助动物" link="/toRescued/toRescued"/>
      <ToRescueBlock :rescue-item="item" v-for="item in toRescuedList"/>
    </div>
    <div class="main-block rescued">
      <Title title-name="已救助动物" link="/rescued/rescued"/>
      <Rescued :rescue-item="item" v-for="item in rescuedList"/>
    </div>
  </div>
</template>

<script>
import {getRescueList} from '@/api/resuce'
import ToRescueBlock from "@/components/RescueBlock/toRescued"
import Rescued from "@/components/RescueBlock/Rescued";
import Title from "@/components/Title/index"

export default {
  components: {
    ToRescueBlock,
    Title,
    Rescued
  },
  data() {
    return {
      // 数据
      rescuedList: [],
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
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: 8,
        status: 'WAITING'
      }
      getRescueList(search).then(response => {
        this.toRescuedList = response.data.records
      }).finally(() => {
        this.listLoading = false
      })

      search = {
        page: 1,
        pageSize: 8,
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

<style scoped lang="scss">

.main-block {
  width: calc(100%);
}

</style>
