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

const asyncRoutes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: { title: '首页' },
    },
    {
        path: '/goods/list',
        name: 'shop_goods_list',
        component: GoodsList,
        meta: { title: '测试' },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 动态添加路由
export function addRoutes(menus, parentName = 'admin') {
    menus.forEach((menu) => {
        const item = asyncRoutes.find((route) => route.name === menu.desc)
        if (item && !router.hasRoute(menu.desc)) {
            router.addRoute(parentName, {
                name: menu.desc,
                path: menu.frontpath,
            })
        }

        if (menu.child && menu.child.length) {
            addRoutes(menu.child, menu.frontpath)
        }
    })

    router.getRoutes()
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

    if (token) {
        const reply = await store.dispatch(ACT_GET_USERINFO)
        addRoutes(reply.data.menus)
    }

    const title = `后台系统 - ${ to.meta.title ? to.meta.title : '' }`
    document.title = title

    next()
})

router.afterEach(() => hideFullLoading())

export default router