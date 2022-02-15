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
      <div v-for="item in list" class="info-item">
        <div class="info-item-img">
          <el-image
            v-if="item.photos"
            class="info-item-img-img"
            :src="item.photos[0].url"
            fit="cover"></el-image>
        </div>
        <div class="info-item-show">
          <div class="info-item-title">
            {{ item.title }}
          </div>
          <div class="info-item-text">
            {{ item.describes }}
          </div>
          <div class="info-item-other">
          <span class="info-item-other-item">
            <svg-icon icon-class="like" class="info-item-other-item-svg"/>
            <span class="info-item-other-item-text">
              {{ item.user !== null && item.user !== undefined ? item.user.length : 0 }}
            </span>
          </span>
            <span class="info-item-other-item">
            <svg-icon icon-class="comment" class="info-item-other-item-svg"/>
            <span class="info-item-other-item-text">
              {{ item.comment !== null && item.comment !== undefined ? item.comment.length : 0 }}
            </span>
          </span>
            <span class="info-item-other-item">
            <svg-icon icon-class="timeCat" class="info-item-other-item-svg"/>
            <span class="info-item-other-item-text">
              {{ $moment(item.updateTime).format('YYYY-MM-DD') }}
            </span>
          </span>
          </div>
        </div>

        <div/>
      </div>
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
import {getPropagandaList} from '@/api/propaganda'
import {getUserList} from '@/api/user'
import {getPicByUse} from "@/api/picture"

export default {
  components: {
    Title
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
      page: 1,
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
      this.fetchData()
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

    .info-item {
      height: 10em;
      padding: 0.5em 0;
      border-bottom: 1px solid #9a9a9a;
      position: relative;

      .info-item-img {
        display: inline-block;
        width: 20%;

        .info-item-img-img {
          height: 9em;
          width: 9em;
          border-radius: 5px;
        }
      }

      .info-item-show {
        width: 80%;
        height: 9em;
        display: inline-block;
        vertical-align: top;

        .info-item-title {
          font-size: 1.5em;
          line-height: 1.5em;
          height: 1.5em;
          margin-bottom: 0.2em;
        }

        .info-item-text {
          text-indent: 2em;
          margin-bottom: 0.3em;
          font-size: 1em;
          height: 4.8em;
          line-height: 1.2em;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        .info-item-other {
          float: right;
          margin-right: 1em;
          vertical-align: bottom;
          height: 1.2em;
          padding-top: 0.2em;

          .info-item-other-item {
            margin-right: 1em;

            .info-item-other-item-svg {
              width: 1em;
              height: 1em;
            }

            .info-item-other-item-text {

            }
          }
        }
      }
    }
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
