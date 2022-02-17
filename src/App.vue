<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang="scss">
.el-tooltip__popper {
  max-width: 30%;
  padding-bottom: 5px !important;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 15;
  -webkit-box-orient: vertical;

}

.el-tooltip__popper, .el-tooltip__popper.is-dark {
  background: rgb(48, 65, 86) !important;
  color: #fff !important;
  line-height: 24px;
}

.el-tabs__header {
  margin: 0 0 10px;
}

.el-tabs__nav-wrap::after{
  height: 1.5px;
  position: absolute;
}

.el-tabs__item.is-top{
  height: 1em;
  line-height: 1em;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
  text-align: center;
  width: 100%;
}

.el-tabs--card > .el-tabs__header {
  border-bottom: none;
}

#app {
  font-family: 微软雅黑;
}

.page-component {
  float: right;
  margin: 20px 20px 20px 0px;
}
</style>
