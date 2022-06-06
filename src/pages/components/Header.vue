<template>
    <div class="header-container h-[calc(100%)]">
        <div class="left w-3/4">
            <div class="logo">
                <el-icon :size="30"><CoffeeCup /></el-icon>
                <span style="font-size: 20px" class="ml-2 mt-1">Demon</span>
            </div>

            <el-tooltip
                class="box-item"
                content="折叠菜单"
                placement="bottom"
                :show-after="600"
            >
                <el-icon class="operate-icon" :size="17" @click="toggleMenuCollapse">
                    <Fold v-show="$store.state.collapseMenu" />
                    <Expand v-show="!$store.state.collapseMenu" />
                </el-icon>
            </el-tooltip>

            <el-tooltip
                class="box-item"
                content="刷新"
                placement="bottom"
                :show-after="600"
            >
                <el-icon class="operate-icon" :size="17"><Refresh /></el-icon>
            </el-tooltip>
        </div>
        <div class="right w-1/4">
            <el-tooltip
                class="box-item"
                content="通知"
                placement="bottom"
                :show-after="600"
            >
                <el-icon class="operate-icon" :size="17"><Bell /></el-icon>
            </el-tooltip>

            <el-tooltip
                class="box-item"
                content="全屏"
                placement="bottom"
                :show-after="600"
            >
                <el-icon
                    v-if="!isFullscreen"
                    class="operate-icon"
                    :size="17"
                    @click="toggle"
                >
                    <FullScreen />
                </el-icon>
                <el-icon
                    v-else
                    class="operate-icon"
                    :size="17"
                    @click="toggle"
                >
                    <Aim />
                </el-icon>
            </el-tooltip>

            <el-dropdown class="w-50 flex justify-center">
                <div class="el-dropdown-link user-info">
                    <el-avatar
                        :src="$store.state.userInfo.avatar"
                        :size="32"
                        class="mr-2"
                    />
                    {{ $store.state.userInfo.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            @click="openRepassword"
                        >
                            修改密码
                        </el-dropdown-item>
                        <el-dropdown-item
                            divided
                            @click="logoutFn"
                        >
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <form-drawer ref="formDrawerRef" title="修改密码" @submit="confirmClick">
        <el-form
            ref="ruleFormRef"
            label-width="120px"
            :model="form"
            :rules="rules"
            class="w-100%"
        >
            <el-form-item class="mt-3" prop="oldpassword" label="旧密码">
                <el-input
                    v-model="form.oldpassword"
                    type="password"
                    placeholder="请输入旧的密码"
                >
                    <template #prefix>
                        <el-icon class="el-input__icon"><user /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="mt-3" prop="password" label="新密码">
                <el-input
                    v-model="form.password"
                    placeholder="请输入你的密码"
                    type="password"
                    show-password
                >
                    <template #prefix>
                        <el-icon class="el-input__icon"><key /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="mt-3" prop="repassword" label="再输入一次">
                <el-input
                    v-model="form.repassword"
                    placeholder="请输入你的密码"
                    type="password"
                    show-password
                >
                    <template #prefix>
                        <el-icon class="el-input__icon"><key /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
/* eslint-disable no-redeclare */

import { useFullscreen } from '@vueuse/core'
import FormDrawer from './FormDrawer.vue'
import { useRepassword, useLogout } from '../composables/useManager.js'
import store, { TOGGLE_MENU_COLLAPSE } from '../../store'

const {
    isFullscreen,
    toggle,
} = useFullscreen()

const {
    form,
    formDrawerRef,
    ruleFormRef,
    rules,
    confirmClick,
    openRepassword,
} = useRepassword()

const { logoutFn } = useLogout()

const toggleMenuCollapse = () => store.commit(TOGGLE_MENU_COLLAPSE)

</script>

<style lang="less" scoped>
.header-container {
    @apply flex bg-dark-50;

    .left {
        @apply flex items-center text-white;

        .logo {
            @apply w-50  text-center flex items-center justify-center;
        }
    }

    .right {
        @apply flex items-center text-white;

        .user-info {
            @apply flex items-center cursor-pointer text-white;
        }
    }
}

.operate-icon {
    @apply w-17 text-center block cursor-pointer hover:bg-gray-700 flex  h-[calc(100%)];
}
</style>
