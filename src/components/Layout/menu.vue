<!-- 导航菜单 -->
<template>
  <div id="nav-menu">
    <logo :isCollapse="isCollapse"></logo>
    <el-menu
      :default-active="defaultActive"
      router
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#fff"
      style="height: 100%"
      :unique-opened="false"
      :collapse="isCollapse"
    >
      <comp-navmenu v-for="item in routes" :key="item.name" :nav-data="item"></comp-navmenu>
    </el-menu>
  </div>
</template>

<script>
import eventBus from "@/utils/event-bus";
import compNavmenu from "./comp-navmenu";
import logo from "./logo";
export default {
  components: { compNavmenu, logo },
  name: "navMenu",
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  created() {
    eventBus.$on("collapseHandle", isCollapse => {
      this.isCollapse = isCollapse;
    });
  },
  computed: {
    defaultActive() {
      if(this.$route.meta.fath) {
        return '/' + this.$route.meta.fath
      } else {
        return this.$route.fullPath;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-menu {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}
</style>