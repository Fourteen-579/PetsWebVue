<template>
  <div class="app-container">
    <div class="to-demand-main">
      <Title title-name="资源需求" description="因为这些人，许多流浪动物都得到了善意。" back-link="/resource/resource" back-link-name="
      资源对接信息"/>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          :infinite-scroll-distance="250"
          :infinite-scroll-immediate="false"
          infinite-scroll-disabled="disabled">
          <RescourceBlock v-for="item in demandList" :item="item" :labelOption="labelOption"/>
        </ul>
        <div class="notice">
          <svg-icon icon-class="noMore" class="notice-svg"/>
          <div class="notice-text">
            没有更多了...
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import RescourceBlock from "@/components/RescourceBlock/index"
import {getLabelList} from "@/api/label";
import {getResourceList} from "@/api/resource";
import Title from "@/components/Title/index"

export default {
  name: "demand",
  components: {
    RescourceBlock,
    Title
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    noMore() {
      return this.pageSizes >= 70 || (this.total != null && this.pageSizes > this.total)
    },
    disabled() {
      return this.listLoading || this.noMore
    }
  },
  data() {
    return {
      // 数据
      demandList: [],
      total: null,
      // 加载变量
      listLoading: false,
      pageSizes: this.pageSize,
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
    load() {
      this.pageSizes += 10
      this.fetchData()
    },
    // 获取数据
    fetchData() {
      const _that = this
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: _that.pageSizes,
        status: 'WAITING',
        type: 'DEMAND'
      }
      getResourceList(search).then(response => {
        this.demandList = response.data.records
        this.total = response.data.total
      }).finally(() => {
        this.listLoading = false
      })
    },
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0;
}

.to-demand-main {
  width: calc(100%);


  .infinite-list-wrapper {
    overflow-y: hidden;
    height: calc(100vh - 50px);
    margin-top: 10px;

    .list {
      overflow: visible;
      margin: 0;
      padding: 0;
    }

    .notice {
      width: 100%;
      text-align: center;
      height: 5em;

      .notice-text {
        line-height: 5em;
        font-weight: bolder;
        color: #5ec131;
        display: inline-flex;
        vertical-align: top;
      }

      .notice-svg {
        width: 8em;
        height: 5em;
        display: inline-flex;
      }
    }
  }
}


</style>
