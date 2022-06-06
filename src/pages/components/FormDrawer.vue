<template>
    <el-drawer
        v-model="showDrawerRef"
        :title="title"
        :size="width"
        :destroy-on-close="false"
    >
        <template #default>
            <div
                class="form-drawer-body  w-[calc(100%)] h-[calc(90%)] "
            >
                <slot></slot>
            </div>

            <div class="w-[calc(100%)] h-[calc(5%)] p-0 mt-5">
                <div class="float-right">
                    <el-button @click="close">{{ cancelText }}</el-button>
                    <el-button
                        type="primary"
                        :loading="loadingRef"
                        @click="submit"
                    >
                        {{ confirmText }}
                    </el-button>
                </div>
            </div>
        </template>

        <template #footer>
            <div style="flex: auto"></div>
        </template>
    </el-drawer>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref } from '@vue/reactivity'

const showDrawerRef = ref(false)
const loadingRef = ref(false)

const open = () => { showDrawerRef.value = true }
const close = () => {
    showDrawerRef.value = false
    loadingRef.value = false
}
const loading = (loading) => { loadingRef.value = loading }

const emit = defineEmits(['submit'])
const submit = () => emit('submit')

defineProps({
    title: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: '45%',
    },
    confirmText: {
        type: String,
        default: '提交',
    },
    cancelText: {
        type: String,
        default: '取消',
    },
})

// 暴露方法给外层ref
defineExpose({ open, close, loading })
</script>

<style lang="less" scoped>
    .form-drawer-body {
        &::-webkit-scrollbar {
            display: none;
        }
        
        @apply p-0 overflow-y-scroll;
    }

</style>
