import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './global/common'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css'  // 清除默认样式
import './assets/css/icon.css'
import axios from '@/utils/axios'
import VueCookies from 'vue-cookies'
import './utils/download'
// import VueUeditorWrap from 'vue-ueditor-wrap'

Vue.use(VueCookies)
Vue.prototype.$global = global
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });
Vue.prototype.axios = axios
// Vue.component('vue-ueditor-wrap', VueUeditorWrap)
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
