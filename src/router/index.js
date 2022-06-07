import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Layout from '~/pages/layout.vue'
import toast from '~/utils/toast'
import GoodsList from '~/pages/goodsList.vue'
import store, { ACT_GET_USERINFO, SET_USERINFO } from '~/store'
import { showFullLoading, hideFullLoading } from '../utils/loading'
import { SET_MENUINFO } from '../store'

const routes = [
    {
        path: '/',
        component: Layout,
        name: 'admin',
        children: [],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: '登录' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { title: '找不到页面' },
    },
]

const routerComponentsMap = {
    '/': Index,
    '/goods/list': GoodsList,
}

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 动态添加路由
export function addRoutes(menus, parentName = 'admin') {
    let hasNewRoute = false

    menus.forEach((menu) => {
        if (menu.child && menu.child.length) {
            const tmp = addRoutes(menu.child)
            hasNewRoute = hasNewRoute || tmp
        } if (
            !router.hasRoute(menu.frontpath)
            && menu.frontpath
            // && routerComponentsMap[menu.frontpath]
        ) {
            const newRoute = {
                name: menu.frontpath,
                path: menu.frontpath,
            }
            if (routerComponentsMap.hasOwnProperty(newRoute.name)) {
                newRoute.component = routerComponentsMap[newRoute.name]
            }
            router.addRoute(parentName, newRoute)
            hasNewRoute = true
        }
    })

    return hasNewRoute
}

router.beforeEach(async (to, from, next) => {
    showFullLoading()

    const token = store.getters.token
    if (!token && to.path !== '/login') {
        toast.message.warning('请先登录')
        return next({ path: '/login' })
    }

    if (token && to.path === '/login') {
        toast.message.warning('请勿重复登录')
        return next({ path: from.path ? from.path : '/' })
    }

    let hasNewRoute = false
    if (token) {
        const reply = await store.dispatch(ACT_GET_USERINFO)
        hasNewRoute = addRoutes(reply.data.menus)
    }
    const title = `后台系统 - ${ to.meta.title ? to.meta.title : '' }`
    document.title = title
 
    hasNewRoute ? next(to.fullPath) : next()
    // next(to.fullPath)
})

router.afterEach(() => hideFullLoading())

export default router