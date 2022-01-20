<template>
  <div class="app-container">
    <div class="main-block donate">
      <Title class="main-block-title" titleName="资源捐赠" link="/donate/donate"/>
      <RescourceBlock v-for="item in donateList" :item="item" :labelOption="labelOption"/>
    </div>
    <div class="main-block demand">
      <Title class="main-block-title" title-name="资源需求" link="/demand/demand"/>
      <RescourceBlock v-for="item in demandList" :item="item" :labelOption="labelOption"/>
    </div>
  </div>
</template>

<script>
import RescourceBlock from "@/components/RescourceBlock/index"
import Title from "@/components/Title/index"
import {getLabelList} from "@/api/label";
import {getResourceList} from "@/api/resource";

export default {
  components: {
    Title,
    RescourceBlock
  },
  data() {
    return {
      // 数据
      donateList: [],
      demandList: [],
      // 加载变量
      listLoading: true,
      //标签数据
      labelOption: [],
    }
  },
  created() {
    var search = {
      page: 1,
      pageSize: 999
    }
    this.getLabelOptions(search)
    this.fetchData()
  },
  methods: {
    getLabelOptions(search) {
      this.listLoading = true;
      getLabelList(search).then(response => {
        this.labelOption = response.data.records
      }).finally(() => {
        this.listLoading = false;
      })
    },
    // 获取数据
    fetchData() {
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: 10,
        status: 'WAITING',
        type: 'DONATE'
      }
      getResourceList(search).then(response => {
        this.donateList = response.data.records
      }).finally(() => {
        this.listLoading = false
      })

      search = {
        page: 1,
        pageSize: 10,
        status: 'WAITING',
        type: 'DEMAND'
      }
      getResourceList(search).then(response => {
        this.demandList = response.data.records
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
  margin-bottom: 20px;

  .main-block-title {
    margin-bottom: 10px;
  }
}

</style>
