<template>
  <!--        model-value="text"-->
    <v-md-editor
        :autofocus="true"
        v-model="text"
        height="510px"
        placeholder="请输入内容"
        mode="editable"
        ref="md"
        @upload-image="handleUploadImage"
        left-toolbar="undo redo clear h bold italic strikethrough quote ul ol table hr image code"
        right-toolbar="preview sync-scroll fullscreen"
        :toolbar="toolbar"
        :disabled-menus="[]"
    />
<!--  left-toolbar="undo redo clear h bold italic strikethrough quote ul ol table hr image code"-->
<!--  right-toolbar="preview sync-scroll fullscreen"-->

<!--  <v-md-editor-->
<!--      v-model="text"-->
<!--      left-toolbar="undo redo | customToolbar1 customToolbar2 customToolbar3"-->
<!--      :toolbar="toolbar"-->
<!--      height="500px"-->
<!--  />-->

</template>

<script >
import {reactive, ref} from "vue";
export default {


  name: 'test',
  data () {
    return {
      text: 'asdasddfsdafdsafdsfa',
      // leftBar:ref('undo redo clear h bold italic strikethrough quote ul ol table hr link image code'),
      // rightBar:ref('preview sync-scroll fullscreen')

    }
    },
  methods: {
    // imgAdd(pos, $file) {
    //   let that = this
    //   let userId = JSON.parse(window.sessionStorage.getItem('user')).id;
    //   let formdata = new FormData();
    //   formdata.append('userId',userId);
    //   formdata.append('image', $file);
    //
    //   this.$http.post("/article/articleImg",formdata).then(resp => {
    //     // 成功后返回图片的url替换到文本原位置
    //     if (resp) {
    //       that.$refs.md.$img2Url(pos, resp);
    //       console.log(resp)
    //     }
    //   })
    //
    // },
     handleUploadImage(event,insertImage,files){
       // let userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
        for(let i in files){
          const formData = new FormData();
          formData.append('file', files[i]);
          // formData.append('userId',userId);
          this.$http.post(`/uploadImg`,formData).then(
              response => {
                insertImage({
                  url:response.data.data,
                  desc: 'DESC',
          })
        },
        error => {
          console.log('请求失败了',error.message)
        }
    )
  }
}
},






}
</script>
