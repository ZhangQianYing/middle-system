<template>
  <div class="hearder inputList wrap" >
    <div v-for="(item, index) of inputList" :key="index">
      <!-- 输入框 -->
      <div class="inputList right" v-if="item.type == 'input'">
      	<p>{{item.name}}：</p>
        <el-input :placeholder="'请输入' + item.name" v-model="serachInput[item.key]" clearable></el-input>
      </div>
      <!-- 选择器 -->
      <div class="inputList right" v-if="item.type == 'select'">
      	<p>{{item.name}}：</p>
        <el-select v-model="serachInput[item.key]" clearable :placeholder="'请选择' + item.name">
          <el-option v-for="items in options[item.select]" :key="items.value" :label="items.text" :value="items.value" value-key='items.value'></el-option>
        </el-select>
      </div>
      <!-- 日期 -->
      <div class="inputList right" v-if="item.type == 'data'">
      	<p>{{item.name}}：</p>
        <el-date-picker v-model="serachInput[item.key]" value-format='yyyy-MM-dd' type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
    </div>
    <div class="right">
      <el-button @click="serach(true)" type="primary">搜索</el-button>
    </div>
    <div class="right">
      <el-button @click="serach(false)" type="primary" plain>重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 循环的表
    inputList: {
      type: Array,
      default: () => []
    },
    // 绑定的数据
    serachInput: {
      type: Object,
      default: () => {}
    },
    // 下拉框的值
    options: {
      type: Object,
      default: () => {}
    }
  },
  name: "home",
  data() {
    return {};
  },

  created() {},

  methods: {
    serach(type) {
      if(type) {
        this.serachInput.page = 1
        this.$emit('serchButton', this.serachInput, type)
      } else {
        let serachInput = Object.assign({},this.serachInput)
        for(let key in serachInput) {
          if(typeof(serachInput[key]) == 'string') {
            serachInput[key] = ''
          } else if(typeof(serachInput[key]) == 'object' && key != 'limit') {
            serachInput[key] = []
          } else if(typeof(serachInput[key]) == 'number' && key != 'page' && key != 'limit' ) {
            serachInput[key] = ''
          }
        }
        serachInput.page = 1
        this.$emit('serchButton', serachInput, type)
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.hearder{
  padding: 10px 20px;
  .wrap{
    flex-wrap: wrap;
  }
  .right{
    margin-right: 20px;
  }
}
.inputList{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
  .el-input{
    width: 200px!important;
  }
}
</style>
