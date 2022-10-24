import { RouteRecordRaw } from 'vue-router'

// 路由数组
const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@views/Home.vue'),
    }, {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@views/Login.vue'),
    }, {
        path: '/edit/name',
        name: 'edit-name',
        component: () => import(/* webpackChunkName: "edit" */ '@views/EditName.vue'),
    }, {
        path: '/edit/password',
        name: 'edit-password',
        component: () => import(/* webpackChunkName: "edit" */ '@views/EditPassword.vue'),
    }, {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "page404" */ '@views/Page404.vue'),
    }, {
        path: '/',
        redirect: '/home',
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    }
]

// 暴露路由数据
export default routes