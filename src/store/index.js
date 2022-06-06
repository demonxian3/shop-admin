import { createStore } from 'vuex'
import { useCookies } from '@vueuse/integrations/useCookies'
import { getInfo, logout } from '../api/manager'

export const TOKEN_KEY = 'token'
export const GET_TOKEN = 'GET_TOKEN'
export const SET_TOKEN = 'SET_TOKEN'
export const DEL_TOKEN = 'DEL_TOKEN'
export const SET_MENUINFO = 'SET_MENUINFO'
export const SET_USERINFO = 'SET_USERINFO'
export const DEL_USERINFO = 'DEL_USERINFO'
export const ACT_LOGOUT = 'ACT_LOGOUT'
export const ACT_GET_USERINFO = 'ACT_GET_USERINFO'
export const TOGGLE_MENU_COLLAPSE = 'TOGGLE_MENU_COLLAPSE'

// 创建一个新的 store 实例

const cookies = useCookies()
const store = createStore({
    state() {
        return {
            userInfo: {},
            menuInfo: [],
            count: 0,
            collapseMenu: false,
        }
    },
    mutations: {
        [TOGGLE_MENU_COLLAPSE](state) {
            state.collapseMenu = !state.collapseMenu
        },
        [SET_USERINFO](state, info) {
            state.userInfo = info
        },
        [SET_MENUINFO](state, info) {
            state.menuInfo = info
        },
        // [SET_RULES]() {},
        [DEL_USERINFO](state) {
            state.userInfo = {}
        },
        [SET_TOKEN](state, token) {
            cookies.set(TOKEN_KEY, token)
        },
        [DEL_TOKEN]() {
            cookies.remove(TOKEN_KEY)
        },
    },
    actions: {
        async [ACT_GET_USERINFO]({ commit }) {
            const reply = await getInfo()
            const { username, id, avatar, role } = reply.data
            commit(SET_USERINFO, {
                username,
                id,
                avatar,
                role,
                superAdmin: reply.data.super,
            })
            commit(SET_MENUINFO, reply.data.menus)
            return reply
        },

        async [ACT_LOGOUT]({ commit }) {
            try {
                await logout()
            } catch (e) {
                console.log(e)
            } finally {
                commit(DEL_USERINFO)
                commit(DEL_TOKEN)
            }
        },
    },
    getters: {
        token() {
            return cookies.get(TOKEN_KEY)
        },
    },
})

export default store
