<template>
  <div  style="width: 100%">
    <!-- 搜索 -->
    <div>
      <searchList :inputList="inputList" :serachInput='search' :options='preloads' @serchButton="serchButton"></searchList>
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
          label: '注册手机',
          solt: 'number'
        },
        {
          type: 'text',
          label: '来源',
          solt: 'number'
        },
        {
          type: 'text',
          label: '联系人',
          solt: 'number'
        },
        {
          type: 'text',
          label: '姓名/企业名称',
          solt: 'number'
        },
        {
          type: 'text',
          label: '申请合作类型',
          solt: 'number'
        },
        {
          type: 'text',
          label: '授权类型',
          solt: 'number'
        },
        {
          type: 'text',
          label: '申请时间',
          solt: 'type_text'
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
          name: "姓名/企业名称",
          key: "account",
          type: "input",
        },
        {
          name: "申请合作类型",
          key: "scope_id",
          type: "select",
          select: 'service_type',
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

    // 点击搜索和重置
    serchButton(e) {
      this.search = e
    },

    // 预加载信息
    preload() {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/shop/qualificationPreview",
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
        url: "http://api.super-admin.djson.cn/shop/indexAuditing",
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