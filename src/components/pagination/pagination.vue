<template>
    <div class="pagination-wrap">
      <el-pagination
        @current-change="_pageblur"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        page:1
      }
    },
    props:{
      pageSize:{
        type:Number,
        required:true
      },
      currentPage:{
        type:Number,
        required:true
      },
      total:{
        type:Number,
        required:true
      }
    },
    mounted(){
      this.page = this.currentPage;
    },
    methods:{
      //直接前往某一页时触发
      _pageblur(val) {
        this.$emit('pagego',val);
      }
    }
  };
</script>
<style lang="scss">
.pagination-wrap{
  float:right;
  .btn-prev{
    border-right:1px solid #dcdfe6;
  }
  .el-pager{
    li{
      border-right:1px solid #dcdfe6;
    }
  }
}
</style>
