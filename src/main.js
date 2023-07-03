import Vue from 'vue';
import App from './App.vue';

import './index.css';
import { Icon } from '@iconify/vue2';

import Vant from 'vant';
import 'vant/lib/index.css';

import store from './store/Index.js'

import router from './router/router'

Vue.use(Vant);
Vue.component('Icon', Icon);

new Vue({
  //挂载点
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
