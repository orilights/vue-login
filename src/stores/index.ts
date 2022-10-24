import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        login: false,
        networkLoading: false,
        userId: '',
        userName: '',
    }),
})