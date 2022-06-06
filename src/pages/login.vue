<template>
  <el-row class="login">
    <el-col class="flex-center left" :lg="16" :md="12">
      <div>
        <div class="title">欢迎光临</div>
        <div class="slogan">欢迎使用电商后台管理系统，摊位分销模式</div>
      </div>
    </el-col>
    <el-col class="flex-center right" :lg="8" :md="12">
      <h2 class="title">欢迎回来</h2>

      <el-form
        ref="ruleFormRef"
        :model="form"
        class="w-80"
        :rules="rules"
      >
        <el-divider>
          <span class="text-gray-400">账号密码登录</span>
        </el-divider>

        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入你的账号"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入你的密码"
            type="password"
            show-password
            @keydown.enter="submitForm(ruleFormRef)"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="success"
            :loading="loadingRef"
            :loading-icon="Eleme"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { SET_TOKEN } from '~/store'
import { login } from '~/api/manager'
import toast from '~/utils/toast'
 
const store = useStore()
const router = useRouter()

// do not use same name with ref
const form = reactive({
    username: '',
    password: '',
})

const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        // { min: 6, message: '用户名字符不得少于6位', trigger: 'blur' },
    ],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
})

const ruleFormRef = ref()
const loadingRef = ref(false)
const submitForm = async (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (!valid) {
            return false
        }

        loadingRef.value = true
        try {
            const reply = await login(form.username, form.password)
            store.commit(SET_TOKEN, reply.data.token)
            toast.notify.success('登录成功')
            router.push('/')
        } finally {
            loadingRef.value = false
        }
    })
}
</script>

<style lang="less">
.login {
    @apply bg-indigo-500 min-h-screen;
    .flex-center {
        @apply !flex items-center justify-center;
    }

    .left {
        .title {
            @apply font-bold text-4xl text-light-100 mb-2;
        }

        .slogan {
            @apply text-light-50 text-sm;
        }
    }

    .right {
        @apply bg-light-50 flex-col;

        .title {
            @apply text-orange-400 text-2xl;
        }
    }

    .login-btn {
        @apply w-100 bg-cyan-500;
    }
}
</style>
