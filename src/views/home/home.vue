<template>
  <v-header />
  <v-sidebar />
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    <v-tags></v-tags>
    <div class="content">
<!--      此处要设置key，解决路由相同参数不同页面不跳转的问题-->
      <router-view :key=$route.fullPath v-slot="{ Component }" >
        <transition name="move" mode="out-in">
          <!--keep-alive会按照条件缓存所有页面，不使用include会缓存所有页面-->
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<!--setup的作用是自动注册语法，不再需要手动引入-->
<script lang="ts" setup>
// <script lang="ts">
import vHeader from '../../components/home/header.vue';
import vSidebar from '../../components/home/sidebar.vue';
import vTags from '../../components/home/tags.vue';
import { useSidebarStore } from '../../store/sidebar';
// import {useRouter} from 'vue-router'
// import {computed} from "vue";
const sidebar = useSidebarStore();
// const route=useRouter();
// console.log(route.currentRoute.value.path)
// export default{
//
//   name: 'home',
//   components: {
//     vHeader,
//     vSidebar,
//     // vTags
//   },
//
// }
</script>
