<template>
  <div  style="width: 100%">
    <!-- 头部的切换按钮 -->
    <div style="padding: 20px 20px 0">
      <el-button :type="search.filter == item.id ? 'primary' : ''" v-for="(item,index) of preloads.filters" :key="index" @click="checkFilter(item.id)">{{item.name}} ( {{item.quantity}} )</el-button>
    </div>
    <!-- 搜索 -->
    <div>
      <searchList :inputList="inputList" :serachInput='search' @serchButton="serchButton"></searchList>
    </div>
    <!-- 表格 -->
    <div>
      <tableList :tableData='tableData' :tableHeader='tableHeader' @pagination='pagination' :search='search' ref="tableList"></tableList>
    </div>
  </div>
</template>
<script>
import searchList from "@/components/searchList/searchList.vue";
import tableList from "@/components/tableList/tableList.vue";
export default {
  components: { searchList, tableList },
  data() {
    return{
      // 表格头部
      tableHeader: [
        {
          type: 'text',
          label: '账号',
          solt: 'name',
        },
        {
          type: 'text',
          label: '注册手机',
          solt: 'number'
        },
        {
          type: 'text',
          label: '注册时间',
          solt: 'type_text'
        },
        {
          type: 'text',
          label: '账号角色',
          solt: 'type_text'
        },
        {
          type: 'text',
          label: '账号状态',
          solt: 'type_text'
        },
      ],
      // 表格列表
      tableData:{},
      // 预加载
      preloads: {
        filters: [],
      },
      // 搜索列表
      inputList: [
        {
          name: "注册账号/手机",
          key: "account",
          type: "input",
        },
        {
          name: "注册日期",
          key: "account",
          type: "data",
        },
      ],
      // 搜索词
      search: {
        filter: 0,
        account: '',
        range_date: [],
        name: '',
        time: [],
        service_type: '',
        page: 1,
        limit: 10,
      },
    }
  },

  created() {
    this.preload()
    this.loadData()
  },

  methods: {
    // 切换页码触发
    pagination(e) {
      this.search = e
      this.loadData()
    },

    // 点击切换标签
    checkFilter(id) {
      this.search.filter = id
      this.search.page = 1
      this.loadData()
    },

    // 点击搜索和重置
    serchButton(e) {
      this.search = e
    },

    // 预加载信息
    preload() {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/shop/preview",
        success: res => {
          if(res.status == 0) {
            this.preloads = res.data
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

    // 获取列表
    loadData() {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/shop/index",
        data: this.search,
        success: res => {
          if(res.status == 0) {
            this.tableData = res.data
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
  },
}
</script>