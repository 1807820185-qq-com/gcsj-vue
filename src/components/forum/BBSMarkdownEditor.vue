<template>
<!--  <span>this is</span>-->
<!--	<v-md-editor-->
<!--		class="me-editor"-->
<!--		ref="md"-->
<!--		v-model="editor.value"-->
<!--		@imgAdd="imgAdd"-->
<!--		v-bind="editor">-->
<!--  height="510px"-->
<!--  //model可以改变文章的模式是编辑还是预览,此处设置的是预览模式-->
<!--  mode="editable"-->
<!--  可以使用这种写法-->
<!--  mode="preview"-->
  <v-md-editor
      :autofocus="true"
      v-model="editor.value"
      height="710px"
      placeholder="请输入内容"
      :mode="editor.defaultOpen"
      ref="md"
      @upload-image="handleUploadImage"
      left-toolbar="undo redo clear h bold italic strikethrough quote ul ol table hr image code"
      right-toolbar="preview sync-scroll fullscreen"

      :disabled-menus="[]"
  />
<!--  下面的语句在本系统中可有可无，主要是用在自定义自己的工具栏，如果仅仅只是对现有工具栏控制显示与否则不需要添加-->
<!--  :toolbar="toolbar"-->
</template>


<script>
//mavon-editor可以用于显示md文档的内容，可以使界面文字图片等更好的进行展示
export default {
	name: 'BBSMarkdownEditor',
	props: {
		editor: Object
	},
	data() {
		return {
    }
	},
	methods: {
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
<style scoped>

.me-editor {
	z-index: 6 !important;
}

.v-note-wrapper.fullscreen {
	top: 60px !important
}
</style>
