<template>
    <p class="text-center font-semibold text-xl mb-6">用户登录</p>
    <p class="my-4">账号： <input class="border px-1 rounded-md" type="text" placeholder="请输入账号" v-model="userId"></p>
    <p class="my-4">密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入密码" v-model="userPwd"></p>
    <div class="button-group mt-6 flex justify-center">
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
            @click="userLogin">登录</button>
        <RouterLink to="/register">
            <button
                class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white">前往注册&gt;</button>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import Cookies from 'js-cookie';
import * as Utils from '@/utils';
import { UserLogin } from '@/api';

const store = useStore()
const toast = useToast()

const userId = ref('')
const userPwd = ref('')

async function userLogin() {
    store.networkLoading = true
    const result = await UserLogin(userId.value, userPwd.value)
    if (result.code == 0) {
        toast.clear()
        toast.success('登录成功')
        store.login = true
        store.userId = userId.value
        store.userName = result.msg
        Cookies.set('login', '1', { expires: 7 })
        Cookies.set('userid', userId.value, { expires: 7 })
        Cookies.set('username', result.msg, { expires: 7 })
        Cookies.set('token', Utils.getRandomString(30), { expires: 7 })
        router.push('/home')
    } else if (result.code = 2) {
        toast.warning(result.msg)
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}


</script>