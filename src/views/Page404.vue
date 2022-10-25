<template>
    <p class="text-2xl mb-4">404 Not Found</p>
    <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="router.back()">返回上级</button>
    <button class="transition-colors px-4 py-1 mr-2 border-black border rounded-lg hover:bg-black hover:text-white"
        @click="router.push('/')">返回主页</button>
</template>

<script setup lang="ts">
import router from '@/router';
</script>