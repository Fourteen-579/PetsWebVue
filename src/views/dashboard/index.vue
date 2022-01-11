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

    <div class="base-for module">
      <Title titleName="基地名录"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as echarts from 'echarts';
import {getPicByUse} from "@/api/picture";
import Title from "@/components/Title/index"

export default {
  components: {
    Title
  },
  name: 'Dashboard',
  mounted() {

  },
  created() {
    this.getPicture('rotation')
  },
  watch: {},
  data() {
    return {
      // 加载变量
      listLoading: false,
      //轮播图数据
      rotationPic: [],
    }
  },
  methods: {
    getPicture(param) {
      getPicByUse(param).then((res) => {
        this.rotationPic = res.data
      })
    }
  }
}

</script>

<style lang="scss" scoped>

.dashboard-container {

  .module{
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

}



</style>
