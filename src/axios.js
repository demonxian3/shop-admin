import axios from 'axios'
import { useCookies } from '@vueuse/integrations/useCookies'
import toast from '~/utils/toast'
import store,{ ACT_LOGOUT } from './store'

const dishait = axios.create({
    baseURL: '/dishait',
})

// 添加请求拦截器
dishait.interceptors.request.use(
    (config) => {
        const cookies = useCookies()
        const token = cookies.get('token')

        if (token) {
            config.headers.token = token
        }

        return config
    },
    (error) => Promise.reject(error),
)

// 添加响应拦截器
dishait.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const msg = error.response.data.msg

        console.dir(3421, error.config)

        if (msg === "非法token，请先登录！") {
            store.dispatch(ACT_LOGOUT).finally(() => {
                location.reload()
            })
        } 
        toast.message.error(`请求失败: ${msg}`)
        return Promise.reject(error)
    },
)

export default dishait
