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
