<template>
  <div v-loading="listLoading" class="dashboard-container">
    <div class="pic-for">
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
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as echarts from 'echarts';
import {getPicByUse} from "@/api/picture";

export default {
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

.block {
  //border-radius: 10px;
  color: white;
  display: flow-root;
  font-weight: bolder;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.50);
  width: inherit;
  margin: 10px;
  text-align: center;

  .block-select {
    float: right;
    margin-top: 5px;
    margin-right: 5px;
    z-index: 1;
  }

  .emergency-block {
    display: block;
    border-radius: 5px;
    background-color: #edb6a0;
    margin: 20px;
  }

  .other-block {
    margin: 20px;


    .box {
      border-radius: 5px;
      display: inline-block;
      height: 8em;
      margin: 2em;
      width: 15em;
      vertical-align: bottom;
      text-align: center;
    }

    .rescue-block {
      background-color: #668bd3;

    }

    .adopt-block {
      background-color: #fca887;
    }

    .resource-block {
      background-color: #a4e5f0;
    }

    .pro-block {
      background-color: #87e19c;
    }
  }

}

.block-text {
  margin: 5px;
  position: relative;
  top: 45%;
  display: inline-block;
  vertical-align: center;
}

</style>
