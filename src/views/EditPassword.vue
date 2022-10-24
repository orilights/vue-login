<template>
    <p class="my-4">旧密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入旧密码" v-model="oldPwd">
    </p>
    <p class="my-4">新密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入新密码" v-model="newPwd">
    </p>
    <p class="my-4">重复新密码： <input class="border px-1 rounded-md" type="password" placeholder="请重复输入新密码"
            v-model="repNewPwd">
    </p>
    <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="userChangePassword">修改</button>
    <RouterLink to="/home">
        <button
            class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white">取消</button>
    </RouterLink>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import { UserChangePassword } from '@/api';
import router from '@/router';

const store = useStore()
const toast = useToast()

const oldPwd = ref('')
const newPwd = ref('')
const repNewPwd = ref('')

async function userChangePassword() {
    if (newPwd.value != repNewPwd.value || newPwd.value == '') {
        toast.warning('两次输入密码不同或密码为空，请检查输入')
        return 0
    }
    store.networkLoading = true
    const result = await UserChangePassword(store.userId, oldPwd.value, newPwd.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.push('/home')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>