<template>
  <div style="width: 100%">
    <div style="margin: 30px">
      <el-button type="primary" @click="navigateBack">返回</el-button>
    </div>
    <div style="width: 600px;margin: 0 auto;padding: 30px">
      <el-form
        :model="tableData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="tableData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.number="tableData.mobile" maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="tableData.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="tableData.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表格内容 -->
      <el-table
        ref="multipleTable"
        :data="preloads"
        tooltip-effect="dark"
        border
        size='medium'
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="员工角色"></el-table-column>
        <el-table-column align="center" prop="desc" label="角色说明" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="padding: 30px;text-align: center">
        <el-button type="primary" @click="updataList" style="width: 150px">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      preloads: [],
      isUpdata: false, // 判断是新增还是更新
      tableData: {
        name: "",
        mobile: "",
        status: "",
        remark: "",
        password: "",
        roles: []
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: []
      } // 验证数据
    };
  },

  created() {
    let id = this.$route.query.id;
    this.preload();
    // 判断有没有id ,有的话就获取数据，没有的话就不获取
    if (id) {
      this.isUpdata = true;
      this.loadData(id);
    } else {
      this.rules.password = [{ required: true, message: "请输入密码", trigger: "blur" }]
      this.isUpdata = false;
    }
  },

  methods: {
     // 返回上一页
    navigateBack() {
      this.$router.go(-1);
    },

    // 新增或者更新的时候使用
    updataList() {
      let updata = Object.assign({},this.tableData)
      if(updata.name == '') {
        this.$message.warning('姓名不能为空')
        return
      }
      if(updata.mobile == '' || !(/^1[3-9]\d{9}$/.test(updata.mobile))) {
        this.$message.warning('手机号错误')
        return
      }
      if(updata.password == '' && !this.isUpdata) {
        this.$message.warning('密码未设置')
        return
      }
      updata.roles = JSON.stringify(updata.roles)
      if(this.isUpdata) {
        // 传参数，地址和数据
        this.update('http://api.super-admin.djson.cn/user/update',updata)
      } else {
        this.update('http://api.super-admin.djson.cn/user/add',updata)
      }
    },

    // 新增或者更新
    update(url, data) {
      this.axios.ajax({
        type: "POST",
        url: url,
        data: data,
        success: res => {
          if (res.status == 0) {
            this.$message.success('操作成功');
            this.navigateBack()
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },

    // 默认选中的项，编辑的时候使用
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(e) {
      if (e.length == 0) {
        this.tableData.roles = e;
      } else {
        let ids = [];
        for (let item of e) {
          ids.push(item.id);
        }
        this.tableData.roles = ids;
      }
    },

    // 获取预加载数据
    preload() {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/user/save/preview",
        success: res => {
          if (res.status == 0) {
            this.preloads = res.data;
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },

    // 获取页面数据
    loadData(id) {
      this.axios.ajax({
        type: "POST",
        url: "http://api.super-admin.djson.cn/user/viewDetail",
        data: {
          id: id
        },
        success: res => {
          if (res.status == 0) {
            this.tableData = res.data;
            setTimeout(() => {
              let list = this.getUser(res.data.roles);
              this.toggleSelection(list);
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },

    // 查找预加载数据中满足条件的已选择的数据
    getUser(roles) {
      if (roles.length == 0) {
        return;
      } else {
        let list = [];
        for (let item of roles) {
          for (let items of this.preloads) {
            if (item == items.id) {
              list.push(items);
            }
          }
        }
        return list;
      }
    }
  }
};
</script>