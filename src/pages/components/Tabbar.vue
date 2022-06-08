<template>
    <el-tabs
        v-model="activeTab"
        type="border-card"
        style="width: 98% !important"
        @tab-change="tabChange"
        @tab-remove="removeTab"
    >
        <el-tab-pane
            v-for="item in tabList"
            :key="item.path"
            :label="item.title"
            :name="item.path"
            :closable="item.path !== '/'"
        >
            <div class="h-82vh border border-yellow-300 mt-1">
                <el-scrollbar>
                    <el-button @click="addTab('这是新的tabs', '/goods/list')">add one </el-button>
                    <el-button @click="removeTab('/goods/list')">remove one </el-button>
                    <router-view></router-view>
                </el-scrollbar>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { useTabList } from '../composables/useTablist'

const { tabList,
    activeTab,
    tabChange,
    removeTab,
    addTab, 
} = useTabList()

</script>

<style scope>
.el-tabs__item.is-active {
    background: white;
}

.el-tabs__header {
    margin: 0 0 1px !important;
    user-select: none;
}
</style>
