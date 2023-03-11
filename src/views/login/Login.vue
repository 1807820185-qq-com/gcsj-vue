<template>
      <div class="login_contanier">
        <div class="login_background">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <h3 class="loginTitle">工程实践</h3>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--            <el-button type="primary" text @click="goManagerLogin">管理员登录</el-button>-->
          </el-form-item>
        </el-form>
      </div>
      </div>
</template>

<script>
import {useLogin} from "../../store/user"
//权限控制，暂时注释掉
// import { usePermissStore } from '../../store/permiss';
import {storeToRefs} from "pinia";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'zyk',
        password: '111111'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //登陆函数
    submitForm(formName) {
      const state_use=useLogin()
      //this.$refs[formName]表示formName这个部分的元素，当用于组件或标签时表示添加了ref=formName的组件或标签
      //validate表示使用自定义的校验规则，使用这个方法必须要在else里面写一个返回（return ）否则校验不会生效
      this.$refs[formName].validate((valid) => {
        // debugger;
        if (valid) {
          //提前存储this，进入下方的post之后，this的值会发生改变，需要提前存储
          const _this=this
          // alert('submit!');//页面发起提示
          // debugger;
          //向后端api发送请求
          this.$http.post('/login',this.ruleForm,).then(res=>{
            debugger;
            console.log(res.headers)
            console.log(res)
            const jwt=res.headers['authorization']
            const userInfo=res.data.data
            // console.log(userInfo)

            // storeToRefs可以实现响应式数据
            // const {token:token1,userInfo:userInfo1}=storeToRefs(state_use);
            // console.log(token1)
            // console.log(userInfo1)
            debugger;
            //把数据共享出去(数据存储到store)
            // _this.$store.commit("SET_TOKEN",jwt)
            // _this.$store.commit("SET_USERINFO",userInfo)
            state_use.SET_TOKEN(jwt)
            state_use.SET_USERINFO(userInfo)

            // token1=jwt
            // userInfo1=userInfo

            //权限控制，暂时注释掉
            // const permiss = usePermissStore();
            // const keys = permiss.defaultList['user'];
            // permiss.handleSet(keys);
            //页面跳转，使用push函数进行页面的跳转
            _this.$router.push("/home")

          });
        } else {
          debugger;
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      //resetFields函数表示重置数据
      this.$refs[formName].resetFields();
    },
    // goManagerLogin(){
    //   this.$router.push("/ManagerLogin")
    // },
  },
}
</script>

<style lang="scss">

.login_contanier {
  width: 100%;
  height: 100%;
  //min-height: calc(100vh);
  //background: rgb(179, 162, 199);
  background-image: url("../../../public/image/preview.jpg");
  background-size: 100% 100%;
  background-clip: padding-box;
  position: relative;
  margin: 0 ;
  padding: 0;
  border: 0;
  .login_background {
    width: 320px;
    padding: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: white;
    /*background-image: url("../../public/image/preview.jpg");*/
    /*background-clip——规定背景的绘制区域*/
    /*border-box：背景被裁剪到边框盒*/
    /*padding-box：背景被裁剪到内边距框*/
    /*content-box：背景被裁剪到内容框*/
    background-clip: padding-box;
    //padding: 25px 35px 25px 35px;
    filter:alpha(Opacity=80);
    -moz-opacity:0.80;
    opacity: 0.80;




    .text_center {
      text-align: center;
    }
    .color_pink {
      color: rgb(96, 74, 123);
      text-shadow: rgb(179, 162, 199);
    }
    .purple_btn {
      color: #fff;
      background-color: rgb(96, 74, 123);
      border-color: rgb(96, 74, 123);
    }
  }
}








//.mysize{
//  width: 350px;
//  margin: 100px auto;
//  border-radius:15px ;
//  border: 1px solid #eaeaea;
//  /*添加阴影 h-shadow(水平阴影位置)，v-shadow(垂直阴影位置)，blur(阴影大小)，color(颜色)*/
//  box-shadow: 10px 10px 35px #cac6c6;
//  background: #fff;
//  /*background-image: url("../../public/image/preview.jpg");*/
//  /*background-clip——规定背景的绘制区域*/
//  /*border-box：背景被裁剪到边框盒*/
//  /*padding-box：背景被裁剪到内边距框*/
//  /*content-box：背景被裁剪到内容框*/
//  background-clip: padding-box;
//  padding: 25px 35px 25px 35px;
//  filter:alpha(Opacity=80);
//  -moz-opacity:0.80;
//  opacity: 0.80;
//}
</style>