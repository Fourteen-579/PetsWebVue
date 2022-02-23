<template>
  <div class="app-container">
    <div class="to-adopted-main">
      <Title title-name="已领养动物" description="被救助的他们非常感谢人类的帮助!" back-link="/adopt/adopt" back-link-name="领养信息"/>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          :infinite-scroll-distance="250"
          :infinite-scroll-immediate="false"
          infinite-scroll-disabled="disabled">
          <AdoptedBlock :adopt-item="item" v-for="item in adoptedList"/>
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
import AdoptedBlock from "@/components/AdoptBlock/Adopted"
import {getAdoptList} from "@/api/adopt";
import Title from "@/components/Title/index"

export default {
  name: "toAdopted",
  components: {
    AdoptedBlock,
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
      return this.pageSizes >= 21 || (this.total != null && this.pageSizes > this.total)
    },
    disabled() {
      return this.listLoading || this.noMore
    }
  },
  data() {
    return {
      // 数据
      adoptedList: [],
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
        status: 'END',
      }
      getAdoptList(search).then(response => {
        this.adoptedList = response.data.records
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
    margin-bottom: 5px;

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
