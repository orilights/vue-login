<template>
  <div class="relative min-h-screen w-full flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
    <div v-if="networkLoading"
      class="absolute w-full h-full flex items-center justify-center z-40 bg-white bg-opacity-80 select-none">
      <img class="w-20 h-20" src="./assets/loading_black.svg">
    </div>
    <div class="px-8 py-6 z-20 bg-white rounded-xl bg-opacity-80 shadow-md">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useStore } from '@/stores';

const store = useStore()

const { networkLoading } = toRefs(store)

</script>
