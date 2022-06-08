<template>
    <div><strong>Token is</strong>: {{ cookies.get('token') }}</div>
    <pre class="bg-blue-300 text-white[">
        <strong>商品分类</strong>:
    </pre>
    <el-button @click="getUserInfo()">click me</el-button>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['token'])
</script>
