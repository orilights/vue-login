<template>
    <p class="my-4">新昵称： <input class="border px-1 rounded-md" type="text" placeholder="请输入新昵称" v-model="newName">
    </p>
    <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="userChangeName">修改</button>
    <RouterLink to="/home">
        <button
            class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white">取消</button>
    </RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import { UserChangeName } from '@/api';
import router from '@/router';
import Cookies from 'js-cookie';

const store = useStore()
const toast = useToast()

const newName = ref('')

newName.value = store.userName

async function userChangeName(){
    if (newName.value == '') {
        toast.warning('新昵称不可为空')
        return 0
    }
    store.networkLoading = true
    const result = await UserChangeName(store.userId, newName.value)
    if (result.code == 0) {
        toast.success(result.msg)
        store.userName = newName.value
        Cookies.set('username', newName.value)
        router.push('/home')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>
