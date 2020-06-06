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
        <div style="padding: 0 20px;font-size: 18px;font-weight: blob">
          <p>{{ nowDate + ' ' + nowTime + ' ' + ' ' + nowWeek }}</p>
        </div>
        <el-tooltip effect="dark" content="全屏" placement="bottom" style="padding: 0 20px">
          <i class="iconfont icon-zh-quanping" style="color:grey;font-size: 20px" @click="fullScreen"></i>
        </el-tooltip>
        <div style="margin-right:20px">
          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
               <el-image class="user-avatar" src="http://image.djson.cn/2020/01/04/wzxkf8y7ivm66562w85yjdon.jpg"></el-image>
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
        <el-container style="padding: 10px 10px;height: 200%,">
          <!-- <el-header style="height: auto;">
                        <tabs></tabs>
          </el-header>-->
          <el-main>
            <el-container class="elContainer">
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
      nowDate: "",    // 当前日期
      nowTime: "",    // 当前时间
      nowWeek: "" ,    // 当前星期
      isCollapse: false,
      routes: [
        // {
        //   path: "home",
        //   name: "首页",
        //   meta: {
        //     icon: "el-icon-s-home"
        //   }
        // },
        {
          path: "about",
          name: "商品中心",
          meta: {
            icon: "el-icon-school"
          },
          children: [
            {
              path: "commodityExamine",
              name: "商品审核",
              meta: {
                icon: "el-icon-brush"
              }
            },
            {
              path: "commodityLibrary",
              name: "商品库",
              meta: {
                icon: "el-icon-mobile"
              }
            }
          ]
        },
        {
          path: "list",
          name: "网关中心",
          meta: {
            icon: "el-icon-mouse"
          },
          children: [
            {
              path: "entryGateway",
              name: "输入网关",
              meta: {
                icon: "el-icon-pie-chart"
              }
            },
            // {
            //   path: "outputGateway",
            //   name: "输出网关",
            //   meta: {
            //     icon: "el-icon-s-home"
            //   }
            // }
          ]
        },
        {
          path: "top",
          name: "系统设置",
          meta: {
            icon: "el-icon-set-up"
          },
          children: [
            {
              path: "userSystem",
              name: "用户管理",
              meta: {
                icon: "el-icon-turn-off"
              }
            },
            {
              path: "roleSystem",
              name: "角色管理",
              meta: {
                icon: "el-icon-open"
              }
            }
          ]
        },

        {
          path: "businessRegister",
          name: "商家中心",
          meta: {
            icon: "el-icon-set-up"
          },
          children: [
            {
              path: "businessRegister",
              name: "商家注册",
              meta: {
                icon: "el-icon-turn-off"
              }
            },
            {
              path: "businessAuth",
              name: "认证商家",
              meta: {
                icon: "el-icon-turn-off"
              }
            },
          ]
        }

      ]
    };
  },
  created() {},

   mounted() {
        this.currentTime();
    },

    // 销毁定时器
    beforeDestroy: function() {
        if (this.getDate) {
            clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
        }
    },

  methods: {
     currentTime() {
      setInterval(this.getDate, 500);
    },
     getDate: function() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
        let week = new Date().getDay();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
        let ms = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
        if (week == 1) {
            this.nowWeek = "星期一";
        } else if (week == 2) {
            this.nowWeek = "星期二";
        } else if (week == 3) {
            this.nowWeek = "星期三";
        } else if (week == 4) {
            this.nowWeek = "星期四";
        } else if (week == 5) {
            this.nowWeek = "星期五";
        } else if (week == 6) {
            this.nowWeek = "星期六";
        } else {
            this.nowWeek = "星期日";
        }
        _this.nowTime = hh + ":" + mf + ":" + ms;
        _this.nowDate = yy + "-" + mm + "-" + dd;
      },

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
}
</script>

<style lang="scss" scoped>
#comp-header {
  display: flex;
  align-items: center;
  padding-left: 0;
}
.el-main {
  background-color: #f1f6fa;
  overflow: auto;
  height: 100%;
}
.elContainer{
  background: #fff;
  border-radius: 5px;
  font-size: 14px;
}
.el-container{
  height: auto;
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