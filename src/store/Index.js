import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据，相当于data
    state: {
        Sidaber: false
    },
    getters: {},
    //里面定义方法，操作state方发
    mutations: {
        OpenOrClose(state, whether) {
            console.log(state, whether);
            state.Sidaber = whether
        }
    },
    // 操作异步操作mutation
    actions: {},
    modules: {}
})

export default store