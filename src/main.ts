import { createApp } from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import Test from './views/mytest.vue'
// @ts-ignore
import router from './router/index'
// @ts-ignore
// import store from './store'
import { createPinia } from 'pinia';
// 引入 pinia插件-数据持久化
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// @ts-ignore
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./axios"
import axios from 'axios'
import * as Icons from '@element-plus/icons-vue' // 引入所有图标，并命名为 Icons

//权限控制，暂时注释掉
// import { usePermissStore } from './store/permiss';



const pinia = createPinia();
pinia.use(PiniaPluginPersistedstate)

const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(ElementPlus).use(router).use(pinia).use(VueMarkdownEditor).use(VMdPreview)

// 通过遍历的方式注册所有 svg组件，会牺牲一点点性能
for (let i in Icons) {
    // @ts-ignore
    app.component(i, Icons[i])
}
//权限控制，暂时注释掉
// // 自定义权限指令
// const permiss = usePermissStore();
// app.directive('permiss', {
//     mounted(el, binding) {
//         if (!permiss.key.includes(String(binding.value))) {
//             el['hidden'] = true;
//         }
//     },
// });


app.mount('#app')

