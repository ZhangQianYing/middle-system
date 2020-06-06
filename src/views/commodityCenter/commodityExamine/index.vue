<template>
  <div style="width: 100%">
    <div class="headerTop">
      <div class="iconFix" @click="openSeach">
        <p class="iconList " :class="isOpenSeach ? 'opentitle' : isfirst ? '' : 'closetitle'"></p>
        <p class="iconList" :class="isOpenSeach ? 'centerOpen' : isfirst ? '' : 'centerClose'"></p>
        <p class="iconList" :class="isOpenSeach ? 'openbutton' : isfirst ? '' : 'closebutton'"></p>
      </div>
      <div :class="isOpenSeach ? 'openSearchList' : isfirst ? 'isOpenOne' : 'closeSearchList'" >
        <searchList :inputList="inputList" :serachInput='search' :options='preloads' @serchButton="serchButton"></searchList>
      </div>
    </div>
    <div style="padding: 0 20px">
      <el-button type="primary" @click="batchUpdata(1)">批量通过</el-button>
      <el-button type="success" @click="batchUpdata(2)">批量拒绝</el-button>
    </div>
    <tableList :tableData='tableData' :tableHeader='tableHeader' @pagination='pagination' :search='search' ref="tableList" @change='clickButton'></tableList>
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
      isOpenSeach: false, // 搜索栏是否显示
      isfirst: true, // 首次隐藏搜索
      preloads: {}, // 预加载数据列表
      inputList: [
        {
          name: "发布人",
          key: "publisher",
          type: "input",
        },
        {
          name: "货号",
          key: "item_code",
          type: "input",
        },
        {
          name: "源货号",
          key: "source_item_code",
          type: "input",
        },
        {
          name: "商户",
          key: "merchant_id",
          type: "select",
          select: 'merchants',
        },
        {
          name: "状态",
          key: "status",
          type: "select",
          select: 'statuses',
        },
        {
          name: "去向",
          key: "target_id",
          type: "select",
          select: 'targets',
        },
        {
          name: "日期",
          key: "range_date",
          type: "data",
        }
      ], // 搜索栏内容
      search: {
        publisher: '',
        item_code: '',
        source_item_code: '',
        merchant_id: '',
        status: '',
        target_id: '',
        range_date: [],
        entry_point: '',
        limit: 10,
        page: 1,
      }, // 搜索的数据
      tableHeader: [
        {
          type: 'selection',
          width: '55'
        },
        {
          type: 'img',
          label: '图片/标题',
          solt: 'image_url',
          name: 'item_name',
        },
        {
          type: 'text',
          label: '货号',
          solt: 'item_code'
        },
        {
          type: 'text',
          label: '来源',
          solt: 'merchant_name'
        },
        {
          type: 'text',
          label: '创建时间',
          solt: 'created_at',
          sortable: true,
          width: 150,
        },
        {
          type: 'text',
          label: '发布用户',
          solt: 'publisher'
        },
        {
          label: '操作',
          type: 'button',
          width: 240,
          buttonList: [
            {
              title: "查看",
              type: 'primary'
            },
            {
              title: "通过",
              type: 'success',
            },
            {
              title: "拒绝",
              type: 'danger',
            },
          ],
        },

      ],
      tableData: {},
    };
  },

  created() {
    this.preload()
    this.loadData()
  },

  methods: {
    // 开关搜索菜单
    openSeach() {
      this.isfirst = false
      this.isOpenSeach = !this.isOpenSeach
    },

    // 获取预加载数据
    preload() {
      this.axios.ajax({
        type: "POST",
        url: "/item/indexPreview",
        success: res => {
          if(res.status == 0) {
            this.preloads = res.data
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

    // 获取数据列表
    loadData() {
      let search = Object.assign({},this.search)
      search.range_date = JSON.stringify(search.range_date)
      search.entry_point = 2
       this.axios.ajax({
        type: "POST",
        url: "/item/index",
        data: search,
        success: res => {
          if(res.status == 0) {
            this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

    // 切换页码
    pagination(e) {
      this.search = e
      this.loadData()
    },

    // 搜索和重置返回值
    serchButton(item, type) {
      this.search = item
      this.search.page = 1
      this.loadData()
    },

    // 批量提交
    batchUpdata(type) {
      let list = this.$refs.tableList.updateList
      if(list.length > 0) {
        let ids = []
        for(let item of list) {
          ids.push(item.id)
        }
        this.updateData(ids, type)
      } else {
        this.$message.warning('请选择要操作的内容')
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
          if(res.status == 0) {
           this.$message.success('操作成功');
            this.search.page = 1
            this.loadData()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

    // 点击表格里按钮
    clickButton(index, row, title) {
      if(title == '通过') {
        this.updateData([row.id], 1)
      } else if(title == '拒绝') {
        this.updateData([row.id], 2)
      } else if(title == '查看') {
        this.$router.push({ path: "examineDetails",query: {id: row.id} })
      }
    },

  }
};
</script>

<style lang="scss" scoped>
.headerTop{
  display: flex;
  align-items: center;
  padding: 20px;
  .headerIcon{
    padding: 0 20px;
    font-size: 30px;
  }
}
.closeSearchList{
  height: 0px;
  overflow: hidden;
  animation: clestSeach 0.5s;
}
@keyframes clestSeach
{
from {height: 136px;overflow: hidden;}
to {height: 0px;overflow: hidden;}
}
.openSearchList{
  animation: openSeach 0.5s;
}
@keyframes openSeach
{
from {height: 0px;overflow: hidden;}
to {height: 136px;overflow: hidden;}
}
.isOpenOne{
  height: 0!important;
  overflow: hidden!important;
}

.iconFix{
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.iconList{
  width: 30px;
  height: 5px;
  border-radius: 2px;
  background: #c3bfbf;
}
// 上面的那根线
.opentitle{
  animation: opentitleList 0.6s;
  transform:rotate(42deg);
  transform-origin: left center;
}
.closetitle{
  animation: closeitleList 0.6s;
  transform:rotate(0deg);
  transform-origin: left center;
}
@keyframes closeitleList{
  from {transform:rotate(42deg);transform-origin: left center;}
  to {transform:rotate(0deg);transform-origin: left center;}
}
@keyframes opentitleList{
  from {transform:rotate(0deg);transform-origin: left center;}
  to {transform:rotate(42deg);transform-origin: left center;}
}
// 下面的那根线
.openbutton{
  animation: openbotton 0.6s;
  transform:rotate(-42deg);
  transform-origin: left center;
}
.closebutton{
  animation: closebotton 0.6s;
  transform:rotate(0deg);
  transform-origin: left center;
}
@keyframes openbotton{
  from {transform:rotate(0deg);transform-origin: left center;}
  to {transform:rotate(-42deg);transform-origin: left center;}
}
@keyframes closebotton{
  from {transform:rotate(-42deg);transform-origin: left center;}
  to {transform:rotate(0deg);transform-origin: left center;}
}
// 中间的横条
// 下面的那根线
.centerOpen{
  animation: centertop 0.6s;
  width: 0px;
}
.centerClose{
  width: 30px;
  animation: centerBottom 0.6s;
}
@keyframes centertop{
  from {width: 30px}
  to {width: 0px}
}
@keyframes centerBottom{
  from {width: 0px}
  to {width: 30px}
}
</style>
