import { createStore } from 'vuex'
//store主要用于进行数据的存储
//localStorage表示本地存储，sessionStorage表示会话存储，在浏览器的控制台可以看到
export default createStore({
  // state属性是Vuex中用于存放组件之间共享的数据
  state: {
    token:localStorage.getItem("token"),
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
    // user:{
    //   userid:'',
    //   username:'请先登录',
    //   // portrait:image
    // },
  },
  // getters的第一个参数是state, 第二个参数是getters
  // getters可以返回一个函数，并且在使用的时候直接调用即可
  // 调用：$store.getters.函数名（参数）
  // getters在componsition api中的使用：const 变量名=computed(() =>store.getters.函数名（参数）);
  getters: {
  },
  // 在 Vuex 中 store 数据改变的唯一方法就是提交 mutations。
  // mutations里面装着一些改变数据方法的集合
  // 必须使用$store.commit("函数名"，参数);
  mutations: {
    SET_TOKEN:(state,token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },
    SET_USERINFO:(state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO:(state)=>{
      state.token=''
      state.userInfo={}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    },
  },
  // mutation不能用于异步操作
  // Action类似于mutation, 但是是用来代替mutation进行异步操作的.
  // Action 提交的是 mutation，而不是直接变更状态。
  // 调用action中的方法:$store.dispatch('asyncIncrement'，参数)参数没有可以去掉这一部分
  //
  //
  actions: {
  //使用实例
  //   timeSub(context,mSeconds){//第一个参数是context固定不变，第二个是自定义参数，timeSub是函数名
  //     setTimeout(() => {
  //       context.commit('sub',3)//***重点！*** 这里是调用mutations的语法
  //       //'sub'是一个名为sub的actions函数，3是向sub函数传递的参数
  //     },mSeconds)//mSeconds是延迟的时间
  //   },

  },
  modules: {
  }
})
