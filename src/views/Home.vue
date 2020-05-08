<template>
  <el-container>
    <el-aside width="auto">
      <nav-menu :routes="routes"></nav-menu>
    </el-aside>
    <el-container>
      <el-header id="comp-header" class="comp-shadow" style="height: 50px;">
        <div class="nav-menu-fold" @click="collapseHandle">
          <i v-if="isCollapse" class="el-icon-s-unfold"></i>
          <i v-else class="el-icon-s-fold"></i>
        </div>
        <breadcrumb style="margin-left: 10px;flex:1"></breadcrumb>
        <el-tooltip effect="dark" content="全屏" placement="bottom" style="padding: 0 10px">
          <i class="iconfont icon-zh-quanping" style="color:red" @click="fullScreen"></i>
        </el-tooltip>
        <div style="margin-right:20px">
          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
              <img class="user-avatar" src="https://mgbq.github.io/nx-admin-site/home.png" />
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>home</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display:block;" @click="signOut">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <el-container style="padding: 10px 10px;">
          <!-- <el-header style="height: auto;">
                        <tabs></tabs>
          </el-header>-->
          <el-main>
            <el-container style="background: white;border-radius: 5px;">
              <transition name="slide-fade">
                <router-view></router-view>
              </transition>
            </el-container>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from "@/utils/event-bus";
import navMenu from "../components/Layout/menu";
import breadcrumb from "../components/Layout/breadcrumb";
import tabs from "../components/Layout/tabs";
import screenfull from "screenfull";
import lib from "../utils/lib";
export default {
  name: "app",
  components: {
    navMenu,
    breadcrumb,
    tabs
  },
  data() {
    return {
      isCollapse: false,
      routes: [
        {
          path: "home",
          name: "首页",
          meta: {
            icon: "el-icon-s-home"
          }
        },
        {
          path: "about",
          name: "商品中心",
          meta: {
            icon: "el-icon-s-home"
          },
          children: [
            {
              path: "commodityExamine",
              name: "商品审核",
              meta: {
                icon: "el-icon-s-home"
              }
            },
            {
              path: "commodityLibrary",
              name: "商品库",
              meta: {
                icon: "el-icon-s-home"
              }
            }
          ]
        }
      ]
    };
  },
  created() {},
  methods: {
    collapseHandle() {
      this.isCollapse = !this.isCollapse;
      eventBus.$emit("collapseHandle", this.isCollapse);
    },

    // 退出登录
    signOut() {
      $cookies.remove(lib.name);
      localStorage.removeItem(lib.name);
      this.$router.push({ path: "login" });
    },

    fullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "不能全屏呦",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>

<style lang="scss" scoped>
#comp-header {
  display: flex;
  align-items: center;
  padding-left: 0;
}
.el-main {
  background-color: #f1f6fa;
}
.nav-menu-fold {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #303133;
  cursor: pointer;
  background-color: #fff;
  transition: 0.3s;
  &:hover {
    background-color: #f2f6fc;
  }
}
.avatar-container {
  flex: 1;
  height: 50px;
  margin-right: 30px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>