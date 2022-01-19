<template>
  <div class="app-container">
    <div class="to-adopted-main">
      <Title title-name="待领养动物" description="请帮帮这些动物!" back-link="/adopt/adopt" back-link-name="领养信息"/>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          :infinite-scroll-distance="250"
          :infinite-scroll-immediate="false"
          infinite-scroll-disabled="disabled">
          <ToAdoptedBlock :adopt-item="item" v-for="item in toAdoptedList"/>
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
import ToAdoptedBlock from "@/components/AdoptBlock/toAdopted"
import {getAdoptList} from "@/api/adopt";
import Title from "@/components/Title/index"

export default {
  name: "toAdopted",
  components: {
    ToAdoptedBlock,
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
      return this.pageSizes >= 21 || (this.total != null && this.pageSizes > this.total)
    },
    disabled() {
      return this.listLoading || this.noMore
    }
  },
  data() {
    return {
      // 数据
      toAdoptedList: [],
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
      getAdoptList(search).then(response => {
        this.toAdoptedList = response.data.records
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

.to-adopted-main {
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
