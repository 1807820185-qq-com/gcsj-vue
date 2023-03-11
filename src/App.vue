<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
/*html,body,#app{*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  !*margin: 0px auto;*!*/
/*  !*padding: 0px;*!*/
/*  margin: 0 ;*/
/*  padding: 0;*/
/*  background: #1a1a1a;*/
/*  border: 0px;*/
/*}*/

</style>
