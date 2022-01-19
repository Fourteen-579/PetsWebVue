<template>
  <div class="app-container">
    <div class="main-block to-adopted">
      <Title titleName="待领养动物" link="/toAdopted/toAdopted"/>
      <ToAdoptedBlock :adopt-item="item" v-for="item in toAdoptedList"/>
    </div>
    <div class="main-block adopted">
      <Title title-name="已领养动物" link="/adopted/adopted"/>
      <AdoptedBlock :adopt-item="item" v-for="item in adoptedList"/>
    </div>
  </div>
</template>

<script>
import {getAdoptList} from "@/api/adopt";
import AdoptedBlock from '@/components/AdoptBlock/Adopted'
import Title from "@/components/Title/index"
import ToAdoptedBlock from '@/components/AdoptBlock/toAdopted'

export default {
  components: {
    AdoptedBlock,
    Title,
    ToAdoptedBlock
  },
  data() {
    return {
      // 数据
      adoptedList: [],
      toAdoptedList: [],
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
        pageSize: 6,
        status: 'WAITING'
      }
      getAdoptList(search).then(response => {
        this.toAdoptedList = response.data.records
      }).finally(() => {
        this.listLoading = false
      })

      search = {
        page: 1,
        pageSize: 6,
        status: 'END'
      }
      getAdoptList(search).then(response => {
        this.adoptedList = response.data.records
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
