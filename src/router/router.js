
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
    redirect: '/commodityExamine',
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
            path: 'examineDetails',
            name: '商品审核详情',
            icon: 'ionic',
            meta: {
                active: false,
                title: '商品审核',
                keepAlive: false,
                fath: 'commodityExamine',
            },
            component: () => import('../views/commodityCenter/commodityExamine/details.vue'),
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
         {
            path: 'libraryDetails',
            name: '商品库详情',
            icon: 'ionic',
            meta: {
                active: false,
                title: '商品库详情',
                keepAlive: false,
                fath: 'commodityLibrary',
            },
            component: () => import('../views/commodityCenter/commodityLibrary/details.vue'),
         },
         {
            path: 'entryGateway',
            name: '输入网关',
            icon: 'ionic',
            meta: {
                active: false,
                title: '输入网关',
                keepAlive: false,
            },
            component: () => import('../views/gatewayCenter/entryGateway/index.vue'),
         },
         {
            path: 'outputGateway',
            name: '输出网关',
            icon: 'ionic',
            meta: {
                active: false,
                title: '输出网关',
                keepAlive: false,
            },
            component: () => import('../views/gatewayCenter/outputGateway/index.vue'),
         },
         {
            path: 'userSystem',
            name: '用户管理',
            icon: 'ionic',
            meta: {
                active: false,
                title: '用户管理',
                keepAlive: false,
            },
            component: () => import('../views/systemSetUp/userSystem/index.vue'),
         },
         {
            path: 'addUser',
            name: '新增用户',
            icon: 'ionic',
            meta: {
                active: false,
                title: '新增用户',
                fath: 'userSystem',
                keepAlive: false,
            },
            component: () => import('../views/systemSetUp/userSystem/addUser.vue'),
         },
         {
            path: 'roleSystem',
            name: '角色管理',
            icon: 'ionic',
            meta: {
                active: false,
                title: '角色管理',
                keepAlive: false,
            },
            component: () => import('../views/systemSetUp/roleSystem/index.vue'),
         },
         {
            path: 'addRole',
            name: '新增角色',
            icon: 'ionic',
            meta: {
                active: false,
                title: '新增角色',
                fath: 'roleSystem',
                keepAlive: false,
            },
            component: () => import('../views/systemSetUp/roleSystem/addRole.vue'),
         },
         {
            path: 'businessRegister',
            name: '商家注册',
            icon: 'ionic',
            meta: {
                active: false,
                title: '商家注册',
                keepAlive: false,
            },
            component: () => import('../views/businessCenter/businessRegister/index.vue'),
         },
         {
            path: 'businessAuth',
            name: '商家认证',
            icon: 'ionic',
            meta: {
                active: false,
                title: '商家认证',
                keepAlive: false,
            },
            component: () => import('../views/businessCenter/businessAuth/index.vue'),
         },
    ]
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    login,
    saleAudit,
]