<template>
  <div v-loading="listLoading" class="dashboard-container">
    <div class="module">
      <Rotation/>
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
      <router-link v-for="item in baseItem" :to="{
      path:'/base/base',
      query:{
        id:item.id
      }
      }">
        <BaseBlock :item="item"/>
      </router-link>
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
        <Newest :item="item" :img-url="item.photos" :description="item.describes" :title="item.title"
                v-for="item in newest2"/>
      </div>
    </div>

  </div>
</template>

<script>

import {getLabelList} from "@/api/label";
import {getPicByUse} from "@/api/picture";
import {getUserList} from "@/api/user";
import {getResourceList} from "@/api/resource";
import {getRescueListOrderByUpdateTime} from "@/api/resuce";
import {getAdoptList} from "@/api/adopt";
import {getPropagandaList} from "@/api/propaganda";
import Title from "@/components/Title/index"
import RescourceBlock from "@/components/RescourceBlock"
import BaseBlock from "@/components/BaseBlock/index"
import OurWork from "@/components/OurWork/index"
import Newest from "@/components/NewestBlock/index"
import Rotation from "@/components/Rotation/index"

export default {
  components: {
    Title,
    RescourceBlock,
    BaseBlock,
    OurWork,
    Newest,
    Rotation
  },
  name: 'Dashboard',
  mounted() {

  },
  created() {
    this.getPicture('work').then(res => {
      for (let i = 0; i < this.ourwork.length; i++) {
        this.ourwork[i].imgUrl = res[i].url;
      }
    });
    this.getBase()
    this.getResource()
    var search = {
      page: 1,
      pageSize: 999
    }
    this.getLabelOptions(search)

    search = {
      page: 1,
      pageSize: 1,
      status: 'PUBLISHED',
      associationType: 'RESCUE'
    }
    let _that = this
    this.getPropaganda(search, function () {
      search.associationType = 'ADOPT';
      _that.getPropaganda(search, function () {
        search.associationType = 'RESOURCE';
        _that.getPropaganda(search, function () {
          _that.newest2 = _that.newest
        });
      });
    });
  },
  watch: {},
  data() {
    return {
      newest2: [],
      newest: [],
      ourwork: [{
        title: '救助需要帮助的动物们',
        description: '每一个生命最基本的权力就是生存的权力，而我们做的是保证这些动物的权力。',
        imgUrl: '',
        svgName: 'help4'
      },
        {
          title: '提供一个领养平台',
          description: '你看见了一只与你投缘的动物，而它看见的是一个温暖的家',
          imgUrl: '',
          svgName: 'adopt3'
        },
        {
          title: '提供/获取需要的资源',
          description: '将我们接收到的爱传递下去，温暖永远在我们心间',
          imgUrl: '',
          svgName: 'give'
        },
        {
          title: '宣传我们让更多人知道',
          description: '把我们做的事告诉大家，让更多的人意识到动物们也需要被爱护。',
          imgUrl: '',
          svgName: 'xuanchuan'
        }],
      url: this.$store.state.settings.url + 'img/15e45d5b50ef00974f5784fbe5acc41e.jpeg',
      // 加载变量
      listLoading: false,
      //基地数据
      baseItem: [],
      //资源对接数据
      resourceItem: [],
      //标签数据
      labelOption: [],
    }
  },
  methods: {
    getPropaganda(param, callback) {
      this.listLoading = true;
      getPropagandaList(param).then((res) => {
        this.newest.push(res.data.records[0]);
      }).finally(() => {
        callback()
        this.listLoading = false;
      })
    },
    getRescue(param) {
      this.listLoading = true;
      getRescueListOrderByUpdateTime(param).then((res) => {

      }).finally(() => {
        this.listLoading = false;
      })
    },
    getAdopt(param) {
      this.listLoading = true;
      getAdoptList(param).then((res) => {
        this.newest.push({})
      }).finally(() => {
        this.listLoading = false;
      })
    },
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
        isStartBase:'YES',
        page: 1,
        pageSize: 3
      }
      getUserList(param).then((res) => {
        this.baseItem = res.data.records
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
