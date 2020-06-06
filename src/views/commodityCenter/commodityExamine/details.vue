<template>
  <div style="width: 100%; padding: 20px 20px 40px">
    <div style="margin: 0 0 15px">
      <el-button type="primary" @click="navigateBack">返回</el-button>
    </div>
    <!-- 基本信息 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <detailList :list="extendHeader" :data="details">
          <div slot="propList" class="propsList">
            <div v-for="(item, index) of details.props" :key="index" class="propsItem">
              <span class="sizeColor">{{item.key}} ：</span>
              <el-tooltip class="item" effect="dark" :content="item.value" placement="bottom">
                <span style="overflow: hidden;width: 250px">{{item.value}}</span>
              </el-tooltip>
            </div>
            <!-- 尺码信息 -->
            <div style="width: 100%;" class="colorList">
              <span class="sizeColor">尺码表: </span>
              <table border class="tableStyle">
                <tr>
                  <th>尺码</th>
                  <th v-for="(item,index) of details.size_chart.heads" :key="index">{{item}}</th>
                </tr>
                <tr v-for="(item,index) of details.size_chart.rows" :key="index">
                  <td>{{item.key}}</td>
                  <td v-for="(items,indexs) of item.value" :key="indexs">{{items}}</td>
                </tr>
              </table>
            </div>
            <!-- sku 列表 -->
            <div style="width: 100%" class="colorList">
              <span class="sizeColor">SkU列表: </span>
              <tableList :tableData='details.skus' :tableHeader='skuList' pagin style="width: 90%"></tableList>
            </div>
          </div>
        </detailList>
        <div style="padding: 20px 0;font-weight: bold">图文详情：</div>
        <editor-bar v-model="details.description" :isClear="isClear" ></editor-bar>
        <!-- <vue-ueditor-wrap v-model="details.description" disable :config="myConfig"></vue-ueditor-wrap> -->
      </el-tab-pane>
      <el-tab-pane label="档口网" name="second">
        <listDangkou :list='details.dangkou'></listDangkou>
      </el-tab-pane>
  </el-tabs>

  </div>
</template>
<script>
import EditorBar from '@/components/wangEnduit/index.vue'
import detailList from '@/components/detailList/detailList.vue'
import tableList from "@/components/tableList/tableList.vue";
import listDangkou from '@/components/dangkou/index.vue'
export default {
  components: {detailList, tableList, listDangkou, EditorBar},
  data() {
    return{
      isClear: false,
      activeName: 'first',
      stepValue: {
        heads:[],
        rows: [],
      },
      details: {
        image_url: '',
        prop_images: [],
        size_chart: {
          heads: [],
          rows: [],
        },
        skus: [],
        dangkou: {
          color_supplier_prices: [],
          colors: [],
          tags: [],
          hangtag: {
            gbcode: [],
            specs: [],
            washing_method: [],
          },
        },
      },
      // 颜色列表
      colorHeader: [
        // {
        //   type: 'text',
        //   label: '颜色',
        //   solt: 'props'
        // },
        {
          type: 'img',
          label: '图片',
          solt: 'url',
          name: '',
          title: 'props'
        },
      ],

      skuList: [
        {
          type: 'text',
          label: '名称',
          solt: 'sku_name'
        },
        {
          type: 'text',
          label: '价格',
          solt: 'price'
        },
        {
          type: 'text',
          label: '条码',
          solt: 'barcode'
        },
        {
          type: 'text',
          label: '源条码',
          solt: 'source_barcode'
        },
        {
          type: 'text',
          label: '编号',
          solt: 'sku_code'
        },
        {
          type: 'text',
          label: '源编号',
          solt: 'source_sku_code'
        },
        {
          type: 'text',
          label: '重量',
          solt: 'weight'
        },
      ], // sku列表

      // 扩展信息
      extendHeader: [
        {
          text: '标题', //文字内容
          span: 50, // 占几个位置
          type: 'item_name', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '货号', //文字内容
          span: 50, // 占几个位置
          type: 'item_code', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '源货号', //文字内容
          span: 50, // 占几个位置
          type: 'source_item_code', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '图片', //文字内容
          span: 50, // 占几个位置
          type: 'image_url', // 绑定哪一个数据
          name: 'image', // 属于 文字  图片 数组
        },
        {
          text: '视频', //文字内容
          span: 50, // 占几个位置
          type: 'video_url', // 绑定哪一个数据
          name: 'video', // 属于 文字  图片 数组
        },
        {
          text: '价格', //文字内容
          span: 50, // 占几个位置
          type: 'price', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
          label: '' // 循环绑定的值
        },
        {
          text: '重量', //文字内容
          span: 50, // 占几个位置
          type: 'weight', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '来源名称', //文字内容
          span: 50, // 占几个位置
          type: 'merchant_name', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '颜色表', //文字内容
          span: 50, // 占几个位置
          type: 'prop_images', // 绑定哪一个数据
          name: 'images', // 属于 文字  图片 数组
          label: 'url', // 图片绑定的值
          title: 'props', // 鼠标绑定的值
        },
        {
          text: '更新时间', //文字内容
          span: 50, // 占几个位置
          type: 'modify_time', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '创建时间', //文字内容
          span: 50, // 占几个位置
          type: 'create_time', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
      ],
    }
  },

  created() {
    let id = this.$route.query.id;
    this.loadData(id)
  },

  methods: {
    handleClick() {

    },

    // 返回上一页
    navigateBack() {
      this.$router.go(-1);
    },

    // 获取页面详情内容
    loadData(id) {
      this.axios.ajax({
        type: "POST",
        url: "/item/view",
        data: {
          id: id
        },
        success: res => {
          if(res.status == 0) {
            this.details = res.data
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
  },
}
</script>
<style lang='scss' scoped>
  .propsList{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .propsItem{
      width: 50%;
      padding: 15px;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      box-sizing: border-box;
    }
  }
  .colorList{
    display: flex;
    // justify-content: space-between;
    align-items: center;
  }
  .tableStyle{
    border: 1px solid #EBEEF5;
    margin: 20px;
    th{
      min-width: 50px;
      width: 100px;
      text-align: center;
      padding: 15px 10px;
    }
    td{
      min-width: 50px;
      text-align: center;
      padding: 15px 10px;
    }
  }
  .sizeColor{
    color: #000000;
  }
</style>