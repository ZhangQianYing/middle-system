<template>
  <div>
    <!-- <div class="headerTitle">
      <span>吊牌：</span>
    </div> -->
    <detailList :list="extendHeader" :data="list.hangtag"></detailList>

      <!-- 标签列表 -->
    <div class="headerTitle">
      <span>标签列表: </span>
      <tableList :tableData='list.tags' :isShow="false" :tableHeader='tagHeader' pagin style="width: 90%"></tableList>
    </div>

    <!-- 展示数据表格 -->
    <div class="headerTitle">
      <span>颜色列表: </span>
      <tableList :tableData='list.colors' :tableHeader='colorHeader' pagin style="width: 90%"></tableList>
    </div>

    <!-- 展示数据表格 -->
    <div class="headerTitle">
      <span>供应商价格表: </span>
      <tableList :tableData='list.color_supplier_prices' :tableHeader='piceHeader' pagin style="width: 87%"></tableList>
    </div>


  </div>
</template>
<script>
import detailList from '@/components/detailList/detailList.vue'
import tableList from "@/components/tableList/tableList.vue";
export default {
  components: { detailList, tableList },
  props: {
    list: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return{
      tagHeader: [
        {
          type: 'text',
          label: '类别',
          solt: 'key'
        },
        {
          type: 'text',
          label: '值',
          solt: 'value'
        },
      ],

      // 洗剂方式
      washHeader: [
         {
          type: 'text',
          label: '方式',
          solt: 'key'
        },
        {
          type: 'text',
          label: '操作',
          solt: 'value'
        },
      ],

      // 规格列表
      specsHeader: [
        {
          type: 'text',
          label: '尺码',
          solt: 'key'
        },
        {
          type: 'text',
          label: '规格',
          solt: 'value'
        },
      ],

      // 供应商价格表
      piceHeader: [
        {
          type: 'index'
        },
        {
          type: 'text',
          label: '供应商',
          solt: 'supplier'
        },
        {
          type: 'text',
          label: '颜色',
          solt: 'color_name'
        },
        {
          type: 'text',
          label: '价格',
          solt: 'price'
        },
        {
          type: 'isText',
          label: '是否主供应商',
          solt: 'is_main',
          isTrue: '主供应商'
          // disabled: true
        },
      ],

      // 颜色列表
      colorHeader: [
        {
          type: 'index'
        },
        {
          type: 'text',
          label: '颜色名称',
          solt: 'color_name'
        },
        {
          type: 'text',
          label: '供应商',
          solt: 'supplier'
        },
        {
          type: 'text',
          label: '货号',
          solt: 'number'
        },
        {
          type: 'text',
          label: '供应价',
          solt: 'price_purchase'
        },
        {
          type: 'text',
          label: '最低价',
          solt: 'price_min'
        },
        {
          type: 'text',
          label: '普通会员价',
          solt: 'price_supply'
        },
        {
          type: 'img',
          label: '主图',
          solt: 'image',
          name: '',
          title: ''
        },
        {
          type: 'img',
          label: '修正主图',
          solt: 'mod_image',
          name: '',
          title: ''
        },
      ],

      // 文本列表
      extendHeader: [
        {
          text: '货号', //文字内容
          span: 50, // 占几个位置
          type: 'number', // 绑定哪一个数据
          name: 'text', // 属于 文字  图片 数组
        },
        {
          text: '图片',
          span: 50,
          type: 'image',
          name: 'image',
        },
        {
          text: '品名',
          span: 50,
          type: 'name',
          name: 'text',
        },
        {
          text: '价格',
          span: 50,
          type: 'price',
          name: 'text',
        },
        {
          text: '质量等级',
          span: 50,
          type: 'quality_level',
          name: 'text',
        },
        {
          text: '成分',
          span: 50,
          type: 'composition',
          name: 'text',
        },
        {
          text: '执行标准',
          span: 50,
          type: 'executive_standard',
          name: 'text',
        },
        {
          text: '安全标准',
          span: 50,
          type: 'security_level',
          name: 'text',
        },
        {
          text: '质检员',
          span: 50,
          type: 'inspector',
          name: 'text',
        },
        {
          text: '服务热线',
          span: 50,
          type: 'hotline',
          name: 'text',
        },
        {
          text: '生产企业',
          span: 50,
          type: 'enterprise',
          name: 'text',
        },
        {
          text: '生产地址',
          span: 50,
          type: 'location',
          name: 'text',
        },
        {
          text: '国标码',
          span: 50,
          type: 'gbcode',
          name: 'table',
          show: false,
          header: [
            {
              type: 'text',
              label: '尺码',
              solt: 'key'
            },
            {
              type: 'text',
              label: '规格',
              solt: 'value'
            },
          ],
        },
        {
          text: '规格列表',
          span: 50,
          type: 'specs',
          name: 'table',
          show: false,
          header: [
            {
              type: 'text',
              label: '尺码',
              solt: 'key'
            },
            {
              type: 'text',
              label: '规格',
              solt: 'value'
            },
          ],
        },
        {
          text: '洗剂方式',
          span: 50,
          type: 'washing_method',
          name: 'table',
          show: false,
          header: [
            {
              type: 'text',
              label: '尺码',
              solt: 'key'
            },
            {
              type: 'text',
              label: '规格',
              solt: 'value'
            },
          ],
        },
      ],
    }
  },

  created() {

  },

  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .headerTitle{
    width: 100%;
    span{
      font-weight: bold;
    }
  }
</style>