<template>
	<div id="write">
		<el-container>
			<el-container class="me-area me-write-box">
				<el-main class="me-write-main">
					<div class="me-write-title">
						<el-input
							resize="none"
							type="textarea"
							autosize
							v-model="articleForm.title"
							placeholder="请输入文章标题"
							class="me-write-input">
						</el-input>
					</div>
					<div id="placeholder" style="visibility: hidden;height: 89px;display: none;"></div>
					<BBSMarkdownEditor :editor="articleForm.editor" class="me-write-editor"></BBSMarkdownEditor>
				</el-main>
			</el-container>
			
			<!--  弹窗-->
			<el-dialog title="发布文章/发布帖子" v-model="publishVisible" :close-on-click-modal="false">

				<el-form :model="articleForm" ref="articleForm" :rules="rules">
					<div class="image-summary-row">
<!--            下面的属性用于控制文件列表的显示与否-->
<!--            :file-list="fileList"-->
						<el-upload
							action="#"
              :file-list="fileList"
              :http-request="uploadFile"
							accept=".jpg,.jpeg,.png"
							list-type="picture-card"
              :on-upload="false"
							:limit="1"
							:show-file-list="true"
							:on-remove="removeFile"
							:before-upload="beforeAvatarUpload"
              class="upload-demo"
						>
<!--							<img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--							<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--              <img v-if="imageUrl" :src="imageUrl" class="avatar" />-->
<!--              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>-->
						</el-upload>
						<el-form-item prop="summary">
							<el-input
								class="el-input-summary"
								maxlength="250"
								show-word-limit
								type="textarea"
								v-model="articleForm.summary"
								:rows="5"
								placeholder="请输入文章摘要">
							</el-input>
						</el-form-item>
					</div>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="publishVisible = false">取 消</el-button>
					<el-button type="primary" @click="publish('articleForm')">发布</el-button>
				</div>
			</el-dialog>
		</el-container>
		<!--  底部发布与取消-->
		<div class="footer">
			<div class="footer-btn">
				<el-button type="primary" round size="medium" @click="publishShow">发布文章</el-button>
				<el-button type="danger" round size="medium" @click="cancel">取消发布</el-button>
			</div>
		</div>
	
	</div>
</template>

<script>
import BBSMarkdownEditor from "../../components/forum/BBSMarkdownEditor.vue";
import {ElLoading, ElMessage, ElMessageBox} from "element-plus";
import {useLogin} from "../../store/user"
const userdetail =useLogin()
export default {
	name: 'BBSArticleWrite',

	data() {
		return {
      fileList:[],
			publishVisible: false,
			imageUrl:'',
			imageFile:'',
			articleForm: {
				title: '',
				summary: '',
				editor: {
					value: '',
					defaultOpen: 'editable',

				}
			},
			rules: {
				summary: [
					{required: true, message: '请输入摘要', trigger: 'blur'},
					{max: 250, message: '不能大于80个字符', trigger: 'blur'}
				],
			}
		}
	},
	mounted() {
	},
	methods: {
		publishShow() {
			if (!this.articleForm.title) {
        ElMessage({
					message: '标题不能为空',
					type: 'warning',
					showClose: true,
					offset: 54
				})
				return
			}
			if (this.articleForm.title.length > 30) {
        ElMessage({
					message: '标题最多30个字',
					type: 'warning',
					showClose: true,
					offset: 54
				})
				return
			}
			if (!this.articleForm.editor.value) {
        ElMessage({
					message: '内容不能为空',
					type: 'warning',
					showClose: true,
					offset: 54
				})
				return
			}
			this.publishVisible = true;
		},
    uploadFile(item){
      // this.file.push(item.file)
      this.imageFile=item.file
      console.log(item)
    },
    //移除文件
    removeFile(item) {
      // for (var i in this.file) {
      //   if (item.name == this.file[i].name) {
      //     this.file.splice(i, 1)
      //   }
      // }
      this.imageFile=''
    },
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isPNG = file.type === "image/png";
			const isLt2M = file.size / 1024 / 1024 < 2;
			
			if (!isJPG && !isPNG) {
        ElMessage({
					type: "error",
					message: "文件类型只能是JPG, PNG!",
					offset: 54
				})
			}
			if (!isLt2M) {
        ElMessage({
					type: "error",
					message: "文件大小不能超过 2MB!",
					offset: 54
				})
			}
			return (isJPG || isPNG) && isLt2M;
		},
		publish(articleForm) {
			const that = this
			this.$refs[articleForm].validate((valid) => {
				if (valid) {
					const article = {
						articleTitle: this.articleForm.title,
						articleContent: this.articleForm.editor.value,
						articleSummary: this.articleForm.summary,
						userId:userdetail.userInfo.id,
						articleImage:''
					}
					this.publishVisible = false;
					const loading = ElLoading.service({
						lock:true,
						text:'发布中，请稍后...'
					})
					// 发送请求给后端（如果有封面图片，先保存图片再保存文章数据）
					/*获取封面图片*/
					const file = this.imageFile
					const userId = userdetail.userInfo.id
          console.log(this.imageFile)
          debugger
					if(file != ''){
						const formData = new FormData()
						formData.append("userId",userId)
						formData.append("image",file)
						this.$http.post("/coverImg",formData).then(resp =>{
							if (resp){
                console.log(resp)
                debugger
								article.articleImage = resp.data.data
								this.$http.post('/article/publish',article).then(resp=>{
									if(resp){
										loading.close()
										that.$router.push('/forumindex')
									}
								})
							}
						})
					}else{
						this.$http.post('/article/publish',article).then(resp=>{
							if(resp){
								loading.close()
								that.$router.push('/forumindex')
							}
						})
					}
					console.log(article)
					
				}
			})
		},
		cancel() {
			ElMessageBox({
				message: '文章将不会保存, 是否继续?',
				title: '提示',
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$router.push('/forumindex')
			})
		},
		
	},
	components: {BBSMarkdownEditor},
	//组件内的守卫 调整body的背景色
	beforeRouteEnter(to, from, next) {
		window.document.body.style.backgroundColor = '#fff';
		next();
	},
	beforeRouteLeave(to, from, next) {
		window.document.body.style.backgroundColor = '#f5f5f5';
		next();
	}
}
</script>

<style>
	
	.me-write-box {
		max-width: 1000px;
		margin: 8px auto 0;
		border: #efeded solid 2px;
	}
	
	.me-write-main {
		padding: 0;
	}
	
	.me-write-title {
	}
	
	.me-write-input textarea {
		font-size: 32px;
		font-weight: 600;
		height: 10px;
		border: none;
	}
	
	.me-write-editor {
		min-height: 650px !important;
	}
	
	.me-header-left {
		margin-top: 10px;
	}
	
	.me-title img {
		max-height: 2.4rem;
		max-width: 100%;
	}
	
	.me-write-toolbar-fixed {
		position: fixed;
		width: 700px !important;
		top: 60px;
	}
	
	.v-note-op {
		box-shadow: none !important;
	}
	
	.auto-textarea-input, .auto-textarea-block {
		font-size: 18px !important;
	}
	
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 1000;
		padding: 5px;
		background-color: white;
		border-top: #e8e8ed solid 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
	.footer-btn {
		display: flex;
		flex-direction: row;
		justify-content: right;
		width: 1000px;
	}
	
	.image-summary-row{
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.el-upload--picture-card{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-right: 15px;
		height: 117px;
	}
	.el-upload-list--picture-card .el-upload-list__item{
		height: 117px;
	}
	
	.el-input-summary{
		width: 520px;
	}

	.hide .el-upload--picture-card {
		display: none;
	}
</style>
