<template>
    <div><strong>Token is</strong>: {{ cookies.get('token') }}</div>
    <pre class="bg-blue-300 text-white[">
        <strong>这是商品管理</strong>:
    </pre>
    <el-button @click="getUserInfo()">click me</el-button>
</template>

<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['token'])
</script>
