<template>
  <div style="width: 100%">
    <div class="headerTop">
      <div class="iconFix" @click="openSeach">
        <p class="iconList" :class="isOpenSeach ? 'opentitle' : isfirst ? '' : 'closetitle'"></p>
        <p class="iconList" :class="isOpenSeach ? 'centerOpen' : isfirst ? '' : 'centerClose'"></p>
        <p class="iconList" :class="isOpenSeach ? 'openbutton' : isfirst ? '' : 'closebutton'"></p>
      </div>
      <div :class="isOpenSeach ? 'openSearchList' : isfirst ? 'isOpenOne' : 'closeSearchList'">
        <searchList
          :inputList="inputList"
          :serachInput="search"
          :options="preloads"
          @serchButton="serchButton"
        ></searchList>
      </div>
    </div>
    <div class="tabList">
      <!-- 左边的展开选项内容 -->
      <div class="tabButton">
        <div class="tabButtonItme" :class="isOneOpen ? (isTab ? 'openTab' : 'closeTab') : ''">
          <el-button :type="typeIndex == '' ? 'primary' : ''" @click="changeButton('')">全部商品</el-button>
          <el-button
            :type="item.value == typeIndex ? 'primary' : ''"
            v-for="(item, index) of preloads.targets"
            @click="changeButton(item.value)"
            :key="index"
          >{{item.text}}</el-button>
        </div>
        <span
          class="iconfont icon-zh-zhankai tabIcon"
          @click="openTab"
          :class="isOneOpen ? (isTab ? 'openIcon' : 'closeIcon') : ''"
        ></span>
      </div>
      <!-- 右边的的开关 -->
      <div>
        <el-switch style="display: block" :value="search.target_flag == 0 ? true : false" active-color="#13ce66" inactive-color="#ff4949" active-text="" inactive-text="" @change='getOpenCheange'></el-switch>
      </div>
    </div>
    <tableList
      :tableData="tableData"
      :tableHeader="tableHeader"
      @pagination="pagination"
      :search="search"
      ref="tableList"
      @change="clickButton"
    ></tableList>
  </div>
</template>

<script>
import searchList from "@/components/searchList/searchList.vue";
import tableList from "@/components/tableList/tableList.vue";
export default {
  components: { searchList, tableList },
  name: "home",
  data() {
    return {
      isOneOpen: false, // 首次打开tab菜单隐藏
      isTab: false, // 默认tab菜单隐藏
      isOpenSeach: false, // 搜索栏是否显示
      isfirst: true, // 首次隐藏搜索
      typeIndex: "", // 当前所在的状态
      buttonList: [
        {
          name: "全部商品",
          type: 1
        },
        {
          name: "档口网",
          type: 2
        },
        {
          name: "淘宝",
          type: 3
        },
        {
          name: "天猫",
          type: 4
        },
        {
          name: "抖音",
          type: 5
        }
      ],
      preloads: {}, // 预加载数据列表
      inputList: [
        {
          name: "发布人",
          key: "publisher",
          type: "input"
        },
        {
          name: "货号",
          key: "item_code",
          type: "input"
        },
        {
          name: "源货号",
          key: "source_item_code",
          type: "input"
        },
        {
          name: "状态",
          key: "status",
          type: "select",
          select: "statuses"
        },
        {
          name: "商户",
          key: "merchant_id",
          type: "select",
          select: "merchants"
        },
        {
          name: "日期",
          key: "range_date",
          type: "data"
        }
      ], // 搜索栏内容
      search: {
        publisher: "",
        item_code: "",
        source_item_code: "",
        merchant_id: "",
        target_id: "",
        status: '',
        range_date: [],
        target_flag: 0,
        entry_point: '',
        limit: 10,
        page: 1
      }, // 搜索的数据
      tableHeader: [
        {
          type: "selection",
          width: "55"
        },
        {
          type: "img",
          label: "图片/标题",
          solt: "image_url",
          width: 160,
          name: 'item_name',
        },
        {
          type: "text",
          label: "源货号",
          solt: "source_item_code"
        },
        {
          type: "text",
          label: "系统货号",
          solt: "item_code"
        },
        {
          type: "text",
          label: "参考价格",
          solt: "price",
          sortable: true
        },
        {
          type: "text",
          label: "入库时间",
          solt: "effected_at",
          width: 170
        },
        {
          type: "text",
          label: "来源",
          solt: "merchant_name"
        },
        {
          type: "text",
          label: "发布用户",
          solt: "publisher"
        },
        {
          label: "操作",
          type: "button",
          width: 180,
          buttonList: [
            {
              title: "查看",
              type: "text",
            },
            {
              title: "打回",
              type: "text"
            }
          ]
        }
      ],
      tableData: {}
    };
  },

  created() {
    this.preload();
    this.loadData();
  },

  methods: {
    // 正向和反向搜索
    getOpenCheange(e) {
      this.search.target_flag = e ? 0 : 1
      this.loadData()
    },

    // 点击展开搜索菜单
    openTab() {
      this.isOneOpen = true;
      this.isTab = !this.isTab;
    },

    // 开关搜索菜单
    openSeach() {
      this.isfirst = false;
      this.isOpenSeach = !this.isOpenSeach;
    },

    // 切换按数据
    changeButton(type) {
      this.typeIndex = type;
      this.search.target_id = type;
      this.loadData();
    },

    // 获取预加载数据
    preload() {
      this.axios.ajax({
        type: "POST",
        url: "/item/indexPreview",
        success: res => {
          if (res.status == 0) {
            this.preloads = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },

    // 获取数据列表
    loadData() {
      let search = Object.assign({}, this.search);
      search.range_date = JSON.stringify(search.range_date);
      search.entry_point = 1
      this.axios.ajax({
        type: "POST",
        url: "/item/index",
        data: search,
        success: res => {
          if (res.status == 0) {
            this.tableData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },

    // 切换页码
    pagination(e) {
      this.search = e;
      this.loadData();
    },

    // 搜索和重置返回值
    serchButton(item, type) {
      this.search = item;
      this.search.page = 1;
      this.loadData();
    },

    // 批量提交
    batchUpdata(type) {
      let list = this.$refs.tableList.updateList;
      if (list.length > 0) {
        let ids = [];
        for (let item of list) {
          ids.push(item.id);
        }
        this.updateData(ids, type);
      } else {
        this.$message.warning("请选择要操作的内容");
      }
    },

    // 提交操作请求
    updateData(ids, type) {
      this.axios.ajax({
        type: "POST",
        url: "/item/operate",
        data: {
          ids: JSON.stringify(ids),
          type: type
        },
        success: res => {
          if (res.status == 0) {
            this.$message.success("操作成功");
            this.search.page = 1;
            this.loadData();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },

    // 点击表格里按钮
    clickButton(index, row, title) {
      if (title == "打回") {
        this.updateData([row.id], 1);
      } else if (title == "查看") {
        this.$router.push({ path: "libraryDetails", query: { id: row.id } });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.headerTop {
  display: flex;
  align-items: center;
  padding: 20px;
  .headerIcon {
    padding: 0 20px;
    font-size: 30px;
  }
}
.closeSearchList {
  height: 0px;
  overflow: hidden;
  animation: clestSeach 0.5s;
}
@keyframes clestSeach {
  from {
    height: 136px;
    overflow: hidden;
  }
  to {
    height: 0px;
    overflow: hidden;
  }
}
.openSearchList {
  animation: openSeach 0.5s;
}
@keyframes openSeach {
  from {
    height: 0px;
    overflow: hidden;
  }
  to {
    height: 136px;
    overflow: hidden;
  }
}
.isOpenOne {
  height: 0 !important;
  overflow: hidden !important;
}

.iconFix {
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.iconList {
  width: 30px;
  height: 5px;
  border-radius: 2px;
  background: #c3bfbf;
}
// 上面的那根线
.opentitle {
  animation: opentitleList 0.5s;
  transform: rotate(42deg);
  transform-origin: left center;
}
.closetitle {
  animation: closeitleList 0.5s;
  transform: rotate(0deg);
  transform-origin: left center;
}
@keyframes closeitleList {
  from {
    transform: rotate(42deg);
    transform-origin: left center;
  }
  to {
    transform: rotate(0deg);
    transform-origin: left center;
  }
}
@keyframes opentitleList {
  from {
    transform: rotate(0deg);
    transform-origin: left center;
  }
  to {
    transform: rotate(42deg);
    transform-origin: left center;
  }
}
// 下面的那根线
.openbutton {
  animation: openbotton 0.5s;
  transform: rotate(-42deg);
  transform-origin: left center;
}
.closebutton {
  animation: closebotton 0.5s;
  transform: rotate(0deg);
  transform-origin: left center;
}
@keyframes openbotton {
  from {
    transform: rotate(0deg);
    transform-origin: left center;
  }
  to {
    transform: rotate(-42deg);
    transform-origin: left center;
  }
}
@keyframes closebotton {
  from {
    transform: rotate(-42deg);
    transform-origin: left center;
  }
  to {
    transform: rotate(0deg);
    transform-origin: left center;
  }
}
// 中间的横条
// 下面的那根线
.centerOpen {
  animation: centertop 0.5s;
  width: 0px;
}
.centerClose {
  width: 30px;
  animation: centerBottom 0.5s;
}
@keyframes centertop {
  from {
    width: 30px;
  }
  to {
    width: 0px;
  }
}
@keyframes centerBottom {
  from {
    width: 0px;
  }
  to {
    width: 30px;
  }
}
// 下面是全部商品展开动画
.tabList {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 80px;
  .tabButton {
    display: flex;
    align-items: center;
    .tabButtonItme {
      display: flex;
      padding: 0 20px;
      width: 65px;
      overflow: hidden;
    }
    .tabIcon {
      padding: 5px;
      font-size: 24px;
      color: #409eff;
    }
  }
}

// 动画效果
.openTab {
  width: 100% !important;
  animation: opentabItem 0.6s;
}
@keyframes opentabItem {
  from {
    width: 65px;
    overflow: hidden;
  }
  to {
    width: 100% !important;
    overflow: hidden;
  }
}
.closeTab {
  width: 65px !important;
  animation: closetabItem 0.6s;
}
@keyframes closetabItem {
  from {
    width: 100%;
    overflow: hidden;
  }
  to {
    width: 65px;
    overflow: hidden;
  }
}

// 图标动画
.openIcon {
  color: #33ec31 !important;
  transform: rotate(180deg);
  animation: openIconItem 0.6s;
}
@keyframes openIconItem {
  from {
    color: #409eff;
    transform: rotate(0deg);
  }
  to {
    color: #33ec31;
    transform: rotate(180deg);
  }
}

.closeIcon {
  color: #409eff !important;
  transform: rotate(0deg);
  animation: closeIconItem 0.6s;
}
@keyframes closeIconItem {
  from {
    color: #33ec31;
    transform: rotate(180deg);
  }
  to {
    color: #409eff;
    transform: rotate(0deg);
  }
}
</style>
