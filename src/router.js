import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Layout from './Layout/Index.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        name: 'homeindex',
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
        name: 'podcastindex',
        meta: { title: '播客' },
        children: [
            {
                path: '/podcast',
                component: () => import('@/views/Podcast.vue'),
                name: 'podcast',
                meta: { title: '播客' }
            }
        ]
    }, {
        path: '/my',
        component: Layout,
        name: 'myindex',
        meta: { title: '我的' },
        children: [
            {
                path: '/my',
                component: () => import('@/views/My.vue'),
                name: 'my',
                meta: { title: '我的' }
            }
        ]
    }, {
        path: '/follow',
        component: Layout,
        name: 'followindex',
        meta: { title: '关注 ' },
        children: [
            {
                path: '/follow',
                component: () => import('@/views/Follow.vue'),
                name: 'follow',
                meta: { title: '关注' }
            }
        ]
    }, {
        path: '/community',
        component: Layout,
        name: 'communityindex',
        meta: { title: '社区' },
        children: [
            {
                path: '/community',
                component: () => import('@/views/Community.vue'),
                name: 'community',
                meta: { title: '社区' }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router;