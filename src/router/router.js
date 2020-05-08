
import Login from '../views/login/login.vue'
import Home from '../views/Home.vue'

export const login = {
    path: '/login',
    name: 'login',
    component: Login,
}

export const saleAudit = {
    path: '/',
    name: '中台',
    component: Home,
    redirect: '/home',
    children: [
        {
            path: 'home',
            name: '系统首页',
            icon: 'ionic',
            meta: {
                active: false,
                title: '系统首页',
                keepAlive: false,
            },
            component: () => import('../views/home/home.vue')
        },
        {
            path: 'commodityExamine',
            name: '商品审核',
            icon: 'ionic',
            meta: {
                active: false,
                title: '商品审核',
                keepAlive: false,
            },
            component: () => import('../views/commodityCenter/commodityExamine/index.vue'),
         },
         {
            path: 'commodityLibrary',
            name: '商品库',
            icon: 'ionic',
            meta: {
                active: false,
                title: '商品库',
                keepAlive: false,
            },
            component: () => import('../views/commodityCenter/commodityLibrary/index.vue'),
         },
       
    ]
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    login,
    saleAudit,
]