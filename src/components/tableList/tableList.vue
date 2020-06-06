<template>
  <div style="padding: 20px" class="hearder">
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="Array.isArray(tableData) ? tableData : tableData.items" :show-header='isShow' style="width: 100%" border stripe @selection-change='selectionChange'>
      <template v-for="item of tableHeader">
        <el-table-column type="index" width="50" align="center" v-if="item.type == 'index'"></el-table-column>
        <!-- 这个展示是否多选 -->
        <el-table-column align="center" type="selection" width="55" v-if="item.type == 'selection'"></el-table-column>

        <!-- 简单的展示文本 -->
        <el-table-column align="center" :label="item.label" :sortable='item.sortable' :prop="item.solt" :width="item.width" v-if="item.type == 'text'">
        </el-table-column>

        <!-- 根据条件显示文本 -->
        <el-table-column align="center" :label="item.label" v-if="item.type == 'isText'" :width="item.width">
          <template slot-scope="scope">
            <span>{{scope.row[item.solt] == 1 ? item.isTrue : item.isFalse}}</span>
          </template>
        </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column align="center" :label="item.label" v-if="item.type == 'button'" :width="item.width">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row, items.title)" :round='items.round' :disabled='items.disabled' :circle='items.circle' :plain='items.plain' v-for="(items,indexs) of item.buttonList" :key="indexs" :type="items.type">{{items.title}}</el-button>
          </template>
        </el-table-column>
        <!-- 操作按钮特殊情况使用 -->
        <!-- 操作按钮 -->
        <el-table-column align="center" :label="item.label" v-if="item.type == 'Button'" :width="item.width">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row, items.title)" v-show="item.isHave ? scope.row[item.isHave] : true" :round='items.round' :disabled='items.disabled' :circle='items.circle' :plain='items.plain' v-for="(items,indexs) of item.buttonList" :key="indexs" :type="items.isOpen ? (scope.row.status == 1 ? items.type : items.types ) : items.type">{{items.isOpen ? (scope.row.status == 1 ? items.title : items.open ) : items.title}}</el-button>
          </template>
        </el-table-column>

        <!-- 图片展示 -->
        <el-table-column align="center" :label="item.label" :width="item.width" v-if="item.type == 'img'">
          <template slot-scope="scope">
            <div class="imgFather">
              <div>
                <el-image v-if="scope.row[item.solt] != ''" class="imgStyle" :src="scope.row[item.solt]" :preview-src-list="[scope.row[item.solt]]" :title="scope.row[item.title]"  fit="contain">
                </el-image>
                <el-image v-else class="imgStyle" :src="noImg" :preview-src-list="[noImg]" :title="scope.row[item.title]"  fit="contain">
                </el-image>
              </div>
              <!-- <div class="">{{scope.row[item.name]}}</div> -->
              <div style="wdith: 100px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">
                <el-tooltip class="item" effect="dark" :content="scope.row[item.name]" placement="bottom">
                  <div>{{scope.row[item.name]}}</div>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- 开关 -->
        <el-table-column align="center" :label="item.label" :width="item.width" v-if="item.type == 'switch'">
          <template slot-scope="scope">
            <el-switch :value="scope.row[item.solt] == 0 ? false : true" :disabled='item.disabled' active-color="#13ce66" inactive-color="#ff4949" @change="((type) => {setSwitch(item.solt, scope.$index, scope.row)})"></el-switch>
          </template>
        </el-table-column>
        <!-- 数组图片展示 -->
        <el-table-column align="center" :label="item.label" :width="item.width" v-if="item.type == 'images'">
          <template slot-scope="scope">
            <div style="display: flex;justify-content: center">
              <div v-for="(items, indexs) of scope.row[item.solt]" :key="indexs" style="margin-left: 5px">
                <img :src="items" alt="" @mouseenter="showImageView" @mousemove="moveImageView" @mouseleave="checkImageView" class="imagBox">
              </div>
            </div>
          </template>
        </el-table-column>
     </template>
    </el-table>
    <div class="footer" v-if="!pagin">
      <div>第{{tableData.page}}页 共{{tableData.pages}}页 , 共{{tableData.total}}条</div>
      <div>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.page" :page-sizes='pageSizes' :page-size="tableData.limit" layout="sizes, prev, pager, next, jumper" :total="tableData.total"></el-pagination>
      </div>
    </div>
    <viewImage v-if="imageShow" :imgSize="{width: '200',height: 'auto'}" :imagePosition="imagePosition" :imageSrc="imageSrc"></viewImage>
  </div>
</template>

<script>
import viewImage from '../viewImage/index'
export default {
  components: {viewImage},
  props: {
    // 循环的表
    tableData: {
      type: [Object,Array],
      default: () => {}
    },

    // 是否显示表头
    isShow: {
      type: Boolean,
      default: true
    },

    // 表头
    tableHeader: {
      type: Array,
      default: () => []
    },

    // 控制页码是否显示
    pagin: {
      type: Boolean,
      default: false
    },

    // 搜索的时候的内容，便于切换分页使用
    search: {
      type: Object,
      default: () => {}
    },

    // 切换一页的展示数量,默认[20,40,60,80,100]
    pageSizes: {
      type: Array,
      default: () => [10, 20, 40, 60]
    },
  },
  name: "home",
  data() {
    return {
      imagePosition: {},
      imageSrc: "",
      imageShow: false,
      updateList: [],
      noImg: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFQTYyQUY4NTFGNzExRTlCRjI3QzAzRUEyNEU0NEUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFQTYyQUY5NTFGNzExRTlCRjI3QzAzRUEyNEU0NEUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVBNjJBRjY1MUY3MTFFOUJGMjdDMDNFQTI0RTQ0RTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVBNjJBRjc1MUY3MTFFOUJGMjdDMDNFQTI0RTQ0RTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAACAgICAgICAgICAwICAgMEAwIC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'
    };
  },

  created() {},

  methods: {
    // 切换每页展示的数量
    handleSizeChange(e) {
      let search = Object.assign({}, this.search)
      search.limit = e
      this.$emit('pagination', search)
    },

    // 切换页码
    handleCurrentChange(e) {
      let search = Object.assign({}, this.search)
      search.page = e
      this.$emit('pagination', search)
    },

    // 点击操作按钮
    handleEdit(index, row, title) {
        this.$emit('change', index, row, title)
    },

    // selectionChange 选中项变化触发
    selectionChange(e) {
      this.updateList = e
    },

    showImageView(e) {
      this.imageShow = true
      this.imagePosition = {
          left: e.clientX,
          top: e.clientY
      }
      this.imageSrc= e.target.src
    },

    moveImageView(e) {
      this.imagePosition = {
          left: e.clientX,
          top: e.clientY
      }
    },

    checkImageView(e) {
      this.imageShow = false
    },

    // 更改状态
    setSwitch(type,name,item) {
      item[type] = item[type] == 0 ? 1 : 0
      let tableData = Object.assign({}, this.tableData)
      this.$emit('setTable',tableData,item)
    },
  }
};
</script>

<style lang="scss" scoped>
  .imagBox{
    width: 40px;
    // height: 60px;
  }
  .hearder{
    padding: 20px;
    .footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
  }
  }
  .imgStyle{
      width: 30px;
      height: 30px;
      margin: 0 10px;
    }
  .imgFather{
    display: flex;
    align-items: center;
    // justify-content: center;
  }
  .el-button--text{
    color: #606266;
  }
  .el-button--text:hover{
    color: #409EFF;
  }
</style>
