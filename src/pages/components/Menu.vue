<template>
    <div class="menu-container">
        <el-menu
            unique-opened
            active-text-color="#ffd04b"
            background-color="#545c64"
            text-color="#fff"
            :collapse="$store.state.collapseMenu"
            :default-active="defaultActive"
            :collapse-transition="false"
        >
            <template v-for="(menu, idx) in asideMenu">
                <el-sub-menu v-if="menu.children.length" :key="idx" :index="menu.name">
                    <template #title>
                        <el-icon><component :is="menu.icon" /></el-icon>
                        <span>{{ menu.name }}</span>
                    </template>

                    <el-menu-item
                        v-for="(subMenu, idy) in menu.children"
                        :key="`${idy}`"
                        :index="subMenu.path"
                        @click="router.push(subMenu.path)"
                    >
                        {{ subMenu.name }}
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item
                    v-for="(item, idx) in menuList"
                    v-else
                    :key="`${idx}`"
                    :index="item.path"
                    @click="router.push(item.path)"
                >
                    <el-icon><component :is="item.icon" /></el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
/* eslint-disable vue/no-unused-vars */
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import store from '~/store'

const defaultActive = ref(useRoute().path)

const router = useRouter()
const asideMenu = computed(() => {
    const arrangeMenuData = (menuList) => Array.from(menuList).map((proxyData) => {
        let children = []
        if (proxyData.child.length) {
            children = arrangeMenuData(proxyData.child)
        }
        return {
            children,
            name: proxyData.name,
            icon: proxyData.icon,
            path: proxyData.frontpath,
        }
    })

    return arrangeMenuData(store.state.menuInfo)
})

</script>

<style lang="less">
.el-aside{
    width: auto!important;
    transition: width 0.5!important;
}

.menu-container {

    background: #545c64;
    height: 94vh ;

    .menu-main {
        width: 200px!important;
        border: none;
    }

    .menu-main.el-menu--collapse {
        width: 100%;
    }
    .el-sub-menu {
        width: 200px!important;

    }
}

.el-aside::-webkit-scrollbar {
    width: 0;
}
</style>
