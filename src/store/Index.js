import Vue from 'vue'
import Vuex from 'vuex'
import Player from './Module/Player.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据，相当于data
    state: {
        Sidaber: false, // 是否展开侧边栏
        Dark: false, // 当前是否为暗黑模式
    },
    getters: {},
    //里面定义方法，操作state方发
    mutations: {
        // 开关侧边栏
        OpenOrClose(state, whether) {
            state.Sidaber = whether
        },
        // 暗黑模式展示
        DarkShow(state, whether) {
            state.Dark = whether
            whether ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
        }
    },
    // 操作异步操作mutation
    actions: {},
    modules: {
        Player
    }
})

export default store