<template>
  <div style="width: 100%;height: 100%">
    <!-- 顶部的操作按钮 -->
    <div style="display: flex;padding: 20px 20px 0" class="buttonInput">
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加网关</el-button>
      </div>
      <div>
        <el-input placeholder="请输入名称" v-model="search.name" style="width: 200px;margin-right: 20px"></el-input>
        <el-button  type="primary" @click="searchName('list')">搜索</el-button>
      </div>
    </div>
    <!-- 下面的有边框 -->
    <div style="height: 100%">
      <tableList :tableData='tableData' :tableHeader='sourceHeader' :search='search' @setTable='setTable' @pagination='pagination' ref="tableList" @change='clickButton'></tableList>
    </div>

    <!-- 右侧侧拉框 -->
    <el-drawer :visible.sync="openDrawer" :with-header="false" size="50%">
      <div style="padding: 20px">
        <el-input placeholder="请输入名称" v-model="userSearch.name" style="width: 200px"></el-input>
        <el-button @click="searchName('user')">搜索</el-button>
      </div>
      <div style="height: 100%">
        <tableList :tableData='userData' :tableHeader='userHeader' @setTable='setUserTable' :search='userSearch' @pagination='userPagination' ref="tableList" @change='clickButton'></tableList>
      </div>
    </el-drawer>

    <!-- 添加弹窗 -->
    <el-dialog title="新增网关" :visible.sync="dialogFormVisible" width='350px'>
      <el-form :model="addGateway">
        <el-form-item label="名称:">
          <el-input v-model="addGateway.name" autocomplete="off" style="width: 200px" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input v-model="addGateway.code" autocomplete="off" style="width: 200px" @input='verification' placeholder="请输入编号" maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="是否启用:">
          <el-switch :value="addGateway.enabled == 0 ? false : true" active-color="#13ce66" inactive-color="#ff4949" @change="changSwitch('enabled',$event)"></el-switch>
        </el-form-item>
        <el-form-item label="是否免审:">
          <el-switch :value="addGateway.advanced == 0 ? false : true" active-color="#13ce66" inactive-color="#ff4949" @change="changSwitch('advanced',$event)"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upGateway">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tableList from "@/components/tableList/tableList.vue";
export default {
  components: { tableList },
  data() {
    return{
      dialogFormVisible: false, // 新增控制
      addGateway: {
        name: '',
        enabled: 0,
        advanced: 0,
        code: '',
      }, // 增加网关
      openDrawer: false, // 打开划窗
      search: {
        name: '',
        page: 1,
        limit: 10
      },
      tableData: {},
      userSearch: {
        merchant_id: '',
        page: 1,
        limit: 10,
        name: '',
      }, // 用户来源
      userData: {}, // 用户来源的列表
      userHeader: [
        {
          type: 'index'
        },
        {
          type: 'text',
          label: '商户名称',
          solt: 'name'
        },
        {
          type: 'switch',
          label: '是否启用',
          solt: 'enabled'
        },
        {
          type: 'switch',
          label: '是否免检',
          solt: 'advanced'
        },
        {
          type: 'text',
          label: '创建时间',
          solt: 'created_at'
        },
      ], // 用户的头信息
      sourceHeader: [
        {
          type: 'index'
        },
        {
          type: 'text',
          label: '商户名称',
          solt: 'name'
        },
        {
          type: 'text',
          label: '编号',
          solt: 'code'
        },
        {
          type: 'switch',
          label: '是否启用',
          solt: 'enabled'
        },
        {
          type: 'switch',
          label: '是否免检',
          solt: 'advanced'
        },
        {
          type: 'text',
          label: '创建时间',
          solt: 'created_at'
        },
         {
          label: '操作',
          type: 'button',
          width: 300,
          buttonList: [
            {
              title: "查看",
              type: 'success'
            },
            {
              title: "修改网关",
              type: 'warning'
            },
            {
              title: "删除网关",
              type: 'danger'
            }
          ],
        },
      ], // 来源地址
      // 来源用户
      tableHeader: [
        {
          type: 'index',
        },
        {
          type: 'text',
          label: '用户',
          solt: 'source_item_code'
        },
        {
          type: 'text',
          label: '上传数量（款）',
          solt: 'item_code'
        },
        {
          type: 'switch',
          label: '允许推送',
          solt: 'item_code'
        },
        {
          type: 'switch',
          label: '免审',
          solt: 'item_code'
        },
        {
          type: 'text',
          label: '接入时间',
          solt: 'item_code'
        },
      ],
    }
  },

  created(){
    this.loadData()
  },

  methods: {
    // 输入编号时进行验证只能输入英文和数字
    verification(e) {
      this.addGateway.code = e.replace(/[\W]/g,'')
    },

    // 搜索网关
    async searchName(type) {
      if(type == 'list') {
        this.loadData()
      } else if(type == 'user') {
        let type = await this.updataMerchant('/merchant/user/index',this.userSearch)
        if(type) {
          this.userData = type.data
          this.openDrawer = true
        }
      }
    },

    // 添加网关的权限选择的操作
    changSwitch(type,e) {
      this.addGateway[type] = e ? 1 : 0
    },

    // 添加网关
    upGateway() {
      if(this.addGateway.name == '') {
        this.$message.warning('网关名称不能为空')
      } else if(this.addGateway.code == '') {
        this.$message.warning('编号不能为空')
      } else {
        this.axios.ajax({
          type: "POST",
          url: '/merchant/add',
          data: this.addGateway,
          success: res => {
            if(res.status == 0) {
              this.addGateway = {
                name: '',
                enabled: 0,
                advanced: 0,
              }
              this.$message.success('新增成功')
              this.dialogFormVisible = false
              this.loadData()
            } else {
              this.$message.error(res.msg)
            }
          }
        })
      }
    },

    // 点击用户时触发
   async setUserTable(e,item) {
     let serarch = {
       merchant_id: this.userSearch.merchant_id,
       id: item.id,
       enabled: item.enabled,
       advanced: item.advanced
     }
       let updataType = await this.updataMerchant('/merchant/user/update',serarch)
       if (updataType) {
        this.$message.success(updataType.msg)
        this.updataMerchant('/merchant/user/index',this.userSearch)
      }
    },

    // 切换开关状态
   async setTable(e,item) {
      let updataType = await this.updataMerchant('/merchant/update',item)
      if (updataType) {
        this.$message.success(updataType.msg)
        this.search.page = 1
        this.loadData()
      }
    },

    // 更新权限
    updataMerchant(url,item) {
     return new Promise((resolve) => {
        this.axios.ajax({
        type: "POST",
        url: url,
        data: item,
        success: res => {
          //  return res
          if(res.status == 0) {
           resolve(res)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
     })
    },

    // 切换页码
    pagination(e) {
      this.search = e
      this.loadData()
    },

    // 用户模块切换页码
    userPagination(e) {
      this.userSearch = e
      this.updataMerchant('/merchant/user/index',this.userSearch)
    },

    // 点击表格内的操作按钮的返回值
    async clickButton(index, item, title) {
      if(title == '查看') {
        this.userSearch.merchant_id = item.id
        let type = await this.updataMerchant('/merchant/user/index',this.userSearch)
        if(type) {
          this.userData = type.data
          this.openDrawer = true
        }
      } else if(title == '修改网关') {
        this.$prompt('请输入', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.name,
        }).then( async ({ value }) => {
          if(value == '') {
            this.$message({
              type: 'error',
              message: '网关不能为空'
            });
          } else {
            item.name = value
            let updataType = await this.updataMerchant('/merchant/update',item)
            if (updataType) {
              this.$message.success(updataType.msg)
              this.loadData()
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      } else if(title == '删除网关') {
        this.openDelete(item)
      }
    },

    // 打开删除确认弹窗
    openDelete(item) {
      this.$confirm('此操作将永久删除该网关, 是否继续?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 删除请求
    delete(item) {
      this.axios.ajax({
        type: "POST",
        url: "/merchant/delete",
        data: {
          id: item.id
        },
        success: res => {
          if(res.status == 0) {
            this.$message.success('删除成功')
            this.loadData()
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },

     // 获取数据列表
    loadData() {
      let search = Object.assign({},this.search)
       this.axios.ajax({
        type: "POST",
        url: "/merchant/index",
        data: search,
        success: res => {
          if(res.status == 0) {
            this.tableData = res.data
          }
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.buttonInput{
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
}
</style>
