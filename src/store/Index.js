import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据，相当于data
    state: {
        Sidaber: false,
        Dark: false
    },
    getters: {},
    //里面定义方法，操作state方发
    mutations: {
        OpenOrClose(state, whether) {
            state.Sidaber = whether
        },
        DarkShow(state, whether) {
            state.Dark = whether
            whether ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
        }
    },
    // 操作异步操作mutation
    actions: {},
    modules: {}
})

export default store