<template>
  <div>
    <div class="outerLayer">
      <div v-for="(item, index) of list" :key="index" :style="{width: item.span + '%'}">
           <!-- 当内容只是个文字展示 -->
        <div v-if="item.name == 'text'" style="padding: 15px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
          <span class="sizeColor">{{item.text}}：</span>
          <el-tooltip class="item" effect="dark" :content="data[item.type]" placement="bottom">
            <span style="overflow: hidden;width: 250px">{{data[item.type]}}</span>
          </el-tooltip>
        </div>

           <!-- 做多行内容展示的 -->
        <div v-if="item.name == 'textList'" style="padding: 15px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
          <span class="sizeColor">{{item.text}}：</span>
          <el-tooltip class="item" effect="dark" :content="getList(data, item.type, item.label)" placement="bottom">
            <span>{{getList(data, item.type, item.label)}}</span>
          </el-tooltip>
        </div>

        <!-- 当内容是视频展示 -->
        <div v-if="item.name == 'video'" class="imgFlex" style="padding: 15px">
          <span class="sizeColor">{{item.text}}：</span>
          <video width="150" height="120" controls>
            <source :src="data[item.type]" type="video/mp4">
            <source :src="data[item.type]" type="video/ogg">
            <source :src="data[item.type]" type="video/webm">
            <object :data="data[item.type]" width="150" height="120">
              <embed :src="data[item.type]" width="150" height="120">
            </object>
          </video>
        </div>

        <!-- 当内容是图片展示 -->
        <div v-if="item.name == 'image'" class="imgFlex" style="padding: 15px">
          <span class="sizeColor">{{item.text}}：</span>
          <el-image class="imgStyle" :src="data[item.type]" v-if="data[item.type]  != ''" :preview-src-list="[data[item.type]]" fit="contain"></el-image>
          <el-image v-else class="imgStyle" :src="noImg" :preview-src-list="[noImg]" fit="contain"></el-image>
        </div>

        <!-- 当内容是多张图片展示 -->
        <div v-if="item.name == 'images'" class="imgFlex">
          <div class="sizeColor">{{item.text}}：</div>
          <div class="imgOver">
            <div v-for="(items,indexs) of data[item.type]" :key="indexs">
              <el-image v-if="typeof(items) == 'string' ? items != '' : items[item.label] != ''" class="imgStyle" :src="typeof(items) == 'string' ? items : items[item.label]" :preview-src-list="[items[item.label]]" :title="items[item.title]"  fit="contain"></el-image>
              <el-image v-else class="imgStyle" :src="noImg" :preview-src-list="[noImg]" :title="items[item.title]"  fit="contain"></el-image>
            </div>
          </div>
        </div>

         <!-- 展示表格内容 -->
        <div v-if="item.name == 'table'" class="imgFlex">
          <span class="sizeColor">{{item.text}}：</span>
          <div style="width: 80%">
            <tableList :tableData='data[item.type]' :isShow='item.show' :tableHeader='item.header' pagin></tableList>
          </div>
        </div>
        
      </div>
      <slot name="propList"></slot>

    </div>
  </div>
</template>

<script>
import tableList from "@/components/tableList/tableList.vue";
export default {
  components: { tableList },
  props: {
    list: {
      teyp: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      noImg: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFQTYyQUY4NTFGNzExRTlCRjI3QzAzRUEyNEU0NEUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFQTYyQUY5NTFGNzExRTlCRjI3QzAzRUEyNEU0NEUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVBNjJBRjY1MUY3MTFFOUJGMjdDMDNFQTI0RTQ0RTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVBNjJBRjc1MUY3MTFFOUJGMjdDMDNFQTI0RTQ0RTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwIC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',
      plort: [
        {
          url: 'http://image.dangkou.net/2016/04/29/201604291002093112d.jpg'
        }
      ],
    };
  },

  created() {},

  methods: {
    getList(data, type, label) {
      let list = ''
      for(let item of data[type]) {
        list = list + item[label] + '、'
      }
      return list
    }
  }
};
</script>

<style lang='scss' scoped>
.el-row {
  margin-bottom: 20px;
}
.outerLayer{
  color: #6f6e6e;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  .imgFlex{
    display: flex ;
    padding: 0 20px;
    align-items: center;
    .imgStyle{
      width: 80px;
      height: 80px;
      margin-left: 10px;
    }
  }
  .imgOver{
    width: 80%;
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .sizeColor{
    color: #565454;
    font-weight: bold;
  }
}
</style>

<style scoped>
.imgOver::-webkit-scrollbar {
	width: 2px;
  height: 10px;
}
.imgOver::-webkit-scrollbar-track {
	border-radius: 2px;
}
.imgOver::-webkit-scrollbar-thumb {
	background: rgba(0, 0, 0, 0.1);
	border-radius: 2px;
}
</style>