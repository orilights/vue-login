<template>
    <p class="text-center font-semibold text-xl mb-6">用户主页</p>
    <p class="mb-2">欢迎：{{ userName }}</p>
    <p class="mb-4">IP地址：{{ ip }}</p>
    <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="userLogout">注销</button>
    <RouterLink to="/edit/name">
        <button
            class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white">修改昵称</button>
    </RouterLink>
    <RouterLink to="/edit/password">
        <button
            class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white">修改密码</button>
    </RouterLink>
</template>

<script setup lang="ts">
import router from '@/router';
import { useStore } from '@/stores';
import Cookies from 'js-cookie';
import { onMounted, ref, toRefs } from 'vue';
import { useToast } from 'vue-toastification';

const store = useStore()
const toast = useToast()

const { userName } = toRefs(store)
const ip = ref('获取中')

onMounted(() => {
    fetch('https://api.amarea.cn/getip/')
        .then((response) => {
            return response.text()
        })
        .then((ipaddress) => {
            ip.value = ipaddress
        })
        .catch((err) => {
            ip.value = '获取失败'
            console.log(err);
        })
})

function userLogout(){
    store.login = false
    store.userId = ''
    store.userName = ''
    Cookies.remove('login')
    Cookies.remove('userid')
    Cookies.remove('username')
    Cookies.remove('token')
    toast.success('注销成功')
    router.push('/login')
}

</script>