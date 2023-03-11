<template>
<!--  设置走马灯高度为bannerHeight，实现走马灯高度自适应-->
  <el-carousel :height="bannerHeight+'px'" style="margin: 0 auto; width: 100%; border-radius: 4px">
    <el-carousel-item v-for="i in imgs" :key="i">
<!--      设置加载方法imgLoad，获取图片高度-->
<!--      给img组件加上了ref相当于给img组件起了一个名字，可以通过this.$ref.名字，拿到组件中的变量和方法-->
<!--      此处图片会根据宽度调整自己的高度，如果图片高度超过组件高度则不能完全显示-->
<!--      本组件会根据调整后的图片的高度动态调整走马灯组件的高度-->
      <img :src="i" style="width: 100%;" ref="bannerHeight" @load="imgLoad">
    </el-carousel-item>
  </el-carousel>
</template>


<script>
import picture1 from "../../../public/image/b1.webp"
import picture2 from "../../../public/image/b2.webp"
import picture3 from "../../../public/image/b3.webp"
import picture4 from "../../../public/image/b4.webp"
export default {
    name: "SakuraBigImg",
    props: {
        movtype: Number
    },
    setup() {
        return {
            // movieList
        }
    },
    data() {
        return {
            bannerHeight: "",
            imgs: [

              picture1,
              picture2,
              picture3,
              picture4
              ]
        }
    },
    //
    mounted() {
          this.imgLoad();
            window.addEventListener('resize',() => {
                this.bannerHeight=this.$refs.bannerHeight[0].height;
                this.imgLoad();
            },false)
        },

    methods: {
          imgLoad(){
            // 此处使用this.$nextTick是为了更好的渲染页面，不使用也可以
            this.bannerHeight=this.$refs.bannerHeight[0].height;
            // this.$nextTick(()=>{
            //   this.bannerHeight=this.$refs.bannerHeight[0].height;
            //   debugger;
            //     console.log(this.$refs.bannerHeight[0]);
            // })
          },
          }
}

</script>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
}
</style>
