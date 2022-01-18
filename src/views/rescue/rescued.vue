<template>
  <div class="app-container">
    <div class="to-rescued-main">
      <Title title-name="已救助动物" description="被救助的他们非常感谢人类的帮助!" back-link="/" back-link-name="救助信息"/>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          :infinite-scroll-distance="250"
          :infinite-scroll-immediate="false"
          infinite-scroll-disabled="disabled">
          <rescueBlock :rescue-item="item" v-for="item in rescuedList"/>
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
import rescueBlock from "@/components/RescueBlock/Rescued"
import {getRescueList} from "@/api/resuce";
import Title from "@/components/Title/index"

export default {
  name: "toRescued",
  components: {
    rescueBlock,
    Title
  },
  props: {
    pageSize: {
      type: Number,
      default: 6
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
      rescuedList: [],
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
      this.pageSizes += 3
      this.fetchData()
    },
    // 获取数据
    fetchData() {
      const _that = this
      this.listLoading = true
      let search = {
        page: 1,
        pageSize: _that.pageSizes,
        status: 'END'
      }
      getRescueList(search).then(response => {
        this.rescuedList = response.data.records
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
