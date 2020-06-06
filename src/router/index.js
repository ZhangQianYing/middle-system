import Vue from 'vue'
import Router from 'vue-router'
import * as route from './router'
import lib from '../utils/lib'
import store from '../store'

Vue.use(Router)

const RouterConfig = {
  routes: route.routers
}
const router = new Router(RouterConfig)

let name = lib.name
let token = ''
let reg = ''
router.beforeEach((to, from, next) => {
  // 此处写登录验证
  if ($cookies.isKey(name)) {
    token = $cookies.get(name)
  } else {
    if (to.path == "/login"){
      token = ''
      next()
    } else {
      token = ''
      next({path: '/login'})
    }
  }
  if(token != '') {
    if(store.state.routerPathList.indexOf(to.path.slice(1)) != -1) {
      next()
    } else if(from.path === "/login" || to.path === "/") {
      next()
    } else if(store.state.routerPathList.length != 1) {
      next('/')
    } else {
      next()
    }
  } else if(to.path == "/login") {
    next()
  } else {
    next({path: '/login'})
  }
})

router.afterEach((to) => { })

export default router
