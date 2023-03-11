<template>
  <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :v-model="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="files">
        <el-upload
            class="upload-demo"
            action
            :http-request="uploadFile"
            :before-upload="beforeUpload"
            name="file"
            :headers="headers"
            :data="uploadData"
            :file-list="fileList"
            :on-remove="removeFile"
            multiple>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传小于5M的文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: true,
      dataForm: {
        id: 0,
        title: ''
      },
      dataRule: {
      },
      uploadUrl: '',
      uploadData: {},
      fileList:[],
      headers: { "Content-Type": "multipart/form-data" },  //设置表头
      file: [],
      fileType: [ "pdf", "doc", "docx", "xls", "xlsx","txt","png","jpg", "bmp", "jpeg"],
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/sys/sysnotify/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.title = data.sysNotify.title
              //文件回显
              for (var i in data.fileList) {
                //[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
                this.fileList.push(data.fileList[i])
              }
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          //新建FormData上传
          let FormDatas = new FormData()
          //多文件上传
          for (var i in this.file) {
            FormDatas.append('file', this.file[i]);
          }
          FormDatas.append("id", this.dataForm.id || '');
          FormDatas.append("title", this.dataForm.title);

          this.$http({
            url: this.$http.adornUrl(`/sys/sysnotify/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            headers: this.headers,
            data: FormDatas
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    //上传文件之前验证文件类型和大小
    beforeUpload(file) {
      if (file.type != "" || file.type != null || file.type != undefined){
        //截取文件的后缀，判断文件类型
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        //计算文件的大小
        const isLt5M = file.size / 1024 / 1024 < 5; //这里做文件大小限制
        //如果大于5M
        if (!isLt5M) {
          this.$message({
            message: '上传文件大小不能超过 5MB!',
            type: 'info'
          });
          return false;
        }
        //如果文件类型不在允许上传的范围内
        if(this.fileType.includes(FileExt)){
          return true;
        }
        else {
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },

    //把上传文件放入列表中
    uploadFile(item){
      this.file.push(item.file)
    },

    //移除文件
    removeFile(item) {
      for (var i in this.file) {
        if (item.name == this.file[i].name) {
          this.file.splice(i, 1)
        }
      }
    }
  }
}
</script>