<template>
  <div class="user-body">
    <div class="user-info">
      <div class="user-info-img">
        <el-image
          class="user-info-img-img"
          :src="avatar"
          fit="cover"></el-image>
      </div>
      <div class="user-info-text">
        <div class="user-info-name">
          {{ name }}
        </div>
        <div class="user-info-word">
          您已在本网站注册
          <span class="user-info-word-num">
            {{ this.userInfo.days }}
          </span>
          天，这些天中您捐粮
          <span class="user-info-word-num">
            {{
              this.userInfo.foodNum !== null && this.userInfo.foodNum !== undefined ? this.userInfo.foodNum : 0
            }}
          </span>
          kg，捐款
          <span class="user-info-word-num">
            {{
              this.userInfo.moneyNum !== null && this.userInfo.moneyNum !== undefined ? this.userInfo.moneyNum : 0
            }}
          </span>
          元。接受您捐赠的用户、基地和受到帮助的小动物对您感激不尽。
        </div>
      </div>
    </div>
    <div class="user-list">

    </div>
  </div>
</template>

<script>
import {queryById} from '@/api/user'
import {getAdoptList} from '@/api/adopt'
import {getRescueList} from "@/api/resuce";
import {getResourceList} from "@/api/resource";
import {pcaa} from 'area-data';
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id'
    ])
  },
  data() {
    return {
      resourceList: [],
      adoptList: [],
      rescueList: [],
      //用户信息
      userInfo: null,
      //地区数据
      pcaa: pcaa,
      // 加载变量
      listLoading: true,
      // 搜索值
      table: {
        participantId: this.id,
        page: 1,
        pageSize: 10
      },
      // 是否选择
      isOptions: [
        {
          value: 'YES',
          label: '是'
        },
        {
          value: 'NO',
          label: '否'
        }
      ],
    }
  },
  created() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#f3f3f3'
    this.fetchData(this.id)
  },
  methods: {
    getResourceData() {
      this.listLoading = true
      getResourceList(this.table).then(response => {
        this.resourceList = response.data.records
      })
      this.listLoading = false
    },
    getAdoptData() {
      this.listLoading = true
      getAdoptList(this.table).then(response => {
        this.adoptList = response.data.records
      })
      this.listLoading = false
    },
    getRescueData() {
      this.listLoading = true
      getRescueList(this.table).then(response => {
        this.rescueList = response.data.records
      })
      this.listLoading = false
    },
    // 获取用户数据
    fetchData(param) {
      this.listLoading = true
      queryById(param).then(response => {
        this.userInfo = response.data
        let now = new Date()
        let createTime = new Date(this.userInfo.isBase === 'YES' ? this.userInfo.baseCreateTime : this.userInfo.createTime)
        this.userInfo.days = parseInt((now.getTime() - createTime.getTime()) / 86400000)
      })
      this.listLoading = false
    },
    // 分页组件选页改变时调用函数
    currentChange(newPage) {
      this.table.page = newPage
    }
  },
  destroyed() {
    document.getElementsByClassName("main-container")[0].style['background-color'] = '#ffffff'
  }
}
</script>

<style scoped lang="scss">
.user-body {
  .user-info {

    background-color: white;
    padding: 3em;

    .user-info-img {
      display: inline-block;
      width: 8em;
      height: 8em;
      box-shadow: 1px 1px 5px #888888;

      .user-info-img-img {

      }
    }

    .user-info-text {
      width: 80%;
      display: inline-block;
      padding: 0 2em;
      vertical-align: top;

      .user-info-name {
        font-size: 1.5em;
        line-height: 2em;
        font-weight: bolder;
      }

      .user-info-word {
        font-size: 1em;
        line-height: 1.5em;

      }

      .user-info-word-num {
        color: #5ec231;
      }
    }
  }

  .user-list {

  }
}
</style>
