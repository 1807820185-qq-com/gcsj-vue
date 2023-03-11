<template>
  <div class="article" v-for="a in fileList">
    <el-row>
      <el-col :span="14" class="article-contents">
        <el-avatar  :size="20" :src="imageUrl.wordphoto" shape="square" v-if="a.type === 'docx'"/>
        <el-avatar  :size="20" :src="imageUrl.wordphoto" shape="square" v-if="a.type === 'doc'"/>
        <el-avatar  :size="20" :src="imageUrl.pdfphoto" shape="square" v-if="a.type === 'pdf'"/>
        <span style=" ">
          <h5>{{ a.title }}</h5>
        </span>
      </el-col>
      <el-col :span="6">
        <span >发布时间：{{a.createTime}}</span>
      </el-col>
      <el-col :span="4">
        <el-button style="text-align: right;" type="primary" :size="'small'" @click="downloadFile(a)">点击下载文档</el-button>
      </el-col>
    </el-row>
<!--    <div class="article-contents" >-->
<!--&lt;!&ndash;      <img :src="imageUrl" :size="70" v-if="imageUrl === '' ? false:true">&ndash;&gt;-->
<!--      <el-avatar  :size="20" :src="imageUrl.wordphoto" shape="square" v-if="a.type === 'docx'"/>-->
<!--      <el-avatar  :size="20" :src="imageUrl.wordphoto" shape="square" v-if="a.type === 'doc'"/>-->
<!--      <el-avatar  :size="20" :src="imageUrl.pdfphoto" shape="square" v-if="a.type === 'pdf'"/>-->
<!--        <span style=" ">-->
<!--          <h5>{{ a.title }}</h5>-->
<!--&lt;!&ndash;          <span><i class="el-icon-magic-stick"></i>{{ goodNum }}</span>&ndash;&gt;-->
<!--        </span>-->
<!--      <span >&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;{{a.createTime}}</span>-->
<!--      <el-button style="text-align: right;" type="primary" :size="'small'" @click="downloadFile(a)">点击下载文档</el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
import wordphoto from "../../../public/image/word.jpg"
import pdfphoto from "../../../public/image/pdf.png"
export default {
  name: "loadfile",
  data(){
    return{
      // title:'',
      imageUrl:{
        wordphoto,
        pdfphoto
      },
      fileList:[],

    }
  },
  mounted() {
    this.getFileList()

  },
  methods:{
    getFileList(){
      this.$http.post('/load-file/getFileList'

      ).then(res=>{
        if (res){
          this.fileList=res.data.data
          // this.article = res.data.data
          // this.editor.value = this.article.articleContent
        }
      });
    },
    downloadFile(item){
      let fileId=item.fileId
      const formdata = new FormData();
      formdata.append("fileId",fileId);
      debugger;
      // 第一种方法
      // let link = document.createElement('a')
      // link.href="http://localhost:8081/downloadfile"+"?fileId="+fileId
      // link.click()
      // url,params,{type: 'json',responseType:'blob' }
      //第二种方法
      this.$http.post('/downloadfile',formdata,{responseType:'blob'}).then(response => {//自定义的vue请求，请求后台下载地址
        //以下均为后台请求返回成功后对返回结果的处理，处理完成会从浏览器显示下载
        debugger;
        let blob = new Blob([response]);//response是返回的数据对象
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.setAttribute('download', item.title)
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    },
  }
}
</script>

<style scoped>
.article-contents {
  display: flex;
  flex-direction: row;
}
.article {
  width: 70%;
  margin-bottom: 3px;
  padding-bottom: 3px;
  border-bottom: whitesmoke solid 2px;
}
</style>