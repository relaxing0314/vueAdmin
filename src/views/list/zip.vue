<template>
  <section class="zip-wrap">
    <div class="zip-list">
      <h2 class="zip-tit">图片 Zip下载</h2>
      <!--工具条-->
      <TableBtn :btnlists="imgZip.btnlists" v-on:tableClick="tableBtn"></TableBtn>

      <div class="img-list">
        <div class="img" v-for="item in imgZip.imgList" :key="item.name">
          <img :src="showImg(item)" alt="">
        </div>
      </div>
    </div>
    <div class="zip-list">
      <h2 class="zip-tit">Excel Zip下载</h2>
      <!--工具条-->
      <TableBtn :btnlists="excelZip.btnlists" v-on:tableClick="tableBtn"></TableBtn>

      <el-table :data="excelZip.users" highlight-current-row v-loading="listLoading" border style="width:100%;">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
        <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
        <el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
        <el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
  import {isLoginOver,Message} from '../../common/js/util';
  import DefinedState from '../../common/js/status';
  import { getUserListPage} from '../../api/api';
	export default {
		data() {
			return {
        listLoading:false,

        imgZip:{
          btnlists:[
            {event:"toZip",name:"file name",value:"",isDisabled:false,type:"input",btn:"Export Zip",startDis:false}
          ],//table列表上方btn
          fileName:"",
          imgList:DefinedState.imgBase
        },

        excelZip:{
          btnlists:[
            {event:"toExcelZip",name:"file name",value:"",isDisabled:false,type:"input",btn:"Excel Zip",startDis:false}
          ],//table列表上方btn
          fileName:"",
          users: []
        }
			}
		},
		methods: {
      //获取用户列表
      getUsers() {
        let para = {
          page:1,
          name:"",
          pageSize: this.$store.state.pageSize
        };
        this.listLoading = true;
        getUserListPage(para).then((res) => {
          this.excelZip.users = res.data.users;
          this.listLoading = false;
        });
      },
      //性别显示转换
      formatSex: function (row, column) {
        return DefinedState.sex[row.sex];
      },
      //img zip下载
      datumDownload(){
        this.listLoading = true;
        const that = this;
        const fileName = ["name"];
        const filterVal = ['url'];
        const list = this.imgZip.imgList;
        const urlArr = this.formatUrlArr(that.formatJson(filterVal, list));
        const file_name = this.formatUrlArr(that.formatJson(fileName, list));
        this.listLoading = true;
        if(urlArr.length > 0){
          import('@/vendor/ImgListZip').then(zip => {
            const zipName = this.imgZip.fileName;
            zip.img_list_to_zip(urlArr,file_name,zipName);
          })
        }
        this.listLoading = false;
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      formatUrlArr(UrlJson){
        let imgUrlArr = [];
        UrlJson.map(v => v.map(t => imgUrlArr.push(t)))
        return imgUrlArr;
      },
      //excel zip下载
      ExcelZipDownload(){
        this.listLoading = true;
        import('@/vendor/Export2Zip').then(zip => {
          const tHeader = ['编号', '姓名', '性别', '年龄（岁）','生日', '地址']
          const filterVal = ['id', 'name', 'sex', 'age', 'birth','addr'];
          const list = this.excelZip.users;
          const data = this.formatJson(filterVal, list);
          zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
          this.listLoading = false;
        })
      },
      showImg(val){
        const nameArr = val.name.split(".");
        let format = nameArr[1];
        if(nameArr[1] === "jpg"){
          format = "jpeg";
        }
        return `data:image/${format};base64,${val.url}`;
      },
      //table列表上方操作按钮
      tableBtn(data){
        if(data.event === "toZip"){
          this.imgZip.fileName = data.value;
          this.datumDownload();
        }else if (data.event === "toExcelZip"){
          this.excelZip.fileName = data.value;
          this.ExcelZipDownload();
        }else{
          return false;
        }
      }
		},
		mounted() {
      this.getUsers();
		}
	};

</script>
<style scoped lang="scss">
@import '~scss_vars';
.zip-wrap{
  margin-top:15px;
  border-top:1px solid $color-gray;
  .zip-list{
    padding:15px;
    .zip-tit{
      font-size:20px;
      line-height:40px;
      margin-bottom:15px;
      background-color:#f2f2f2;
    }
    .img-list{
      .img{
        display:inline-block;
        border:1px solid $color-gray;
        margin:5px;
      }
    }
  }
}
</style>
