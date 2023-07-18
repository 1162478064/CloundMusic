import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Layout from '../Layout/Index.vue'
import Description from "../Layout/Description.vue";

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home/Index.vue'),
                name: 'homePage',
                meta: { title: '首页' }
            }
        ]
    }, {
        path: '/podcast',
        component: Layout,
        name: 'podcast',
        redirect: '/podcast/index',
        meta: { title: '播客' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Podcast/Index.vue'),
                name: 'podcastPage',
                meta: { title: '播客' }
            }
        ]
    }, {
        path: '/my',
        component: Layout,
        name: 'my',
        redirect: '/my/index',
        meta: { title: '我的' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/My/Index.vue'),
                name: 'myPage',
                meta: { title: '我的' }
            }
        ]
    }, {
        path: '/follow',
        component: Layout,
        name: 'follow',
        redirect: '/follow/index',
        meta: { title: '关注 ' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Follow/Index.vue'),
                name: 'followPage',
                meta: { title: '关注' }
            }
        ]
    }, {
        path: '/community',
        component: Layout,
        name: 'community',
        redirect: '/community/index',
        meta: { title: '社区' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Community/Index.vue'),
                name: 'communityPage',
                meta: { title: '社区' }
            }
        ]
    }, {
        path: '/Description',
        name: 'Description',
        redirect: '/Description/Search',
        component: Description,
        children: [
            {
                path: 'Search',
                name: 'Search',
                component: () => import('../views/Other/SearchPage.vue'),
                meta: {}
            },{
                path: 'SearchResult/:SearchValue',
                name: 'SearchResult',
                component: () => import('../views/Other/SearchResult.vue'),
                meta: {}
            }, {
                path: 'detail',
                component: () => import('@/views/Home/SingDetail.vue'),
                name: 'detail',
                meta: { title: '歌单' }
            }, {
                path: 'count',
                component: () => import('@/views/My/MyCount.vue'),
                name: 'mycount',
                meta: { title: sessionStorage.getItem('nickname') || '' }
            }, {
                path: 'AccountSetting',
                component: () => import('@/views/My/AccountSetting.vue'),
                name: 'AccountSetting',
                meta: { title: '我的资料' }
            }, {
                path: 'QR',
                component: () => import('@/views/My/QR.vue'),
                name: 'QR',
                meta: { title: '我的二维码' }
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../views/Other/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router;