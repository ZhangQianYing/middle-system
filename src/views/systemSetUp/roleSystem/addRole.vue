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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="tableData.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input type="textarea" v-model="tableData.desc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="系统类型" prop="region">
          <el-select v-model="tableData.scope_id" placeholder="请选择系统类型" @change="getScope">
            <el-option :label="item.text" :value="item.value" v-for="(item, index) of tableData.scopes" :key="index" value-key='item.value'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 选择角色权限 -->
      <div>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree class="filter-tree" :data="tableData.resource" :default-checked-keys="checkoutList" :props="defaultProps" @check='checkSwitch' node-key="id" default-expand-all show-checkbox :filter-node-method="filterNode" ref="tree"></el-tree>
      </div>

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
      updataCheck: {
        menu: [],
        elements: [],
      },
      checkoutList: [ "10026", "10027"], // 已经选中的项
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }, // 定义子节点的值
      searchId: '', // 切换类型的时候触发
      isUpdata: false, // 判断是新增还是更新
      tableData: {
        desc: '',
        name: '',
        resource: [],
        checkoutList:[],
        scope_id: 3
      }, // 获取数据详情
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      } // 验证数据
    };
  },

  created() {
    let id = this.$route.query.id;
    this.searchId = id
    this.loadData(id);
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    // 获取选中的下拉
    getScope(e) {
      console.log(e)
      this.tableData.scope_id = e
      this.getLoadData()
    },

    // 切换选中触发
    checkSwitch(e,type) {
      let data = []
      for(let item of type.checkedNodes) {
        if(item.children.length == 0) {
          data.push(item.id)
        }
      }
      this.checkoutList = data
    },

    // 获取列表
    getLoadData() {
      let search = {
        id: this.searchId,
        scope_id: this.tableData.scope_id
      }
      this.axios.ajax({
        type: "POST",
        url: 'http://api.super-admin.djson.cn/role/refreshTree',
        data: search,
        success: res => {
          this.tableData.resource = res.data.resource
          this.getName(res.data.resource)
        }
      })
    },

    // 循环修改绑定
    getName(e) {
      for(let item of e) {
        if(item.children.length > 0) {
          this.getName(item.children)
        } else if(item.checked){
          this.checkoutList.push(item.id)
          console.log(item.id,item)
        }
        item.label = item.name
      }
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

     // 返回上一页
    navigateBack() {
      this.$router.go(-1);
    },

    // 新增或者更新的时候使用
    updataList() {
      console.log(this.$refs.tree.defaultCheckedKeys)
      let updata = this.tableData
      updata.id = this.searchId
      updata.checkoutList = JSON.stringify(updata.checkoutList)
      delete updata.resource
      delete updata.scopes
      console.log(updata)
      // let updata = Object.assign({},this.tableData)
      // if(updata.name == '') {
      //   this.$message.error('姓名不能为空')
      //   return
      // }
      // if(updata.mobile == '' || !(/^1[3-9]\d{9}$/.test(updata.mobile))) {
      //   this.$message.error('手机号错误')
      //   return
      // }
      // if(updata.password == '') {
      //   this.$message.error('密码未设置')
      //   return
      // }
      // updata.roles = JSON.stringify(updata.roles)
      // if(this.isUpdata) {
      //   // 传参数，地址和数据
      // } else {

      // }
    },

    // 新增或者更新
    update(url, data) {
      this.axios.ajax({
        type: "POST",
        url: url,
        data: data,
        success: res => {
          if (res.status == 0) {
            this.$message.siccess('操作成功');
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
        url: "http://api.super-admin.djson.cn/role/viewDetail",
        data: {
          id: id
        },
        success: res => {
          if (res.status == 0) {
            this.tableData = res.data;
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