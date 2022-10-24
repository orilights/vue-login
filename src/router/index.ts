import { useStore } from '@/stores'
import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const store = useStore()
    if (!store.login) {
        if (to.path != '/login' && to.path != '/404'){
            return '/login'
        }
    }
})

export default router