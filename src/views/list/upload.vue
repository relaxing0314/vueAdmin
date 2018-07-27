<template>
  <section class="upload-wrap">
    <div class="upload-demo"
      v-for="(item,index) in uploadData"
      :key="index"
    >
      <h2 class="upload-tit">{{item.title}}</h2>
      <el-upload
        :ref="'upload' + index"
        :class="item.class"
        :action="item.action"
        :accept="item.accept"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :multiple="item.multiple"
        :limit="item.limit"
        :drag="item.drag"
        :list-type="item.type"
        :auto-upload="item.isAutoUpload"
        :on-exceed="handleExceed"
        :show-file-list="item.isShowList"
        :file-list="item.fileList">

        <el-button v-if="item.type != 'picture-card' && !item.drag && item.isAutoUpload" size="small" type="primary">点击上传</el-button>

        <i v-if="item.drag" class="el-icon-upload"></i>
        <div v-if="item.drag" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

        <el-button v-if="!item.isAutoUpload && !item.drag" slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button v-if="!item.isAutoUpload && !item.drag" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

        <div v-if="item.type != 'picture-card'" slot="tip" class="el-upload__tip">{{item.desc}}</div>

        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-if="!imageUrl && item.type === 'picture-card'" class="el-icon-plus avatar-uploader-icon"></i>

      </el-upload>

      <el-dialog v-if="item.type === 'picture-card' && item.isShowList" :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </section>
</template>

<script>
  import DefinedState from '../../common/js/status';
	export default {
    data() {
      return {
        imageUrl:'',
        dialogImageUrl:'',
        dialogVisible:false,
        uploadData:[
          {
            title:"点击上传",
            class:"",
            type:"text",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:3,
            drag:false,
            isAutoUpload:true,
            isShowList:true,
            desc:"只能上传jpg/png文件，且不超过500kb"
          },
          {
            title:"用户头像上传",
            class:"avatar-uploader",
            type:"picture-card",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:1,
            drag:false,
            isAutoUpload:true,
            isShowList:false,
            desc:""
          },
          {
            title:"照片墙",
            class:"avatar-uploader",
            type:"picture-card",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:1,
            drag:false,
            isAutoUpload:true,
            isShowList:true,
            desc:""
          },
          {
            title:"图片列表缩略图",
            class:"",
            type:"picture",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:3,
            drag:false,
            isAutoUpload:true,
            isShowList:true,
            desc:"只能上传jpg/png文件，且不超过500kb"
          },
          {
            title:"上传文件列表控制",
            class:"",
            type:"text",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:3,
            drag:false,
            isAutoUpload:true,
            isShowList:true,
            desc:"只能上传jpg/png文件，且不超过500kb"
          },
          {
            title:"拖拽上传",
            class:"",
            type:"text",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:3,
            drag:true,
            isAutoUpload:true,
            isShowList:true,
            desc:"只能上传jpg/png文件，且不超过500kb"
          },
          {
            title:"手动上传",
            class:"",
            type:"text",
            accept:".png",
            action:"https://jsonplaceholder.typicode.com/posts/",
            fileList:DefinedState.imgList,
            multiple:true,
            limit:3,
            drag:false,
            isAutoUpload:false,
            isShowList:true,
            desc:"只能上传jpg/png文件，且不超过500kb"
          }
        ]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.uploadData[4].fileList = fileList.slice(-3);
      },
      //文件列表移除文件
      handleRemove(file, fileList) {
        console.log("文件列表移除文件",file, fileList);
      },
      //点击文件列表中已上传的文件
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log("点击文件列表中已上传的文件",file);
      },
      //上传文件之前
      beforeUpload(file){
        console.log("上传文件之前",file);
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      //文件上传成功
      uploadSuccess(response, file, fileList){
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("文件上传成功",response,file, fileList);
      },
      //删除文件之前
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //文件超出个数限制
      handleExceed(files, fileList) {
        this.$message.warning(`当前选择文件超出个数限制，请重新选择`);
      },
      submitUpload() {
        console.log("上传到服务器");
        this.$refs.upload6.submit();
      }
    }
  }
</script>
<style lang="scss">
@import '~scss_vars';
.upload-wrap{
  margin-top:15px;
  border-top:1px solid $color-gray;
  .upload-demo{
    padding:15px;
    .upload-tit{
      font-size:20px;
      line-height:40px;
      margin-bottom:15px;
      background-color:#f2f2f2;
    }
    .avatar-uploader{
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 148px;
          height: 148px;
          line-height: 148px;
          text-align: center;
        }
        .avatar {
          width: 148px;
          height: 148px;
          display: block;
        }
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
    }
  }
}

</style>
