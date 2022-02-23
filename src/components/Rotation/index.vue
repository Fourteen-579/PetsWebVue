<template>
  <div class="pic-for">
    <el-carousel trigger="click" height="300px">
      <el-carousel-item v-for="item in rotationPic" :key="item.id">
        <el-image :src="item.url" fit="fill">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {getPicByUse} from "@/api/picture";

export default {
  name: "index",
  created() {
    this.getPicture('rotation').then(res => {
      this.rotationPic = res
    });
  },
  data() {
    return {
      //轮播图数据
      rotationPic: [],
    }
  },
  methods: {
    getPicture(param) {
      this.listLoading = true;
      return getPicByUse(param).then((res) => {
        return res.data
      }).finally(() => {
        this.listLoading = false;
      })
    },
  }
}
</script>

<style scoped lang="scss">
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
</style>
