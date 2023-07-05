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
                name: 'home',
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
                name: 'podcast',
                meta: { title: '播客' }
            }
        ]
    }, {
        path: '/my',
        component: Layout,
        name: 'my',
        redirect: '/index',
        meta: { title: '我的' },
        children: [
            {
                path: '/my/index',
                component: () => import('@/views/My/Index.vue'),
                name: 'my',
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
                name: 'follow',
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
                name: 'community',
                meta: { title: '社区' }
            }
        ]
    }, {
        path: '/description',
        name: 'Description',
        redirect: '/description/search',
        component: Description,
        children: [
            {
                path: 'search',
                name: 'Search',
                component: () => import('../views/Other/SearchPage.vue')
            }, {
                path: 'detail',
                component: () => import('@/views/Home/SingDetail.vue'),
                name: 'detail',
                meta: { title: '歌单详情页' }
            }
        ]
    }, {
        path: '/Login',
        name: 'login',
        component: () => import('../views/Other/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router;