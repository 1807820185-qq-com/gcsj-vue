<template>
  <div class="block text-center" m="t-4">
    <el-carousel trigger="click" :height="screenheight">
      <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item" style="object-fit: scale-down ;width: 100% ;height: 100%">
<!--        object-fit: scale-down ;-->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import picture1 from "../../../public/image/Amelia.jpg"
import picture2 from "../../../public/image/preview.jpg"
export default {
name: "imgbox",
  data(){
  return {
    screenheight: document.documentElement.clientHeight*0.3 + 'px',
    imgs:[
      picture1,
      picture2,
      "https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
    ]
  }
  },
  created(){
    window.onresize = () => {
      debugger;
      this.screenheight = document.documentElement.clientHeight*0.3 + 'px'
      return (()=>{
        // this.screenheight = document.documentElement.clientHeight + 'px'
      })
    }
  }

}
</script>

<style scoped>

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>