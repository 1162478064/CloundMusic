import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Layout from '../Layout/Index.vue'
import Description from "../Layout/Description.vue";

const routes = [
    {
        path: '/',
        component: Layout,
        name: 'home',
        redirect: '/home',
        meta: { title: '首页' },
        children: [
            {
                path: 'home',
                component: () => import('@/views/HomeView.vue'),
                name: 'home',
                meta: { title: '首页' }
            }
        ]
    }, {
        path: '/podcast',
        component: Layout,
        name: 'podcast',
        meta: { title: '播客' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Podcast.vue'),
                name: 'podcast',
                meta: { title: '播客' }
            }
        ]
    }, {
        path: '/my',
        component: Layout,
        name: 'my',
        meta: { title: '我的' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/My.vue'),
                name: 'my',
                meta: { title: '我的' }
            }
        ]
    }, {
        path: '/follow',
        component: Layout,
        name: 'follow',
        meta: { title: '关注 ' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Follow.vue'),
                name: 'follow',
                meta: { title: '关注' }
            }
        ]
    }, {
        path: '/community',
        component: Layout,
        name: 'community',
        meta: { title: '社区' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/Community.vue'),
                name: 'community',
                meta: { title: '社区' }
            }
        ]
    }, {
        path: '/description',
        name: 'Description',
        component: Description,
        children: [
            {
                path: 'search',
                name: 'Search',
                component: () => import('../views/SearchPage.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router;