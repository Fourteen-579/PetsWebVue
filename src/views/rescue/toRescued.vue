<template>
  <div class="app-container">
    <div class="to-rescued-main">
      <Title title-name="待救助动物" description="请帮帮这些动物!" back-link="/rescue/rescue" back-link-name="救助信息"/>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          :infinite-scroll-distance="250"
          :infinite-scroll-immediate="false"
          infinite-scroll-disabled="disabled">
          <ToRescueBlock :rescue-item="item" v-for="item in toRescuedList"/>
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
import ToRescueBlock from "@/components/RescueBlock/toRescued"
import {getRescueList} from "@/api/resuce";
import Title from "@/components/Title/index"

export default {
  name: "toRescued",
  components: {
    ToRescueBlock,
    Title
  },
  props: {
    pageSize: {
      type: Number,
      default: 8
    }
  },
  computed: {
    noMore() {
      return this.pageSizes >= 20 || (this.total != null && this.pageSizes > this.total)
    },
    disabled() {
      return this.listLoading || this.noMore
    }
  },
  data() {
    return {
      // 数据
      toRescuedList: [],
      total: null,
      // 加载变量
      listLoading: false,
      pageSizes: this.pageSize
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    load() {
      this.pageSizes += 4
      this.fetchData()
    },
    // 获取数据
    fetchData() {
      const _that = this
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: _that.pageSizes,
        status: 'WAITING'
      }
      getRescueList(search).then(response => {
        this.toRescuedList = response.data.records
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

.to-rescued-main {
  width: calc(100%);


  .infinite-list-wrapper {
    overflow-y: hidden;
    height: calc(100vh - 50px);

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
<style>

</style>
