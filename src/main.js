import Vue from 'vue';

import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  securityJsCode: "e72f313f49db92b87ff37f415b572db3",
}
AMapLoader.load({
  key: '910f539fb7c6d4b6423dcd97ca4d5ccc',
  version: '2.0',
  plugins: ['AMap.Geolocation', 'AMap.Geocoder']
}).then((AMap) => {
  Vue.prototype.$AMap = AMap;
})

import App from './App.vue';
import './permission'

import './index.css';
import { Icon } from '@iconify/vue2';

import Vant from 'vant';
import 'vant/lib/index.css';

import store from './store/Index.js'

import router from './router/router'
import moment from 'moment'

Vue.prototype.$moment = moment;
Vue.use(Vant);
Vue.component('Icon', Icon);

new Vue({
  //挂载点
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
