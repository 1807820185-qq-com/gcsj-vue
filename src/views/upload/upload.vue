<template>
  <div >
    <div class="content-title">支持拖拽</div>
    <div class="plugins-tips">
      Element Plus自带上传组件。 访问地址：
      <a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank">Element Plus Upload</a>
    </div>
<!--    drag-->
<!--    :on-change="onChangeFile"-->
    <el-upload
        class="upload-demo"
        ref="uploadFile"
        action
        drag
        :limit="1"
        :before-upload="beforeFileUpload"
        :show-file-list="true"
        :auto-upload="true"
        :http-request="onChangeFile"
        :on-remove="onRemoveFile">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
<!--      <el-button size="small" type="primary">选择文件</el-button>-->
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <el-button type="primary" @click="submitUpload">确认上传</el-button>
  </div>
</template>

<script>
import {useLogin} from "../../store/user"
const userdetail =useLogin()
export default {
  name: "upload",
  data(){
    return{
      userFile:null,//上传的文件
    }
  },
  methods:{
    //确认上传
    submitUpload() {
      // this.$refs.uploadFile.submit();
      if(this.userFile==null){
        return this.$message.error("请先选取文件！");
      }
      //文件上传添加上传参数（若无需添加参数则直接传this.userFile给接口）
      const formdata = new FormData();
      const userId = userdetail.userInfo.id
      formdata.append("userId", userId);
      formdata.append("file",this.userFile);
      debugger;
      console.log(formdata)

      //调用上传接口
      this.$http.post("/uploadFile",formdata).then(res => {
        if (res.data.code == 200) {
          this.$message.success("上传成功");
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    //文件上传之前
    beforeFileUpload(file){
      const File = file.name.replace(/.+\./,"");
      if (['pdf','docx','dox'].indexOf(File.toLowerCase())===-1 ) {
        this.$message.error('只支持上传pdf、dox、doxc文件格式!');
        this.$refs.uploadFile.clearFiles();
        return false;
      }
    },
//文件上传改变
    onChangeFile(file, arr){
      debugger;
      console.log(file)
      //限制文件大小
      let isLt2M = file.file.size / 1024 / 1024 < 200;
      if(!isLt2M){
        this.$refs.uploadFile.clearFiles();
        return this.$message.error('上传文件大小不能超过 200MB!');
      }
      this.userFile = file.file;
    },
    //文件移除
    onRemoveFile(){
      debugger;
      this.userFile=null;
    },

  }

}
</script>

<style scoped>
/*.upload-demo {*/
/*  width: 360px;*/
/*}*/
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>