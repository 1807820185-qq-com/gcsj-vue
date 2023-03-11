import { defineStore } from 'pinia' //引入pinia

//这里官网是单独导出  是可以写成默认导出的  官方的解释为大家一起约定仓库用use打头的单词 固定统一小仓库的名字不易混乱
export const useLogin=defineStore("login",{
    state: () =>{
        return  ({
            token:localStorage.getItem("token"),
            userInfo:JSON.parse(localStorage.getItem("userInfo")),
        }) //为了避免出错，返回的值用()包起来
    },
    getters:{
        // doubleCount: (state) => state.counter * 2,
    },
    actions: {
        SET_TOKEN(token){

            localStorage.setItem("token",token)
            this.token=localStorage.getItem("token")
        },
        SET_USERINFO(userInfo){

            localStorage.setItem("userInfo",JSON.stringify(userInfo))
            this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
        },
        REMOVE_INFO(){
            this.token=''
            this.userInfo={}
            localStorage.setItem("token",'')
            localStorage.setItem("userInfo",JSON.stringify(''))
        },
    },
})