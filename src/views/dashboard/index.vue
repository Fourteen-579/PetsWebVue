<template>
  <div v-loading="listLoading" class="dashboard-container">
    <div class="pic-for module">
      <el-carousel trigger="click" height="250px">
        <el-carousel-item v-for="item in rotationPic" :key="item.id">
          <el-image :src="item.url" fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="resource-for module">
      <Title titleName="资源对接" description="搭建基地需求方和捐赠意向方的资源共享平台"/>
      <div class="base-block">
        <RescourceBlock v-for="item in resourceItem" :item="item" :labelOption="labelOption"/>
      </div>
    </div>

    <div class="base-for module">
      <Title titleName="基地名录" description="每一个地区的基地都要全力以赴的救助流浪动物"/>
      <div class="base-for-img">
        <div class="base-for-img-title">
          流浪动物
        </div>
        <div class="base-for-img-text">
          你可以不爱它们，但请不要践踏它们。
        </div>
        <img class="base-for-img-pic" :src="url"/>
      </div>
      <BaseBlock v-for="item in baseItem" :item="item"/>
    </div>

    <div class="our-work-for module">
      <Title title-name="我们的工作" description="我们都在做些什么"/>
      <div class="work-block">
        <OurWork :svg-name="item.svgName" :img-url="item.imgUrl" :description="item.description" :title="item.title"
                 v-for="item in ourwork"/>
      </div>
    </div>

    <div class="newest module">
      <Title title-name="最新进展" description="最近的一些消息"/>
      <div class="newest-block">
        <Newest :img-url="item.imgUrl" :description="item.describes" :title="item.title" v-for="item in newest"/>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as echarts from 'echarts';
import {getLabelList} from "@/api/label"
import {getPicByUse} from "@/api/picture";
import {getUserList} from "@/api/user";
import {getResourceList} from "@/api/resource";
import Title from "@/components/Title/index"
import RescourceBlock from "@/components/RescourceBlock"
import BaseBlock from "@/components/BaseBlock/index"
import OurWork from "@/components/OurWork/index"
import Newest from "@/components/NewestBlock/index"

export default {
  components: {
    Title,
    RescourceBlock,
    BaseBlock,
    OurWork,
    Newest
  },
  name: 'Dashboard',
  mounted() {

  },
  created() {
    this.getPicture('rotation').then(res => {
      this.rotationPic = res
    });
    console.log(this.rotationPic)
    let wordImg = this.getPicture('word');
    for (let i = 0; i < this.ourwork.length; i++) {
      this.ourwork[i].imgUrl = wordImg[i];
    }
    console.log(wordImg)
    this.getBase()
    this.getResource()
    var search = {
      page: 1,
      pageSize: 999
    }
    this.getLabelOptions(search)
  },
  watch: {},
  data() {
    return {
      newest: [],
      ourwork: [{
        title: '救助',
        description: '每一个生命最基本的权力就是生存的权力，而我们做的是保证这些动物的权力。',
        imgUrl: '',
        svgName: 'help4'
      },
        {
          title: '领养',
          description: '你看见了一只与你投缘的动物，而它看见的是一个温暖的家',
          imgUrl: '',
          svgName: 'adopt3'
        },
        {
          title: '资源对接',
          description: '将我们接收到的爱传递下去，温暖永远在我们心间',
          imgUrl: '',
          svgName: 'give'
        },
        {
          title: '宣传',
          description: '把我们做的事告诉大家，让更多的人意识到动物们也需要被爱护。',
          imgUrl: '',
          svgName: 'xuanchuan'
        }],
      url: this.$store.state.settings.url + 'img/15e45d5b50ef00974f5784fbe5acc41e.jpeg',
      // 加载变量
      listLoading: false,
      //轮播图数据
      rotationPic: [],
      //基地数据
      baseItem: [],
      //资源对接数据
      resourceItem: [],
      //标签数据
      labelOption: [],
    }
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
    getPicture(param) {
      this.listLoading = true;
      return getPicByUse(param).then((res) => {
        return res.data
      }).finally(() => {
        this.listLoading = false;
      })
    },
    getBase() {
      this.listLoading = true;
      let param = {
        isBase: 'YES',
        page: 1,
        pageSize: 10
      }
      getUserList(param).then((res) => {
        this.baseItem = res.data.records
        console.log(this.baseItem)
      }).finally(() => {
        this.listLoading = false;
      })
    },
    getResource() {
      this.listLoading = true;
      let param = {
        page: 1,
        pageSize: 4,
        status: 'WAITING',
      }
      getResourceList(param).then((res) => {
        this.resourceItem = res.data.records
      }).finally(() => {
        this.listLoading = false;
      })
    }
  }
}

</script>

<style lang="scss" scoped>

.dashboard-container {

  .module {
    margin-bottom: 20px;
  }

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

  .resource-for {
    .base-block {
      vertical-align: center;
    }
  }

  .base-for {
    .base-for-img {
      position: relative;
      margin: 10px;
      display: inline-flex;
      color: white;

      .base-for-img-title {
        position: absolute;
        top: 2em;
        left: 3em;
        font-weight: bolder;
      }

      .base-for-img-text {
        position: absolute;
        top: 5em;
        left: 3em;
      }

      .base-for-img-pic {

        height: 15em;
      }
    }
  }
}


</style>
