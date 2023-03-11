import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'
import About from '../views/about.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/home/home.vue'//home表示整个系统前端的大框架






//用于实现多个页面的跳转
const routes = [

    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect:'/index',
        children: [
            {
                path: '/index',
                name: 'index',
                meta: {
                    title: '网站首页',
                },
                component: () => import('../views/index/index.vue'),
            },
            {
                path: '/forumindex',
                name: 'forumindex',
                meta: {
                    title: '论坛主界面',
                },
                component: () => import(/* webpackChunkName: "forum" */ '../views/forum/BBSForum.vue'),
            },
            {
                path: '/addforumarticle',
                name: 'addforumarticle',
                meta: {
                    title: '发布新帖子',
                },
                component: () => import(/* webpackChunkName: "forum" */ '../views/forum/BBSAddArticle.vue'),
            },
            // {
            //     path: '/myforumarticle',
            //     name: 'myforumarticle',
            //     meta: {
            //         title: '论坛主界面',
            //     },
            //     component: () => import(/* webpackChunkName: "forum" */ '../views/forum/BBSForum.vue'),
            // },

            {
                path: '/courseManagerDetail',
                name: 'courseManagerDetail',
                meta: {
                    title: '课程资料查看',
                },
                component: () => import(/* webpackChunkName: "/courseManager/detail" */ '../views/upload/loadfile.vue'),
            },
            {
                path: '/courseSourceUpload',
                name: 'courseSourceUpload',
                meta: {
                    title: '课程资料上传',
                },
                component: () => import(/* webpackChunkName: "/courseManager/detail" */ '../views/upload/upload.vue'),
            },
            {
                name:'articleDetails',
                path:'/articleDetails/articleId/:articleId',
                // props:true,
                meta: {
                    title: '文章'+'',
                },

                component: () => import('../views/forum/BBSArticleDetails.vue'),

            },

        ],
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
        // redirect: {name: "Login"}
    },
    {
        path: '/',
        redirect: '/login',//测试状态，暂时转到主页
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

