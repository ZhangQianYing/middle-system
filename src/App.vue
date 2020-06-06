<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return{}
  },
  created() {
    document.title = this.$global.title.title
    // this.axios.ajax({
      // type: "POST",
      // url: 'http://z-admin.djson.cn/auth/permission',
      // data: {code:'refund'},
      // success: res => {
          // let routerPathList = this.$store.state.routerPathList
          // res.data.elements.forEach(item => {
          //     routerPathList.push(item.value)
          // });
      //     this.$store.state.routerPathList.push('commodityLibrary')
      // }
    // })
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
	height: 100%;
	overflow: hidden;
  color: #2c3e50;
}
.el-image-viewer__btn .el-icon-circle-close{
  color: red
}
</style>
