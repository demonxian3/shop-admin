import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import toast from '~/utils/toast'
import { updatePassword } from '~/api/manager'
import { ACT_LOGOUT } from '~/store/index.js'

export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: '',
    })

    const rules = reactive({
        oldpassword: [
            { required: true, message: '该字段不能为空', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '该字段不能为空', trigger: 'blur' },
        ],
        repassword: [
            { required: true, message: '该字段不能为空', trigger: 'blur' },
        ],
    })

    const ruleFormRef = ref()
    const formDrawerRef = ref(null)

    function openRepassword() {
        formDrawerRef.value.open()
    }

    function confirmClick() {
        ruleFormRef.value.validate(async (valid) => {
            if (!valid) {
                return false
            }

            try {
                formDrawerRef.value.loading(true)
                await updatePassword(form)
                toast.notify.success('密码修改成功')
                await store.dispatch(ACT_LOGOUT)
                router.push('/login')
            } finally {
                formDrawerRef.value.loading(false)
                // formDrawerRef.value.close()
            }
        })
    }

    return {
        form,
        formDrawerRef,
        ruleFormRef,
        rules,
        confirmClick,
        openRepassword,
    }
}

export function useLogout() {
    const store = useStore()
    const router = useRouter()
    async function logoutFn() {
        const confirm = await toast.box.confirm(
            '确定要退出登录吗',
            '退出确认',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            },
        )

        console.log(confirm)

        if (confirm) {
            await store.dispatch(ACT_LOGOUT)
            toast.notify.info('已退出登录')
            router.push('/login')
        }
    }

    return {
        logoutFn,
    }
}