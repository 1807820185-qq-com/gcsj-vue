import axios from 'axios'
import ElementPlus, {ElMessage} from 'element-plus'
import {useLogin} from './store/user'
import router from "@/router";
axios.defaults.baseURL="http://localhost:8081"

//这里是请求拦截器（用于在请求之前加一些配置，例如：加入token）
axios.interceptors.request.use(config=>{
    //当前端发送的请求是非登陆请求的时候需要添加Authorization用于权限控制(此处为设置管理员登陆要进行的拦截)
    if(config.url!="/login"){
        config.headers.Authorization=localStorage.getItem("token")
    }
    console.log(config)
    return config
})
//这里是请求拦截器(用于在响应请求之后处理一些东西，分为响应成功和相应不成功2个部分)
axios.interceptors.response.use(response=>{
    let res =response.data;
    if(res.code===200||response.status===200){
        return response
    }else{
        ElMessage({
            message: response.data.msg,
            type: "error",
            duration:3*1000//s3秒自动消失
        });
        return Promise.reject(response.data.msg)


    }

},
    error => {
    // console.log(error)
        if(error.response.data){
            error.message=error.response.data.msg
        }


        if(error.response.status===401){
            // store.commit("REMOVE_INFO")
            useLogin().REMOVE_INFO()
            router.push("/login")
        }

        ElMessage({
            message: error.message,
            type: "error",
            duration:3*1000//s3秒自动消失
        });
        return Promise.reject(error)

    }




)