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
      <Title titleName="资源对接"/>
      <div class="base-block">
        <RescourceBlock v-for="item in resourceItem" :item="item" :labelOption="labelOption"/>
      </div>
    </div>

    <div class="base-for module">
      <Title titleName="基地名录"/>
      <BaseBlock v-for="item in baseItem" :item="item"/>
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
import RescourceBlock from "@/components/RescourceBlock/index"
import BaseBlock from "@/components/BaseBlock/index"

export default {
  components: {
    Title,
    RescourceBlock,
    BaseBlock
  },
  name: 'Dashboard',
  mounted() {

  },
  created() {
    this.getPicture('rotation')
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
      getPicByUse(param).then((res) => {
        this.rotationPic = res.data
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
      }).finally(() => {
        this.listLoading = false;
      })
    },
    getResource() {
      this.listLoading = true;
      let param = {
        page: 1,
        pageSize: 10
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

}


</style>
