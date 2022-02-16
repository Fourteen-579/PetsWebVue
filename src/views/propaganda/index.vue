<template>
  <div class="app-container" v-loading="listLoading">

    <div class="pic-for module">
      <el-carousel trigger="click" height="250px">
        <el-carousel-item v-for="item in rotationPic" :key="item.id">
          <el-image :src="item.url" fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <Title titleName="宣传" description="让更多的人知道我们" class="title"/>

    <div class="info-list">
      <PropagandaList :propagandaList="list"/>
    </div>

    <div class="base-list">
      <div class="base-item-first">
        全国流浪动物救助基地名录
      </div>
      <div v-for="item in baseInfo" class="base-item">
        <router-link :to="{path:'/base/base',query:{id:item.id}}">
          <div class="base-name base-item-text">
            {{ item.nickName }}
            <svg-icon icon-class="toRight2" class="base-svg"/>
          </div>
          <div class="base-location base-item-text">
            {{
              pcaa[86][item.address[0]]
            }}-
            {{
              pcaa[item.address[0]][item.address[1]]
            }}-
            {{
              pcaa[item.address[1]][item.address[2]]
            }}
          </div>
        </router-link>
      </div>
    </div>

    <el-pagination
      class="page-component"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageParam.page"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import {pcaa} from 'area-data';
import Title from "@/components/Title/index"
import PropagandaList from "@/components/PropagandaList/index"
import {getPropagandaList} from '@/api/propaganda'
import {getUserList} from '@/api/user'
import {getPicByUse} from "@/api/picture"

export default {
  components: {
    Title,
    PropagandaList
  },
  data() {
    return {
      pcaa: pcaa,
      // 加载变量
      listLoading: true,
      //基地数据
      baseInfo: [],
      //宣传信息
      list: [],
      total: 0,
      pageParam: {
        page: 1,
        pageSize: 10
      },
      //轮播图数据
      rotationPic: [],
    }
  },
  created() {
    this.getPicture('rotation').then(res => {
      this.rotationPic = res
    });
    this.fetchData(this.pageParam)
    let search = {
      page: 1,
      pageSize: 5,
      isBase: 'YES',
      isStartBase: 'YES'
    }
    this.getBase(search);
  },
  watch: {},
  methods: {
    //将富文本转化为普通文字
    strip(html) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    },
    //根据用途获取图片
    getPicture(param) {
      this.listLoading = true;
      return getPicByUse(param).then((res) => {
        return res.data
      }).finally(() => {
        this.listLoading = false;
      })
    },
    //获取基地数据
    getBase(search) {
      this.listLoading = true;
      getUserList(search).then((res) => {
        this.baseInfo = res.data.records
      }).finally(() => {
        this.listLoading = false;
      })
    },
    // 获取宣传信息
    fetchData(search) {
      this.listLoading = true
      let _that = this
      getPropagandaList(search).then(response => {
        _that.total = response.data.total
        _that.list = response.data.records
        for (let i = 0; i < _that.list.length; i++) {
          this.list[i].describes = _that.strip(_that.list[i].describes)
        }
      })
      this.listLoading = false
    },
    // 分页组件选页改变时调用函数
    currentChange(newPage) {
      this.pageParam.page = newPage
      this.fetchData(this.pageParam)
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {

  .pic-for {
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }

  .title {
    margin-top: 1em;
  }

  .info-list {
    width: 70%;
    display: inline-block;


  }

  .base-list {
    width: 25%;
    display: inline-block;
    vertical-align: top;
    float: right;


    .base-item-first {
      font-size: 1em;
      line-height: 1em;
      text-align: center;
      color: white;
      background-color: #5ec131;
      height: 2em;
      padding: 0.5em 0;
    }

    .base-item {

      border: 1px solid rgba(94, 193, 49, 0.50);
      border-top: none;
      position: relative;

      .base-item-text {
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1em;
        line-height: 1em;
        padding: 0.5em;
      }

      .base-name {
        position: relative;

        .base-svg {
          float: right;
        }
      }

      .base-location {
        color: #5a5e66;
      }


    }
  }

  .page-component {
    width: 100%;
  }
}
</style>
