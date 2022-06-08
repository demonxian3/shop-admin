import { useCookies } from '@vueuse/integrations/useCookies'
import { ref } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useTabList() {
    const cookies = useCookies()
    const router = useRouter()
    const route = useRoute()

    const tabIndex = 2
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '主控台',
            path: '/',
        },
    ])

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab(to.meta.name, to.path)
    })

    function initTabList() {
        const tabListInCookie = cookies.get('tabList')
        if (tabListInCookie) {
            tabList.value = tabListInCookie
        }
    }

    initTabList()

    function tabChange(path) {
        router.push(path)
    }

    function addTab(title, path) {
        const noTab = tabList.value.findIndex((tab) => tab.path === path) === -1

        if (noTab) {
            tabList.value.push({ title, path })
            activeTab.value = path
            router.push(path)
        }

        cookies.set('tabList', tabList.value)
    }

    function removeTab(path) {
        const tabs = tabList.value
        let activePath = activeTab.value
        tabs.forEach((tab, index) => {
            if (tab.path === path) {
                const nextTab = tabs[index + 1] || tabs[index - 1]

                if (nextTab) {
                    activePath = nextTab.path
                }
            }
        })

        activeTab.value = activePath
        tabList.value = tabs.filter((tab) => tab.path !== path)
    }

    return {
        tabList,
        activeTab,
        tabChange,
        removeTab,
        addTab,
    }
}