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
.el-tabs__header {
  margin: 0 0 10px;
}

.el-tabs__item {
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
