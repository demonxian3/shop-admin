<template>
    <el-container class="overflow-hidden">
        <el-header class="!px-0">
            <l-header></l-header>
        </el-header>
        <el-container>
            <el-aside><l-menu></l-menu></el-aside>
            <el-main>
                <l-tagbar></l-tagbar>
                <div class="h-83vh border">
                    <el-scrollbar>
                        <router-view></router-view>
                    </el-scrollbar>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import LHeader from '~/pages/components/Header.vue'
import LMenu from '~/pages/components/Menu.vue'
import LTagbar from '~/pages/components/Tagbar.vue'
</script>
