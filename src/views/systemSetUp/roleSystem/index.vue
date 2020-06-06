<template>
  <div style="width: 100%">
    <div>
      <searchList :inputList="inputList" :serachInput='search' :options='preloads' @serchButton="serchButton"></searchList>
    </div>
    <div style="padding: 0 30px">
      <el-button type="primary" @click="addButton">新增</el-button>
      <el-dropdown split-button type="success" @click='batchClick' @command='commandClick' style="margin-left: 20px">
        批量{{batchTitle}}
        <el-dropdown-menu slot="dropdown" trigger='click'>
          <el-dropdown-item command='启用'>启用</el-dropdown-item>
          <el-dropdown-item command='停用'>停用</el-dropdown-item>
          <el-dropdown-item command='删除'>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <tableList :tableData='tableData' :tableHeader='tableHeader' @pagination='pagination' :search='search' ref="tableList" @change='clickButton'>
     </tableList>

  </div>
</template>
<script>
import searchList from "@/components/searchList/searchList.vue";
import tableList from "@/components/tableList/tableList.vue";
export default {
  components: { searchList, tableList },
  data() {
    return{
      // 批量按钮默认值
      batchTitle: '启用',
      tableHeader: [
        {
          type: 'selection',
          width: '55'
        },
        {
          type: 'text',
          label: '角色名称',
          solt: 'name',
        },
        {
          type: 'text',
          label: '员工数量',
          solt: 'number'
        },
        {
          type: 'text',
          label: '类型',
          solt: 'type_text'
        },
        {
          type: 'text',
          label: '状态',
          solt: 'status_text'
        },
        {
          type: 'text',
          label: '系统',
          solt: 'scope_name'
        },
        {
          type: 'text',
          label: '角色说明',
          solt: 'desc',
          width: 280
        },
        {
          label: '操作',
          type: 'Button',
          width: 250,
          isHave: false,
          buttonList: [
            {
              title: "编辑",
              isOpen: false,
              plain: true,
              type: 'success'
            },
            {
              title: "停用",
              open: '启用',
              plain: true,
              isOpen: true,
              type: 'success',
              types: 'danger',
            },
            {
              title: "删除",
              plain: true,
              isOpen: false,
              type: 'warning',
            },
          ],
        },
      ], // 表格头部
      preloads: {}, // 预加载数据
      tableData: {}, // 列表数据
       inputList: [
         {
          name: "状态",
          key: "status",
          type: "select",
          select: 'status',
        },
        {
          name: "系统",
          key: "scope_id",
          type: "select",
          select: 'scopes',
        },
        {
          name: "用户名称",
          key: "name",
          type: "input",
        },
      ], // 搜索词关键字
      // 搜素
      search: {
        scope_id: '',
        name: '',
        status: -1,
        page: 1,
        limit: 10
      },
    }
  },

  created() {
    this.preload()
    this.loadData()
  },

  methods: {
    // 选中下拉菜单触发
    commandClick(name) {
      this.batchTitle = name
      console.log(name)
    },

    // 点击批量操作按钮
    batchClick() {
      console.log(this.$refs.tableList.updateList)
      let dataList = this.$refs.tableList.updateList
      let ids = []
      if (dataList.length > 0) {
        for(let item of dataList) {
          ids.push(item.id)
        }
      } else {
        this.$message.warning('请选择你要操作的内容')
        return
      }
      let type
      console.log(this.batchTitle)
      if (this.batchTitle == '删除') {
        type = -1
      } else if (this.batchTitle == '启用') {
        type = 1
      } else if (this.batchTitle == '停用') {
        type = 0
      }
      let data = {
        ids: ids,
        type: type
      }
      this.deactivation(data)
    },

    // 新增跳转
    addButton() {
      this.$router.push({ path: "addRole", query: {id: -1} })
    },

    // 点击内部按钮触发
    clickButton(index, row, title) {
      if(title == '编辑') {
        this.$router.push({ path: "addRole",query: {id: row.id} })
      } else if(title == '停用') {
        this.deactivation({ids: [row.id],type: row.status == 1 ? 2 : 1 })
      }
    },

    // 启用和禁用
    deactivation(data) {
      data.ids = JSON.stringify(data.ids)
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/role/operate",
        data: data,
        success: res => {
          if(res.status == 0) {
            this.$message.success('操作成功')
            this.loadData()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

    // 切换页码触发
    pagination(e) {
      this.search = e
      this.loadData()
    },

    // 搜索或者重置
    serchButton(e, type) {
      this.search = e
      if (!type) {
        this.search.status = -1
      }
      this.loadData()
    },

    // 获取角色列表
    loadData() {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/role",
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

    // 获取预加载数据
    preload() {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/role/preview",
        success: res => {
          if(res.status == 0) {
            this.preloads = res.data
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
  },
}
</script>