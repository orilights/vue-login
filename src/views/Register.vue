<template>
    <p class="text-center font-semibold text-xl mb-6">用户注册</p>
    <p class="relative my-4">账号： <input class="border px-1 rounded-md" type="text" placeholder="请输入账号" v-model="userId"
            @focusin="showTip">
        <span v-if="!vaildUserId" class="absolute left-14 top-6 text-red-600 text-sm m-0">当前账号格式非法</span>
    </p>
    <p class="my-4">昵称： <input class="border px-1 rounded-md" type="text" placeholder="请输入昵称" v-model="userName"></p>
    <p class="my-4">密码： <input class="border px-1 rounded-md" type="password" placeholder="请输入密码" v-model="userPwd"></p>
    <div class="button-group mt-6 flex justify-center">
        <RouterLink to="/login">
            <button
                class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white">返回</button>
        </RouterLink>
        <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
            @click="userRegister">注册</button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '@/router';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import { UserRegister } from '@/api';

const store = useStore()
const toast = useToast()

let re = new RegExp('^[a-z0-9-_]{5,15}$')
const vaildUserId = computed(() => re.test(userId.value) || userId.value == '')
const userId = ref('')
const userName = ref('')
const userPwd = ref('')

function showTip() {
    toast.info('用户名仅支持小写字母、数字、横杠、下划线组合，长度5-15字符', { timeout: 10000 })
}

async function userRegister() {
    if (userId.value == '') {
        toast.warning('账号不可为空')
        return 0
    }
    if (userName.value == '') {
        toast.warning('昵称不可为空')
        return 0
    }
    if (userPwd.value == '') {
        toast.warning('密码不可为空')
    }
    if (!vaildUserId.value) {
        toast.warning('当前账号格式非法')
        toast.info('用户名仅支持小写字母、数字、横杠、下划线组合，长度5-15字符', { timeout: 10000 })
        return 0
    }
    store.networkLoading = true
    const result = await UserRegister(userId.value, userName.value, userPwd.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.push('/login')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>